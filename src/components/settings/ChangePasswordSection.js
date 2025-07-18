import React from 'react';
import { Form, Input, Button, message, Typography } from 'antd';
import axiosInstance from '../../api/axiosInstance';

const { Title } = Typography;

const ChangePasswordSection = () => {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        try {
            // Calls PUT /api/users/me/password
            await axiosInstance.put('/users/me/password', {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
            });
            message.success('Password changed successfully!');
            form.resetFields();
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to change password.');
        }
    };
    return (
        <div className="mb-8">
            <Title level={3} className="dark:text-gray-200">Change Password</Title>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="oldPassword" label={<span className="dark:text-gray-300">Current Password</span>} rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item name="newPassword" label={<span className="dark:text-gray-300">New Password</span>} rules={[{ required: true, min: 6 }]} hasFeedback>
                    <Input.Password />
                </Form.Item>
                <Form.Item name="confirmPassword" label={<span className="dark:text-gray-300">Confirm New Password</span>} dependencies={['newPassword']} hasFeedback rules={[{ required: true }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('newPassword') === value) return Promise.resolve(); return Promise.reject(new Error('Passwords do not match!')); } })]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item><Button type="primary" htmlType="submit">Update Password</Button></Form.Item>
            </Form>
        </div>
    );
};
export default ChangePasswordSection;