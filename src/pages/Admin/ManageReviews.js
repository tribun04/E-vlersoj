// src/pages/Admin/ManageReviews.js
import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { Button, Popconfirm, message, Modal, Form, Input, Rate, Alert, Tag, Card, Avatar, Skeleton, Row, Col, Select, Pagination, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { UserOutlined, EditOutlined, DeleteOutlined, MessageOutlined, SearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

// --- Helper Component: Review Card (Unchanged) ---
const AdminReviewCard = ({ review, onEdit, onDelete, isDeleting, deletingId }) => {
    const actions = [<Button key="edit" icon={<EditOutlined />} onClick={() => onEdit(review)}>Edit</Button>, <Popconfirm key="delete" title="Delete this review?" description="This action is permanent." onConfirm={() => onDelete(review.id)} okButtonProps={{ loading: isDeleting && deletingId === review.id }} okText="Yes" cancelText="No"><Button danger icon={<DeleteOutlined />} loading={isDeleting && deletingId === review.id}>Delete</Button></Popconfirm>];
    return (<Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800 h-full flex flex-col" actions={actions} bodyStyle={{ flexGrow: 1 }}> <Card.Meta avatar={<Avatar src={review.user?.avatarUrl} icon={<UserOutlined />} />} title={<div className="flex justify-between items-center"><span className="font-semibold text-gray-800 dark:text-gray-200">{review.user?.username || 'N/A'}</span> <Tag color={review.user?.role === 'admin' ? 'volcano' : 'geekblue'}>{review.user?.role}</Tag></div>} description={<span className="text-sm text-gray-500 dark:text-gray-400">Reviewed on {format(new Date(review.createdAt), 'dd MMM yyyy, HH:mm')}</span>} /> <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"> <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">For Company: <Link to={`/company/${review.company?.id}`} className="font-semibold text-primary hover:underline">{review.company?.name || 'N/A'}</Link></p> <Rate disabled allowHalf value={review.rating} /> <p className="mt-3 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">"{review.comment}"</p> </div> </Card>);
};

// --- Helper Component: Skeleton Loader (Unchanged) ---
const ReviewSkeleton = () => (<Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800 animate-pulse"><div className="flex items-center space-x-4"><Skeleton.Avatar active size="large" shape="circle" /><div className="w-full"><Skeleton.Input active style={{ width: '40%', height: '20px' }} /><Skeleton.Input active style={{ width: '60%', height: '16px', marginTop: '8px' }} /></div></div><Skeleton active paragraph={{ rows: 2, width: '100%' }} className="mt-6" /></Card>);

// --- MAIN COMPONENT ---
const ManageReviews = () => {
    const queryClient = useQueryClient();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const [form] = Form.useForm();

    // --- NEW State for Filtering and Pagination ---
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const REVIEWS_PER_PAGE = 9;

    const { data: reviews, isLoading, isError, error } = useQuery({
        queryKey: ['adminAllReviews'],
        queryFn: () => axiosInstance.get('/reviews/all').then(res => res.data),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, values }) => axiosInstance.put(`/reviews/${id}`, values),
        onSuccess: () => { message.success('Review updated successfully'); queryClient.invalidateQueries({ queryKey: ['adminAllReviews'] }); setIsModalVisible(false); setEditingReview(null); },
        onError: (err) => message.error(err.response?.data?.message || 'Failed to update review'),
    });

    const deleteMutation = useMutation({
        mutationFn: (reviewId) => axiosInstance.delete(`/reviews/${reviewId}`),
        onSuccess: () => { message.success('Review deleted successfully'); queryClient.invalidateQueries({ queryKey: ['adminAllReviews'] }); },
        onError: (err) => message.error(err.response?.data?.message || 'Failed to delete review'),
    });

    const handleEditClick = (review) => { setEditingReview(review); form.setFieldsValue({ comment: review.comment, rating: review.rating, }); setIsModalVisible(true); };
    const handleModalOk = () => { form.validateFields().then(values => { updateMutation.mutate({ id: editingReview.id, values }); }).catch(info => { console.log('Validate Failed:', info); }); };

    // --- NEW: Memoized filtering and sorting logic ---
    const filteredAndSortedReviews = useMemo(() => {
        const sorted = (reviews || []).slice().sort((a, b) => {
            switch (sortBy) {
                case 'highest': return b.rating - a.rating;
                case 'lowest': return a.rating - b.rating;
                case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
                case 'newest':
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

        if (!searchTerm) return sorted;

        const lowercasedTerm = searchTerm.toLowerCase();
        return sorted.filter(review =>
            review.comment.toLowerCase().includes(lowercasedTerm) ||
            review.user?.username.toLowerCase().includes(lowercasedTerm) ||
            review.company?.name.toLowerCase().includes(lowercasedTerm)
        );
    }, [reviews, sortBy, searchTerm]);

    // --- NEW: Client-side pagination logic ---
    const paginatedReviews = filteredAndSortedReviews.slice((currentPage - 1) * REVIEWS_PER_PAGE, currentPage * REVIEWS_PER_PAGE);

    const renderContent = () => {
        if (isLoading) {
            return (<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">{Array.from({ length: 6 }).map((_, i) => <ReviewSkeleton key={i} />)}</div>);
        }
        if (isError) {
            return <Alert message="Error Fetching Reviews" description={error.response?.data?.message || 'An unknown error occurred.'} type="error" showIcon />;
        }
        if (paginatedReviews.length === 0) {
            return (<div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md"><MessageOutlined className="text-5xl text-gray-400 dark:text-gray-500" /><h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">No Reviews Found</h2><p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search or sort criteria.</p></div>);
        }
        return (<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">{paginatedReviews.map((review) => (<AdminReviewCard key={review.id} review={review} onEdit={handleEditClick} onDelete={deleteMutation.mutate} isDeleting={deleteMutation.isPending} deletingId={deleteMutation.variables} />))}</div>);
    };

    return (
        <div className="space-y-6">
            <Title level={2} className="dark:text-white">Manage All Reviews</Title>

            {/* --- NEW: Filter and Sort Controls --- */}
            <Card className="shadow-md bg-white dark:bg-gray-800">
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} md={12}>
                        <Input
                            placeholder="Search in comments, users, or companies..."
                            prefix={<SearchOutlined />}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            allowClear
                        />
                    </Col>
                    <Col xs={24} md={12} className="flex justify-end">
                        <div>
                            <Text className="dark:text-gray-300">Sort By:</Text>
                            <Select value={sortBy} onChange={value => { setSortBy(value); setCurrentPage(1); }} style={{ width: 180 }}>
                                <Option value="newest">Newest First</Option>
                                <Option value="oldest">Oldest First</Option>
                                <Option value="highest">Highest Rating</Option>
                                <Option value="lowest">Lowest Rating</Option>
                            </Select>
                        </div>
                    </Col>
                </Row>
            </Card>

            {renderContent()}

            {/* --- NEW: Pagination Controls --- */}
            {filteredAndSortedReviews.length > REVIEWS_PER_PAGE && (
                <div className="flex justify-center mt-6">
                    <Pagination
                        current={currentPage}
                        total={filteredAndSortedReviews.length}
                        pageSize={REVIEWS_PER_PAGE}
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false}
                    />
                </div>
            )}

            <Modal title="Edit Review" open={isModalVisible} onOk={handleModalOk} onCancel={() => setIsModalVisible(false)} confirmLoading={updateMutation.isPending} destroyOnClose>
                <Form form={form} layout="vertical" name="editReviewForm">
                    <Form.Item name="rating" label="Rating" rules={[{ required: true, message: 'Please provide a rating!' }]}><Rate allowHalf /></Form.Item>
                    <Form.Item name="comment" label="Comment" rules={[{ required: true, message: 'Please provide a comment!' }]}><Input.TextArea rows={4} /></Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageReviews;