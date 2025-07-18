// src/pages/Admin/ManageUsers.js
import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { Typography, Card, Avatar, Tag, Button, Popconfirm, message, Skeleton, Alert, Input, Row, Col, Modal, Form, Select, Space, Pagination } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined, MessageOutlined } from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';

const { Title, Text } = Typography;
const { Option } = Select;

// --- Helper Component: User Card (Unchanged) ---
const AdminUserCard = ({ user, onEdit, onDelete, isDeleting, isUpdating, editingId }) => {
  return (
    <Card className="shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <Card.Meta
        avatar={<Avatar size={64} src={user.avatarUrl} icon={<UserOutlined />} />}
        title={<span className="font-bold text-lg dark:text-white">{user.username}</span>}
        description={<Text type="secondary" className="dark:text-gray-400">{user.email}</Text>}
      />
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <div><Text strong className="dark:text-gray-300">Role: </Text><Tag color={user.role === 'admin' ? 'volcano' : user.role === 'company' ? 'gold' : 'geekblue'}>{user.role.toUpperCase()}</Tag></div>
        <div><Text strong className="dark:text-gray-300">Joined: </Text><Text type="secondary" className="dark:text-gray-400">{formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}</Text></div>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <Popconfirm
          title="Delete this user?"
          description="This is permanent and cannot be undone."
          onConfirm={() => onDelete(user.id)}
          okButtonProps={{ loading: isDeleting }}
          okText="Yes, Delete"
        >
          <Button danger icon={<DeleteOutlined />} loading={isDeleting}>Delete</Button>
        </Popconfirm>
      </div>
    </Card>
  );
};


// --- Main Component ---
const ManageUsers = () => {
  const queryClient = useQueryClient();
  const [roleFilter, setRoleFilter] = useState('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const USERS_PER_PAGE = 8;

  // REMOVED: The `searchTerm` state is no longer needed.
  // const [searchTerm, setSearchTerm] = useState('');

  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['adminAllUsers'],
    queryFn: () => axiosInstance.get('/admin/users').then(res => res.data),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }) => axiosInstance.put(`/admin/users/${id}`, values),
    onSuccess: () => {
      message.success('User updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['adminAllUsers'] });
      setIsModalVisible(false);
    },
    onError: (err) => message.error(err.response?.data?.message || 'Failed to update user.'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/admin/users/${id}`),
    onSuccess: () => {
      message.success('User deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['adminAllUsers'] });
    },
    onError: (err) => message.error(err.response?.data?.message || 'Failed to delete user.'),
  });

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleUpdate = (id, values) => {
    updateMutation.mutate({ id, values });
  };

  // REMOVED: The search filter logic is gone.
  const filteredUsers = useMemo(() => {
    return (users || [])
      .filter(user => roleFilter === 'all' || user.role === roleFilter);
  }, [users, roleFilter]); // Dependency array is now simpler.

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Row gutter={[16, 16]}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Col key={i} xs={24} sm={12} lg={8} xl={6}>
              <Card><Skeleton active avatar paragraph={{ rows: 2 }} /></Card>
            </Col>
          ))}
        </Row>
      );
    }

    if (isError) {
      return <Alert message="Error" description={error.response?.data?.message || 'Failed to fetch users.'} type="error" showIcon />;
    }

    if (paginatedUsers.length === 0) {
      return (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <MessageOutlined className="text-5xl text-gray-400 dark:text-gray-500" />
          <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">No Users Found</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your filter criteria.</p>
        </div>
      );
    }

    return (
      <Row gutter={[16, 16]}>
        {paginatedUsers.map(user => (
          <Col key={user.id} xs={24} sm={12} lg={8} xl={6}>
            <AdminUserCard
              user={user}
              onEdit={handleEdit}
              onDelete={deleteMutation.mutate}
              isDeleting={deleteMutation.isPending && deleteMutation.variables === user.id}
              isUpdating={updateMutation.isPending}
              editingId={editingUser?.id}
            />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <div className="space-y-6">
      <Title level={2} className="dark:text-white">Manage Users</Title>

      {/* REMOVED: The Search Bar UI and its containing Col are gone. */}
      <Card className="shadow-md bg-white dark:bg-gray-800">
        <Space>
          <Text className="dark:text-gray-300">Filter by Role:</Text>
          <Select value={roleFilter} onChange={value => { setRoleFilter(value); setCurrentPage(1); }} style={{ width: 150 }}>
            <Option value="all">All Roles</Option>
            <Option value="user">User</Option>
            <Option value="company">Company</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Space>
      </Card>

      {renderContent()}

      {filteredUsers.length > USERS_PER_PAGE && (
        <div className="flex justify-center mt-6">
          <Pagination
            current={currentPage}
            total={filteredUsers.length}
            pageSize={USERS_PER_PAGE}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}


    </div>
  );
};

export default ManageUsers;