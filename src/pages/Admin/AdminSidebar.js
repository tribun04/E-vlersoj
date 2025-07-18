// src/components/admin/AdminSidebar.js
import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { DashboardOutlined, UserOutlined, BankOutlined, MessageOutlined, PlusOutlined } from '@ant-design/icons';

const AdminSidebar = () => {
    const location = useLocation();

    const menuItems = [
        {
            key: '/admin',
            icon: <DashboardOutlined />,
            label: <Link to="/admin">Dashboard</Link>,
        },
        {
            key: '/admin/users',
            icon: <UserOutlined />,
            label: <Link to="/admin/users">Manage Users</Link>,
        },
        {
            key: '/admin/companies',
            icon: <BankOutlined />,
            label: <Link to="/admin/companies">Manage Companies</Link>,
        },
        {
            key: '/admin/reviews',
            icon: <MessageOutlined />,
            label: <Link to="/admin/reviews">Manage Reviews</Link>,
        },
        {
            key: '/admin/message',
            icon: <MessageOutlined />,
            label: <Link to="/admin/message">Manage message</Link>,
        },
        {
            // A more standard URL convention is all lowercase
            key: '/admin/add-blog',
            icon: <PlusOutlined />, // Added the icon
            // Added the label with a Link component
            label: <Link to="/admin/add-blog">Add New Post</Link>,
        }

    ];

    return (
        <>
            <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                Vlersoj Admin
            </div>
            <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
        </>
    );
};

export default AdminSidebar;