import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

// FIXED #2: Import Button and other necessary Ant Design components
import { Spin, Alert, Tag, Avatar, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

// FIXED #1: This will now work after you run `npm install dompurify`
import DOMPurify from 'dompurify';

const BlogPostDetailPage = () => {
    const { slug } = useParams(); // Get slug from URL

    const { data: post, error, isLoading } = useQuery({
        queryKey: ['blog', slug], // Dynamic key to cache each post individually
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/blogs/${slug}`);
            return data;
        },
        enabled: !!slug, // Only run the query if slug exists
    });

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    }

    if (error) {
        return (
            <div className="container mx-auto py-20 text-center">
                <Alert
                    message="Artikulli Nuk u Gjet"
                    description={error.response?.data?.error || "Pati një problem gjatë ngarkimit të këtij artikulli."}
                    type="error"
                    showIcon
                />
                <Link to="/blog" className="mt-6 inline-block">
                    {/* This Button component is now defined */}
                    <Button type="primary" icon={<ArrowLeftOutlined />}>Kthehu te Blogu</Button>
                </Link>
            </div>
        );
    }

    const cleanHtml = DOMPurify.sanitize(post.content);

    return (
        <div className="bg-white dark:bg-gray-900 pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4">
                <Link to="/blog" className="text-black dark:text-white hover:underline mb-8 inline-flex items-center gap-2">
                    <ArrowLeftOutlined />
                    Kthehu te të gjithë artikujt
                </Link>

                <article>
                    <header className="mb-8">
                        {post.category && <p className="text-black dark:text-white font-semibold mb-2">{post.category}</p>}
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">{post.title}</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">{post.excerpt}</p>
                        <div className="mt-6 flex items-center gap-4 text-sm">
                            <Avatar size="large">{post.author ? post.author.charAt(0) : 'A'}</Avatar>
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">{post.author || 'Anonim'}</p>
                                <p className="text-gray-500 dark:text-gray-400">{new Date(post.publishedAt).toLocaleDateString('sq-AL', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                        </div>
                    </header>

                    <img src={post.coverImage || '/images/blog/default-placeholder.jpg'} alt={post.title} className="w-full rounded-lg shadow-lg mb-8" />

                    <div
                        className="prose prose-lg dark:prose-invert max-w-none text-black dark:text-white "
                        dangerouslySetInnerHTML={{ __html: cleanHtml }}
                    />

                    <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Etiketat</h3>
                        {post.tags && post.tags.map(tag => (
                            <Tag key={tag.name} color="cyan" className="mr-1 mb-1">{tag.name}</Tag>
                        ))}
                    </footer>
                </article>
            </div>
        </div>
    );
};

export default BlogPostDetailPage;