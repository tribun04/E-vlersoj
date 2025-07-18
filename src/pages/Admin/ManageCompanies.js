// src/pages/Admin/ManageCompanies.js
import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { Typography, Card, Avatar, Tag, Button, Popconfirm, message, Skeleton, Alert, Input, Row, Col, Modal, Form, Space, Pagination } from 'antd';
import { HomeOutlined, EditOutlined, DeleteOutlined, SearchOutlined, MessageOutlined } from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';

const { Title, Text, Paragraph } = Typography;

// --- Helper Component: Company Card ---
const AdminCompanyCard = ({ company, onEdit, onDelete, isDeleting }) => {
    return (
        <Card
            className="shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-full flex flex-col"
            bodyStyle={{ flexGrow: 1 }}
        >
            <Card.Meta
                avatar={<Avatar size={64} src={company.imageUrl} icon={<HomeOutlined />} />}
                title={<span className="font-bold text-lg dark:text-white">{company.name}</span>}
                description={<Tag color="cyan">{company.industry}</Tag>}
            />
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Paragraph ellipsis={{ rows: 2 }} className="dark:text-gray-400">
                    {company.description || 'No description provided.'}
                </Paragraph>
                <Text type="secondary" className="dark:text-gray-500 text-xs">
                    Created: {formatDistanceToNow(new Date(company.createdAt), { addSuffix: true })}
                </Text>
            </div>
            <div className="flex justify-end mt-4 space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button icon={<EditOutlined />} onClick={() => onEdit(company)}>Edit</Button>
                <Popconfirm
                    title="Delete this company?"
                    description="This is permanent and cannot be undone."
                    onConfirm={() => onDelete(company.id)}
                    okButtonProps={{ loading: isDeleting }}
                    okText="Yes, Delete"
                >
                    <Button danger icon={<DeleteOutlined />} loading={isDeleting}>Delete</Button>
                </Popconfirm>
            </div>
        </Card>
    );
};

// --- Helper Component: Edit Company Modal ---
const EditCompanyModal = ({ company, visible, onUpdate, onCancel, loading }) => {
    const [form] = Form.useForm();
    if (!visible) return null;
    form.setFieldsValue(company); // Pre-fill the form with company data

    return (
        <Modal
            open={visible}
            title={`Edit Company: ${company.name}`}
            onCancel={onCancel}
            onOk={() => form.validateFields().then(values => onUpdate(company.id, values))}
            confirmLoading={loading}
            destroyOnClose
        >
            <Form form={form} layout="vertical">
                <Form.Item name="name" label="Company Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="industry" label="Industry" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

// --- Main Component ---
const ManageCompanies = () => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCompany, setEditingCompany] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const COMPANIES_PER_PAGE = 8;

    const { data: companies, isLoading, isError, error } = useQuery({
        queryKey: ['adminAllCompanies'],
        queryFn: () => axiosInstance.get('/admin/companies').then(res => res.data),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, values }) => axiosInstance.put(`/admin/companies/${id}`, values),
        onSuccess: () => {
            message.success('Company updated successfully!');
            queryClient.invalidateQueries({ queryKey: ['adminAllCompanies'] });
            setIsModalVisible(false);
        },
        onError: (err) => message.error(err.response?.data?.message || 'Failed to update company.'),
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => axiosInstance.delete(`/admin/companies/${id}`),
        onSuccess: () => {
            message.success('Company deleted successfully!');
            queryClient.invalidateQueries({ queryKey: ['adminAllCompanies'] });
        },
        onError: (err) => message.error(err.response?.data?.message || 'Failed to delete company.'),
    });

    const handleEdit = (company) => {
        setEditingCompany(company);
        setIsModalVisible(true);
    };

    const handleUpdate = (id, values) => {
        updateMutation.mutate({ id, values });
    };

    const filteredCompanies = useMemo(() => {
        return (companies || [])
            .filter(company =>
                company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.industry.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [companies, searchTerm]);

    const paginatedCompanies = filteredCompanies.slice((currentPage - 1) * COMPANIES_PER_PAGE, currentPage * COMPANIES_PER_PAGE);

    const renderContent = () => {
        if (isLoading) {
            return (
                <Row gutter={[16, 16]}>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Col key={i} xs={24} sm={12} lg={8} xl={6}>
                            <Card><Skeleton active avatar paragraph={{ rows: 3 }} /></Card>
                        </Col>
                    ))}
                </Row>
            );
        }

        if (isError) {
            return <Alert message="Error" description={error.response?.data?.message || 'Failed to fetch companies.'} type="error" showIcon />;
        }

        if (paginatedCompanies.length === 0) {
            return (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <MessageOutlined className="text-5xl text-gray-400 dark:text-gray-500" />
                    <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">No Companies Found</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search criteria.</p>
                </div>
            );
        }

        return (
            <Row gutter={[16, 16]}>
                {paginatedCompanies.map(company => (
                    <Col key={company.id} xs={24} sm={12} lg={8} xl={6}>
                        <AdminCompanyCard
                            company={company}
                            onEdit={handleEdit}
                            onDelete={deleteMutation.mutate}
                            isDeleting={deleteMutation.isPending && deleteMutation.variables === company.id}
                        />
                    </Col>
                ))}
            </Row>
        );
    };

    return (
        <div className="space-y-6">
            <Title level={2} className="dark:text-white">Manage Companies</Title>

            <Card className="shadow-md bg-white dark:bg-gray-800">
                <Input
                    placeholder="Search by company name or industry..."
                    prefix={<SearchOutlined />}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    allowClear
                />
            </Card>

            {renderContent()}

            {filteredCompanies.length > COMPANIES_PER_PAGE && (
                <div className="flex justify-center mt-6">
                    <Pagination
                        current={currentPage}
                        total={filteredCompanies.length}
                        pageSize={COMPANIES_PER_PAGE}
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false}
                    />
                </div>
            )}

            {editingCompany && (
                <EditCompanyModal
                    company={editingCompany}
                    visible={isModalVisible}
                    onUpdate={handleUpdate}
                    onCancel={() => setIsModalVisible(false)}
                    loading={updateMutation.isPending}
                />
            )}
        </div>
    );
};

export default ManageCompanies;