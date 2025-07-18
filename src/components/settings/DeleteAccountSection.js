// src/components/settings/DeleteAccountSection.js

import React, { useState } from 'react';
import { Button, Modal, Typography, message, Input } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const DeleteAccountSection = () => {
    // --- State for the modal and password input ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // --- Function to handle the final deletion ---
    const handleDelete = async () => {
        if (!password) {
            message.error('Password is required to confirm deletion.');
            return;
        }

        setLoading(true);
        try {
            // ✅ THE FIX: Send the password in the 'data' payload of the DELETE request.
            await axiosInstance.delete('/users/deleteMe', {
                data: { password: password }
            });

            message.success('Account deleted successfully.');
            localStorage.removeItem('token');
            navigate('/');
            window.location.reload();

        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to delete account. Incorrect password?');
        } finally {
            setLoading(false);
            setIsModalOpen(false);
            setPassword('');
        }
    };

    return (
        <div>
            <Title level={4} className="flex items-center gap-2 dark:text-gray-200">
                <DeleteOutlined /> Danger Zone
            </Title>
            <div className="pl-6 border-l-2 border-gray-200 dark:border-gray-700 mt-4 ml-2">
                <div className="p-4 border border-red-500 rounded-lg flex justify-between items-center">
                    <div>
                        <Text strong className="dark:text-gray-200">Delete this account</Text>
                        <Text type="secondary" block className="dark:text-gray-400">
                            Once you delete your account, there is no going back. Please be certain.
                        </Text>
                    </div>
                    {/* This button now just opens the confirmation modal */}
                    <Button danger onClick={() => setIsModalOpen(true)}>
                        Delete Account
                    </Button>
                </div>
            </div>

            {/* --- The Confirmation Modal --- */}
            <Modal
                title={
                    <div className="flex items-center">
                        <ExclamationCircleOutlined className="text-red-500 mr-2" />
                        <span>Are you absolutely sure?</span>
                    </div>
                }
                open={isModalOpen}
                onOk={handleDelete}
                onCancel={() => setIsModalOpen(false)}
                okText="Delete My Account"
                confirmLoading={loading}
                okButtonProps={{ danger: true, disabled: !password }}
            >
                <p>This action cannot be undone. This will permanently delete your account and all associated data.</p>
                <p className="mt-4 font-semibold">Please enter your password to confirm:</p>
                <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    onPressEnter={handleDelete} // Allows pressing Enter to submit
                />
            </Modal>
        </div>
    );
};

export default DeleteAccountSection;