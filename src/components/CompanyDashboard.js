// src/pages/CompanyDashboard.js
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import { Card, Row, Col, Typography, Statistic, Alert, Skeleton, Empty, List } from 'antd';
import { StarFilled, TeamOutlined } from '@ant-design/icons';
import {
    ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts';
import { format, parseISO } from 'date-fns';

const { Title, Text } = Typography;

// Helper components remain the same
const RATING_COLORS = { 5: '#22c55e', 4: '#84cc16', 3: '#facc15', 2: '#f97316', 1: '#ef4444' };
const KpiCard = ({ title, value, icon, precision = 1, suffix = '' }) => (
    <Card className="shadow-sm dark:bg-gray-800 border-0 h-full">
        <div className="flex items-center">
            <div className="text-2xl bg-gray-200 dark:bg-gray-700 p-3 rounded-full mr-4">{icon}</div>
            <div>
                <Text type="secondary" className="dark:text-gray-400">{title}</Text>
                <Title level={3} className="my-0 dark:text-white">{value.toFixed(precision)}{suffix}</Title>
            </div>
        </div>
    </Card>
);
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 bg-gray-700 text-white rounded-md border border-gray-600 shadow-lg">
                <p className="label font-semibold">{`${label}`}</p>
                <p style={{ color: payload[0].fill }}>{`Count: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

// --- The Main Dashboard Component ---
const CompanyDashboard = () => {
    const { id } = useParams();

    // 1. Fetch live data. The backend now returns pre-calculated stats.
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['companyDashboard', id],
        queryFn: () => axiosInstance.get(`/companies/${id}/dashboard`),
        enabled: !!id,
    });

    // The backend response is now directly usable. We just need to format the distribution for the chart.
    const dashboardStats = data?.data;

    // 2. Transform the ratingDistribution object into an array for the chart component
    const ratingDistributionForChart = useMemo(() => {
        if (!dashboardStats?.ratingDistribution) return [];
        return [5, 4, 3, 2, 1].map(star => ({
            name: `${star} Star${star > 1 ? 's' : ''}`,
            count: dashboardStats.ratingDistribution[star] || 0,
            rating: star,
        }));
    }, [dashboardStats]);


    // 3. Handle Loading and Error States
    if (isLoading) return <div className="p-8"><Skeleton active paragraph={{ rows: 10 }} /></div>;
    if (isError) return <div className="p-8"><Alert message="Error" description={error.response?.data?.message || "Failed to load dashboard data."} type="error" showIcon /></div>;
    if (!dashboardStats || dashboardStats.totalReviews === 0) {
        return (
            <div className="p-8 text-center">
                <Empty description={<><Title level={4}>No Review Data Available</Title><Text>This company hasn't received any reviews yet.</Text></>} />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <Title level={2} className="mb-6 dark:text-white">{dashboardStats.name} - Review Dashboard</Title>

            <div className="space-y-6">
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} lg={6}><KpiCard title="Average Rating" value={dashboardStats.averageRating} icon={<StarFilled className="text-yellow-400" />} suffix=" / 5" /></Col>
                    <Col xs={24} sm={12} lg={6}><KpiCard title="Total Reviews" value={dashboardStats.totalReviews} precision={0} icon={<TeamOutlined className="text-blue-500" />} /></Col>
                </Row>

                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={16}>
                        <Card title="Recent Reviews" className="shadow-md dark:bg-gray-800 border-0">
                            <List
                                itemLayout="horizontal"
                                dataSource={dashboardStats.recentReviews}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<Text className="dark:text-white">{item.user?.username || 'Anonymous'}</Text>}
                                            description={<Text type="secondary" className="dark:text-gray-400">{item.comment}</Text>}
                                        />
                                        <div className="flex items-center text-yellow-400">
                                            {item.rating} <StarFilled className="ml-1" />
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} lg={8}>
                        <Card title="Rating Breakdown" className="shadow-md dark:bg-gray-800 border-0 h-full">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={ratingDistributionForChart} layout="vertical" margin={{ left: 10, right: 30 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(128, 128, 128, 0.2)" />
                                    <XAxis type="number" allowDecimals={false} tick={{ fill: '#888' }} />
                                    <YAxis type="category" dataKey="name" width={70} tick={{ fill: '#888' }} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }} />
                                    <Bar dataKey="count" name="Total Reviews">
                                        {ratingDistributionForChart.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={RATING_COLORS[entry.rating]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CompanyDashboard;