// src/pages/Admin/MessageDashboard.js

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Table, Tag, Spin, Alert, Button, Modal, Form, Input, message, Typography } from 'antd';
import { format } from 'date-fns';

const { TextArea } = Input;
const { Paragraph, Text } = Typography;

// --- API Functions ---
const fetchMessages = async () => {
    const { data } = await axios.get('/api/contact');
    return data;
};

const sendReply = async ({ messageId, replyText }) => {
    const { data } = await axios.post(`/api/contact/${messageId}/reply`, { replyText });
    return data;
};

// --- Component ---

// BEST PRACTICE: Name the component to match the file name.
const MessageDashboard = () => {
    const queryClient = useQueryClient();
    const [form] = Form.useForm();

    // State Management
    const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(null);

    // React Query: Fetching messages
    const { data: messages, isLoading, isError, error } = useQuery({
        queryKey: ['contactMessages'],
        queryFn: fetchMessages,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // React Query: Sending a reply
    const replyMutation = useMutation({
        mutationFn: sendReply,
        onSuccess: () => {
            message.success('Reply sent successfully!');
            queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
            handleModalClose();
        },
        onError: (err) => {
            message.error(err.response?.data?.message || 'Failed to send reply. Please try again.');
        },
    });

    // Event Handlers
    const handleReplyClick = (record) => {
        setCurrentMessage(record);
        setIsReplyModalVisible(true);
    };

    const handleModalClose = () => {
        setIsReplyModalVisible(false);
        setCurrentMessage(null);
        form.resetFields();
    };

    const handleSendReply = (values) => {
        if (!currentMessage) return;
        replyMutation.mutate({ messageId: currentMessage.id, replyText: values.replyText });
    };

    // Table Column Definitions
    const columns = [
        {
            title: 'Received',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: (date) => format(new Date(date), 'dd MMM yyyy, HH:mm'),
            defaultSortOrder: 'descend',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'New', value: 'New' },
                { text: 'Read', value: 'Read' },
                { text: 'Replied', value: 'Replied' },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: (status) => {
                let color = 'default';
                if (status === 'New') color = 'blue';
                if (status === 'Read') color = 'processing';
                if (status === 'Replied') color = 'success';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Subject', dataIndex: 'subject', key: 'subject' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button type="primary" onClick={() => handleReplyClick(record)} disabled={record.status === 'Replied'}>
                    Reply
                </Button>
            ),
        },
    ];

    // Render Logic
    if (isLoading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Spin size="large" /></div>;
    }

    if (isError) {
        return <Alert message="Error Fetching Data" description={error.response?.data?.message || error.message} type="error" showIcon />;
    }

    return (
        <>
            <div style={{ padding: '24px' }}>
                <Typography.Title level={2} style={{ marginBottom: '24px' }}>
                    Contact Form Messages
                </Typography.Title>
                <Table
                    columns={columns}
                    dataSource={messages}
                    rowKey="id"
                    expandable={{
                        expandedRowRender: (record) => <Paragraph style={{ margin: 0 }}>{record.message}</Paragraph>,
                        rowExpandable: (record) => record.message,
                    }}
                />
            </div>

            {/* Reply Modal */}
            {currentMessage && (
                <Modal
                    title={`Reply to: ${currentMessage.name}`}
                    open={isReplyModalVisible}
                    onCancel={handleModalClose}
                    footer={null}
                    width={600}
                >
                    <div style={{ marginBottom: '24px', padding: '16px', background: '#f5f5f5', borderRadius: '4px', borderLeft: '4px solid #ccc' }}>
                        <Text strong>Original Message from {currentMessage.email}:</Text>
                        <Paragraph style={{ marginTop: '8px' }}>
                            {currentMessage.message}
                        </Paragraph>
                    </div>

                    <Form form={form} onFinish={handleSendReply} layout="vertical">
                        <Form.Item
                            name="replyText"
                            label="Your Reply"
                            rules={[{ required: true, message: 'A reply message is required.' }]}
                        >
                            <TextArea rows={6} placeholder="Type your response here..." />
                        </Form.Item>
                        <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
                            <Button onClick={handleModalClose} style={{ marginRight: 8 }}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" loading={replyMutation.isPending}>
                                Send Reply
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </>
    );
};

// *** THE FIX IS HERE: The invalid text is now a proper comment ***
export default MessageDashboard; // fixed this shit code