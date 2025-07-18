import React from 'react';
import { Form, Input, Button, message, Typography } from 'antd';
import axiosInstance from '../../api/axiosInstance';

const { Title } = Typography;

const UserProfileSection = ({ user, onUserUpdate }) => {
    const onFinish = async (values) => {
        try {
            // Calls PUT /api/users/me/details
            const response = await axiosInstance.put('/users/me/details', values);
            message.success('Profile updated successfully!');
            onUserUpdate(response.data.user);
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to update profile.');
        }
    };

    return (
        <div className="mb-8">
            <Title level={3} className="dark:text-gray-200">Profile Details</Title>
            <Form layout="vertical" onFinish={onFinish} initialValues={{ username: user.username, email: user.email }}>
                <Form.Item name="username" label={<span className="dark:text-gray-300">Username</span>} rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label={<span className="dark:text-gray-300">Email Address</span>} rules={[{ required: true, type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Save Changes</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserProfileSection;