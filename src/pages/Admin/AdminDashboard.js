// src/pages/Admin/AdminDashboard.js

import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { Typography, Row, Col, Card, Spin, Alert, Skeleton, Avatar, Tag, List, Statistic } from 'antd';
import { UserOutlined, HomeOutlined, MessageOutlined, LoginOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/plots';

// Import new date-fns functions
import { format, subDays, formatDistanceToNow, isToday, isThisWeek, isThisMonth } from 'date-fns';

const { Title, Text } = Typography;

// --- Helper Component: Stat Card (Unchanged) ---
const StatCard = ({ icon, title, value, loading, color }) => (
    <Card className="shadow-md"> <Spin spinning={loading}> <div className="flex items-center"> <div className={`text-2xl p-4 rounded-full mr-4 ${color}`}>{icon}</div> <div> <Text strong className="text-lg">{title}</Text> <Title level={3} style={{ margin: 0 }}>{value}</Title> </div> </div> </Spin> </Card>
);

// --- Helper Component: Recent Activity List (Unchanged) ---
const RecentActivityList = ({ title, data, renderItem, loading }) => (
    <Card title={title} className="shadow-md h-full"> {loading ? (<Skeleton active avatar paragraph={{ rows: 4 }} />) : (<List itemLayout="horizontal" dataSource={data} renderItem={renderItem} />)} </Card>
);

// --- Main Dashboard Component ---
const AdminDashboard = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['adminDashboardStats'],
        queryFn: async () => {
            const [usersRes, companiesRes, reviewsRes] = await Promise.all([
                axiosInstance.get('/admin/users'),
                axiosInstance.get('/admin/companies'),
                axiosInstance.get('/admin/reviews'),
            ]);

            const users = usersRes.data;
            const reviews = reviewsRes.data;
            const thirtyDaysAgo = subDays(new Date(), 30);

            // --- NEW: Process Login Statistics ---
            let loginsToday = 0;
            let loginsThisWeek = 0;
            let loginsThisMonth = 0;

            users.forEach(user => {
                if (user.lastLogin) { // Only count users who have a lastLogin date
                    const lastLoginDate = new Date(user.lastLogin);
                    if (isToday(lastLoginDate)) loginsToday++;
                    if (isThisWeek(lastLoginDate, { weekStartsOn: 1 })) loginsThisWeek++;
                    if (isThisMonth(lastLoginDate)) loginsThisMonth++;
                }
            });

            const userChartData = users
                .filter(user => new Date(user.createdAt) > thirtyDaysAgo)
                .reduce((acc, user) => {
                    const date = format(new Date(user.createdAt), 'yyyy-MM-dd');
                    acc[date] = (acc[date] || 0) + 1;
                    return acc;
                }, {});

            const formattedChartData = Object.keys(userChartData).map(date => ({
                date, count: userChartData[date], category: 'Users'
            })).sort((a, b) => new Date(a.date) - new Date(b.date));

            return {
                totals: {
                    users: users.length,
                    companies: companiesRes.data.length,
                    reviews: reviews.length,
                },
                loginStats: { // New object for login data
                    today: loginsToday,
                    week: loginsThisWeek,
                    month: loginsThisMonth,
                },
                recentUsers: users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
                recentReviews: reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
                chartData: formattedChartData
            };
        }
    });

    const chartConfig = {
        data: data?.chartData || [],
        xField: 'date', yField: 'count', seriesField: 'category',
        point: { size: 4, shape: 'diamond' }, lineStyle: { lineWidth: 2 },
        color: '#1677ff', tooltip: { title: 'Date', formatter: (datum) => ({ name: 'New Users', value: datum.count }) },
        yAxis: { min: 0, title: { text: 'Number of Registrations' } },
        xAxis: { title: { text: 'Date (Last 30 Days)' } }
    };

    if (isError) return <Alert message="Error" description={error.response?.data?.message || 'Could not load dashboard data.'} type="error" showIcon />;

    return (
        <div className="space-y-6">
            <Title level={2}>Admin Dashboard</Title>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}> <StatCard icon={<UserOutlined />} title="Total Users" value={data?.totals.users} loading={isLoading} color="bg-blue-100 text-blue-600" /> </Col>
                <Col xs={24} sm={12} md={8}> <StatCard icon={<HomeOutlined />} title="Total Companies" value={data?.totals.companies} loading={isLoading} color="bg-green-100 text-green-600" /> </Col>
                <Col xs={24} sm={12} md={8}> <StatCard icon={<MessageOutlined />} title="Total Reviews" value={data?.totals.reviews} loading={isLoading} color="bg-purple-100 text-purple-600" /> </Col>
            </Row>

            {/* --- NEW: Login Activity Card --- */}
            <Card title="Login Activity" className="shadow-md">
                {isLoading ? (<Skeleton active paragraph={{ rows: 2 }} />) : (
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={8}>
                            <Statistic title="Logged in Today" value={data?.loginStats.today} prefix={<LoginOutlined />} />
                        </Col>
                        <Col xs={24} sm={8}>
                            <Statistic title="Logged in This Week" value={data?.loginStats.week} prefix={<LoginOutlined />} />
                        </Col>
                        <Col xs={24} sm={8}>
                            <Statistic title="Logged in This Month" value={data?.loginStats.month} prefix={<LoginOutlined />} />
                        </Col>
                    </Row>
                )}
            </Card>

            <Card title="User Registrations (Last 30 Days)" className="shadow-md">
                {isLoading ? <Skeleton active paragraph={{ rows: 6 }} /> : <Line {...chartConfig} height={300} />}
            </Card>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <RecentActivityList title="Recently Joined Users" loading={isLoading} data={data?.recentUsers} renderItem={user => (<List.Item> <List.Item.Meta avatar={<Avatar src={user.avatarUrl} icon={<UserOutlined />} />} title={<Link to={`/admin/users/${user.id}`} className="font-semibold">{user.username}</Link>} description={<Text type="secondary">{formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}</Text>} /> <Tag color={user.role === 'admin' ? 'volcano' : (user.role === 'company' ? 'gold' : 'geekblue')}>{user.role}</Tag> </List.Item>)} />
                </Col>
                <Col xs={24} lg={12}>
                    <RecentActivityList title="Latest Reviews" loading={isLoading} data={data?.recentReviews} renderItem={review => (<List.Item> <List.Item.Meta avatar={<Avatar src={review.user?.avatarUrl} icon={<UserOutlined />} />} title={<Text>{`"${review.comment.substring(0, 50)}..."`}</Text>} description={<span> By <Link to={`/admin/users/${review.user?.id}`} className="font-semibold">{review.user?.username}</Link> for <Link to={`/company/${review.company?.id}`} className="font-semibold">{review.company?.name}</Link> </span>} /> </List.Item>)} />
                </Col>
            </Row>
        </div>
    );
};

export default AdminDashboard;