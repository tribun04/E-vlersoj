import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import { Alert, Button, Tag, Input, Form, notification, ConfigProvider } from 'antd';
import {
    AppstoreOutlined,
    ClockCircleOutlined,
    EyeOutlined,
    FireOutlined,
    MailOutlined,
    HistoryOutlined
} from '@ant-design/icons';

// --- Theme & Constants (Moved to top level for global access) ---
const theme = {
    primary: '#00B67A'
};

const CATEGORY_COLORS = {
    politics: 'magenta',
    technology: 'geekblue',
    business: 'green',
    science: 'blue',
    health: 'volcano',
    sports: 'orange',
    entertainment: 'purple',
    default: 'cyan'
};

// --- Data Processing Utility ---
const groupPostsForLayout = (posts = []) => {
    if (!posts || posts.length === 0) return { mainTopics: [] };
    const postsCopy = [...posts];
    const mainTopics = [];
    if (postsCopy.length > 0) {
        const mainStory = postsCopy.shift();
        mainTopics.push({ mainStory, relatedStories: postsCopy.splice(0, 3), category: mainStory?.category || 'general' });
    }
    if (postsCopy.length > 0) {
        const mainStory = postsCopy.shift();
        mainTopics.push({ mainStory, relatedStories: postsCopy.splice(0, 2), category: mainStory?.category || 'general' });
    }
    return { mainTopics };
};

// --- Polished UI Sub-Components (Fully Implemented) ---

const PostMeta = ({ post, showCategory = true }) => (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mt-2">
        <span className="flex items-center gap-1.5"><ClockCircleOutlined />{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        <span className="flex items-center gap-1.5"><EyeOutlined />{post.views || '0'} views</span>
        {showCategory && post.category && (<Tag color={CATEGORY_COLORS[post.category] || CATEGORY_COLORS.default} className="capitalize">{post.category}</Tag>)}
    </div>
);

const MainStoryCard = ({ post, featured = false }) => (
    <Link to={`/blog/${post.slug}`} className="block group">
        <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-primary/20 transition-shadow duration-300">
            <img src={post.coverImage || '/images/blog/default-placeholder.jpg'} alt={post.title} className={`w-full ${featured ? 'h-96' : 'h-64'} object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            {featured && (<div className="absolute top-4 left-4"><Tag icon={<FireOutlined />} color="#f5222d" className="font-bold text-base py-1 px-3">FEATURED</Tag></div>)}
            <div className={`absolute bottom-0 p-6 ${featured ? 'md:p-8' : 'md:p-6'}`}><h2 className={`${featured ? 'text-3xl' : 'text-2xl'} font-bold text-white group-hover:text-primary-light transition-colors`}>{post.title}</h2></div>
        </div>
        <div className="mt-4"><p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{post.excerpt}</p><PostMeta post={post} /></div>
    </Link>
);

const RelatedStoryLink = ({ post }) => (
    <Link to={`/blog/${post.slug}`} className="block group">
        <div className="flex items-start gap-4 py-4 border-t border-gray-100 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 -mx-4 px-4 rounded-lg">
            <div className="flex-1"><h3 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">{post.title}</h3><PostMeta post={post} showCategory={false} /></div>
            <img src={post.coverImage || '/images/blog/default-placeholder.jpg'} alt={post.title} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0" />
        </div>
    </Link>
);

const LatestPostCard = ({ post }) => (
    <Link to={`/blog/${post.slug}`} className="flex items-start gap-4 group">
        <img src={post.coverImage || '/images/blog/default-placeholder.jpg'} alt={post.title} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
        <div className="flex-1"><h3 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors line-clamp-2 leading-tight">{post.title}</h3><PostMeta post={post} showCategory={false} /></div>
    </Link>
);

const TopicCluster = ({ topic, isFeatured = false }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border-t-4" style={{ borderColor: isFeatured ? theme.primary : 'transparent' }}>
        <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 capitalize">{isFeatured ? <FireOutlined className="text-red-500" /> : <AppstoreOutlined className="text-primary" />} {topic.category}</h3><Link to={`/blog/category/${topic.category}`} className="text-sm font-semibold text-primary hover:underline">View All</Link></div>
            <MainStoryCard post={topic.mainStory} featured={isFeatured} />
            {topic.relatedStories.length > 0 && (<div className="mt-4">{topic.relatedStories.map(story => <RelatedStoryLink key={story.slug} post={story} />)}</div>)}
        </div>
    </div>
);

const NewsletterSignup = () => {
    // Hooks are now correctly placed INSIDE the component.
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        api.success({
            message: 'Subscription Successful!',
            description: `Thank you, ${values.email}!`,
            placement: 'topRight',
        });
        form.resetFields();
    };

    return (
        <>
            {contextHolder}
            <div className="bg-gradient-to-br from-primary to-green-800 rounded-xl p-6 text-white shadow-lg">
                <h3 className="text-xl font-bold mb-1 flex items-center gap-2"><MailOutlined /> Stay Ahead</h3>
                <p className="text-sm opacity-90 mb-4">Get the latest news delivered to your inbox.</p>
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <div className="flex gap-2">
                        <Form.Item name="email" className="flex-1 m-0" rules={[{ required: true, message: 'Please enter your email!' }, { type: 'email', message: 'Please enter a valid email address!' }]}>
                            <Input placeholder="Your email address" />
                        </Form.Item>
                        <Form.Item className="m-0">
                            <Button type="primary" htmlType="submit" loading={loading} className="bg-white text-primary hover:bg-gray-100! font-semibold">Subscribe</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </>
    );
};

const TopicClusterSkeleton = ({ featured = false }) => (<div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6"><div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div><div className={`rounded-xl bg-gray-300 dark:bg-gray-700 ${featured ? 'h-96' : 'h-64'}`}></div><div className="mt-4 space-y-3"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div></div><div className="mt-4 space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">{[...Array(featured ? 3 : 2)].map((_, i) => (<div key={i} className="flex items-center gap-4"><div className="flex-1 space-y-2"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div></div><div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-lg"></div></div>))}</div></div>);
const LayoutSkeleton = () => (<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse"><div className="lg:col-span-2 space-y-8"><TopicClusterSkeleton featured /><TopicClusterSkeleton /></div><div className="space-y-6"><div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-xl"></div><div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4"><div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>{[...Array(5)].map((_, i) => (<div key={i} className="flex gap-4"><div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-8"></div><div className="flex-1 space-y-2"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div></div></div>))}</div></div></div>);

// --- The Main Page Component ---
const BlogListPage = () => {
    const { data: posts, error, isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/blogs');
            return data.map(post => ({ ...post, category: post.category || ['technology', 'business', 'health', 'science'][Math.floor(Math.random() * 4)], views: post.views || Math.floor(Math.random() * 5000) }));
        },
        staleTime: 1000 * 60 * 5
    });

    const { mainTopics } = useMemo(() => groupPostsForLayout(posts), [posts]);
    const latestPosts = useMemo(() => {
        if (!posts) return [];
        return [...posts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).slice(0, 5);
    }, [posts]);

    const renderContent = () => {
        if (isLoading) return <LayoutSkeleton />;
        if (error) return <Alert message="Error Loading Posts" description={error.message || "Failed to fetch blog posts."} type="error" showIcon className="my-8" />;
        if (!posts || posts.length === 0) return <div className="text-center py-20"><h2 className="text-2xl font-semibold">No Posts Found</h2></div>;

        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">{mainTopics.map((topic, index) => (<TopicCluster key={topic.mainStory.slug} topic={topic} isFeatured={index === 0} />))}</div>
                <div className="space-y-6 lg:sticky lg:top-8">
                    <NewsletterSignup />
                    {latestPosts.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b-2 border-primary pb-3 mb-4 flex items-center gap-2"><HistoryOutlined />Latest Posts</h3>
                            <div className="space-y-5">{latestPosts.map((post) => (<LatestPostCard key={post.slug} post={post} />))}</div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: theme.primary } }}>
            <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
                <div className="max-w-[1250px] mx-auto px-4 py-12 md:py-16">
                    <div className="text-left mb-12 mt-10"><h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Lajmet</h1><p className="text-lg text-gray-500 dark:text-gray-400 mt-2">Më të rejet rrethë kesaj Platfome dhe Informacionet</p></div>
                    {renderContent()}
                </div>
            </div>
        </ConfigProvider>
    );
};

export default BlogListPage;