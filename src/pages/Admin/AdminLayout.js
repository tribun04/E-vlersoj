// src/components/admin/AdminLayout.js
import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const { Content, Sider } = Layout;

const AdminLayout = () => (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider width={220} theme="dark">
            <AdminSidebar />
        </Sider>
        <Layout>
            <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 'calc(100vh - 112px)' }}>
                    {/* The correct page (Dashboard, ManageUsers, etc.) will be rendered here */}
                    <Outlet />
                </div>
            </Content>
        </Layout>
    </Layout>
);

export default AdminLayout;