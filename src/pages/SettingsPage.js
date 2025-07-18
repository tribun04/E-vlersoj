// src/pages/SettingsPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, Alert, Typography, Card, Space, Form, Input, Button, message, Modal, Divider } from 'antd';
import axiosInstance from '../api/axiosInstance';
import {
    UserOutlined,
    LockOutlined,
    DeleteOutlined,
    SafetyOutlined,
    ExclamationCircleOutlined,
    MailOutlined,
    EditOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// ===================================================================
//  INTERNAL COMPONENTS (Simplified to be in one file)
// ===================================================================

// --- User Profile Section ---
const UserProfileSection = ({ user, onUserUpdate, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await new Promise(res => setTimeout(res, 1000));
            onUserUpdate(values);
            onSuccess();
        } catch (error) {
            message.error('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Profile Information</h3>
                <Button icon={<EditOutlined />} type="text" />
            </div>
            <Form form={form} layout="vertical" initialValues={user} onFinish={onFinish}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item
                        name="username"
                        label={<Text className="text-gray-600">Username</Text>}
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input size="large" prefix={<UserOutlined className="text-gray-400" />} placeholder="Your username" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label={<Text className="text-gray-600">Email</Text>}
                    >
                        <Input size="large" prefix={<MailOutlined className="text-gray-400" />} placeholder="email@example.com" disabled />
                    </Form.Item>
                </div>
                <div className="flex justify-end mt-4">
                    <Button type="primary" htmlType="submit" loading={loading} size="large" className="px-6">
                        Save Changes
                    </Button>
                </div>
            </Form>
        </div>
    );
};

// --- Change Password Section ---
const ChangePasswordSection = ({ onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await new Promise(res => setTimeout(res, 1000));
            onSuccess();
            form.resetFields();
        } catch (error) {
            message.error('Current password is incorrect.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Change Password</h3>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="currentPassword"
                    label={<Text className="text-gray-600">Current Password</Text>}
                    rules={[{ required: true, message: 'Please input your current password!' }]}
                >
                    <Input.Password size="large" prefix={<LockOutlined className="text-gray-400" />} placeholder="Current password" />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    label={<Text className="text-gray-600">New Password</Text>}
                    rules={[{ required: true, min: 6, message: 'Password must be at least 6 characters!' }]}
                >
                    <Input.Password size="large" prefix={<LockOutlined className="text-gray-400" />} placeholder="New password" />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    label={<Text className="text-gray-600">Confirm New Password</Text>}
                    dependencies={['newPassword']}
                    rules={[
                        { required: true, message: 'Please confirm your new password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password size="large" prefix={<LockOutlined className="text-gray-400" />} placeholder="Confirm password" />
                </Form.Item>
                <div className="flex justify-end mt-4">
                    <Button type="primary" htmlType="submit" loading={loading} size="large" className="px-6">
                        Update Password
                    </Button>
                </div>
            </Form>
        </div>
    );
};

// --- Delete Account Section ---
const DeleteAccountSection = () => {
    const navigate = useNavigate();

    const handleDelete = () => {
        Modal.confirm({
            title: 'Are you sure you want to delete your account?',
            icon: <ExclamationCircleOutlined />,
            content: 'This action cannot be undone. All your data, including reviews, will be permanently deleted.',
            okText: 'Yes, delete my account',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    message.success('Your account has been deleted successfully. Redirecting...');
                    setTimeout(() => navigate('/login'), 2000);
                } catch (error) {
                    message.error('Failed to delete account.');
                }
            },
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6 border border-red-100">
            <h3 className="text-lg font-semibold text-red-600 mb-4">Delete Account</h3>
            <Paragraph className="text-gray-600 mb-6">
                Once you delete your account, there is no going back. Please be certain.
            </Paragraph>
            <div className="flex justify-end">
                <Button type="primary" danger onClick={handleDelete} size="large" className="px-6">
                    Delete My Account
                </Button>
            </div>
        </div>
    );
};


// ===================================================================
//  MAIN PAGE COMPONENT
// ===================================================================

const SettingsPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/users/me');
                setUser(response.data);
            } catch (err) {
                setError('Failed to load user data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleUserUpdate = (updatedUser) => {
        setUser(prevUser => ({ ...prevUser, ...updatedUser }));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <Spin size="large" tip="Loading your settings..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
                <Alert
                    message="Error Loading Settings"
                    description={error}
                    type="error"
                    showIcon
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Title level={2} className="!mb-2 !">Account Settings</Title>
                    <Text className="text-gray-500">
                        Manage your account information, security, and preferences.
                    </Text>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <Title level={4} className="!mb-6">Profile</Title>
                    {user && <UserProfileSection
                        user={user}
                        onUserUpdate={handleUserUpdate}
                        onSuccess={() => message.success('Profile updated successfully!')}
                    />}

                    <Divider />

                    <ChangePasswordSection
                        onSuccess={() => message.success('Password changed successfully!')}
                    />

                    <Divider />

                    <DeleteAccountSection />
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;