// src/pages/CompanyDetail.js

import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import AuthContext from '../context/AuthContext';
import { StarFilled, StarOutlined, EditOutlined, MessageOutlined, UserOutlined, CloseOutlined, PlusOutlined, BarChartOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Select, Skeleton, Avatar, Input, Form, Modal, InputNumber, Slider, Upload, ConfigProvider, Popconfirm, Card } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

// --- Helper Components (with the fix applied) ---
const getReviewAverage = (review) => { if (review.rating) return review.rating; if (review.quality && review.service && review.value) { return (review.quality + review.service + review.value) / 3; } return 0; };

// --- FIX IS HERE ---
// The typo 'review.value' has been corrected to 'values.value'.
// Also formatted for better readability.
const LiveReviewSummary = ({ values }) => {
    if (!values || !values.quality || !values.service || !values.value) {
        return null;
    }
    const avg = ((values.quality + values.service + values.value) / 3).toFixed(1);
    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg mt-4">
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Përmbledhja Juaj</h4>
            <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <p>Cilësia: {values.quality}/5</p>
                <p>Shërbimi: {values.service}/5</p>
                <p>Vlera: {values.value}/5</p>
                <hr className="my-2 border-gray-200 dark:border-gray-600" />
                <p className="font-bold">Mesatarja: {avg}/5</p>
            </div>
        </div>
    );
};
// --- END OF FIX ---

const EditCompanyModal = ({ visible, onUpdate, onCancel, initialData, loading }) => { const [form] = Form.useForm(); const [fileList, setFileList] = useState([]); useEffect(() => { if (initialData) { form.setFieldsValue(initialData); if (initialData.imageUrl) { setFileList([{ uid: '-1', name: 'logo.png', status: 'done', url: initialData.imageUrl }]); } else { setFileList([]); } } }, [initialData, visible, form]); const handleOk = () => { form.validateFields().then(values => { const updatedValues = { ...values }; if (fileList.length > 0 && fileList[0].originFileObj) { updatedValues.image = fileList[0].originFileObj; } else if (fileList.length === 0) { updatedValues.imageUrl = null; } onUpdate(updatedValues); }).catch(info => { console.log('Validate Failed:', info); }); }; const handleUploadChange = ({ fileList: newFileList }) => { setFileList(newFileList); }; const uploadButton = (<div><PlusOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>); return (<ConfigProvider theme={{ token: { colorPrimary: '#00B67A' } }}><Modal open={visible} title="Modifiko Detajet e Kompanisë" onCancel={onCancel} footer={[<Button key="back" onClick={onCancel}>Anulo</Button>, <Button key="submit" type="primary" loading={loading} onClick={handleOk}>Ruaj Ndryshimet</Button>]}><Form form={form} layout="vertical" name="edit_company_form" encType="multipart/form-data"><Form.Item label="Logo e Kompanisë"><Upload listType="picture-card" fileList={fileList} onChange={handleUploadChange} beforeUpload={() => false} maxCount={1}>{fileList.length >= 1 ? null : uploadButton}</Upload></Form.Item><Form.Item name="name" label="Emri i Kompanisë" rules={[{ required: true, message: 'Ju lutem shkruani emrin!' }]}><Input /></Form.Item><Form.Item name="industry" label="Industria" rules={[{ required: true, message: 'Ju lutem shkruani industrinë!' }]}><Input /></Form.Item><Form.Item name="address" label="Adresa" rules={[{ required: true, message: 'Ju lutem shkruani adresën!' }]}><Input /></Form.Item><Form.Item name="establishedYear" label="Viti i Themelimit"><InputNumber style={{ width: '100%' }} min={1800} max={new Date().getFullYear()} /></Form.Item><Form.Item name="description" label="Përshkrimi" rules={[{ required: true, message: 'Ju lutem jepni një përshkrim!' }]}><TextArea rows={4} /></Form.Item></Form></Modal></ConfigProvider>); };
const RatingBar = ({ label, rating }) => { const numericRating = Number(rating) || 0; const ratingPercentage = (numericRating / 5) * 100; const getRatingColor = (r) => { if (r >= 4) return 'bg-green-500'; if (r >= 2.5) return 'bg-yellow-500'; return 'bg-red-500'; }; return (<div className="space-y-1"><label className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</label><div className="flex items-center space-x-3"><div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2"><div className={`${getRatingColor(numericRating)} h-2 rounded-full`} style={{ width: `${ratingPercentage}%` }}></div></div><span className="font-semibold text-gray-700 dark:text-gray-200 text-sm whitespace-nowrap">{numericRating.toFixed(1)}/5</span></div></div>); };
const ReviewCard = ({ review }) => { const averageRating = getReviewAverage(review); return (<div className="border-t border-gray-200 dark:border-gray-700 py-6"><div className="flex items-start"><Avatar src={review.user?.avatarUrl} icon={<UserOutlined />} size="large" /><div className="ml-4 flex-grow"><div className="flex justify-between items-center"><p className="font-semibold text-gray-800 dark:text-gray-200">{review.user?.name || 'Përdorues Anonim'}</p><span className="text-sm text-gray-500 dark:text-gray-400">{new Date(review.createdAt).toLocaleDateString('sq-AL')}</span></div><p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{review.comment}</p><div className="mt-4 space-y-3"><RatingBar label="Vlerësimi i Përgjithshëm" rating={averageRating} />{review.quality && (<div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3"><RatingBar label="Cilësia" rating={review.quality} /><RatingBar label="Shërbimi" rating={review.service} /><RatingBar label="Vlera" rating={review.value} /></div>)}</div></div></div></div>); };
const StarRating = ({ rating }) => (<div className="flex items-center">{[1, 2, 3, 4, 5].map((star) => (<span key={star} className="text-xl">{star <= Math.round(rating) ? <StarFilled className="text-green-500" /> : <StarOutlined className="text-green-500" />}</span>))}</div>);
const RatingDisplay = ({ reviews }) => { const totalReviews = reviews?.length || 0; if (totalReviews === 0) return <div className="text-gray-500 dark:text-gray-400">Nuk ka ende vlerësime.</div>; const averageRating = reviews.reduce((acc, curr) => acc + getReviewAverage(curr), 0) / totalReviews; return (<div className="flex items-center space-x-4"><div className="text-center"><div className="text-4xl font-bold text-green-600 dark:text-green-500">{averageRating.toFixed(1)}</div><StarRating rating={averageRating} /><div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{totalReviews} {totalReviews === 1 ? 'vlerësim' : 'vlerësime'}</div></div></div>); };
const CriteriaRatingsSummary = ({ reviews }) => { const totalReviews = reviews?.length || 0; if (totalReviews === 0) return null; const criteriaTotals = reviews.reduce((acc, review) => { if (review.quality && review.service && review.value) { acc.quality += review.quality; acc.service += review.service; acc.value += review.value; acc.count += 1; } return acc; }, { quality: 0, service: 0, value: 0, count: 0 }); if (criteriaTotals.count === 0) return null; const avgQuality = (criteriaTotals.quality / criteriaTotals.count).toFixed(1); const avgService = (criteriaTotals.service / criteriaTotals.count).toFixed(1); const avgValue = (criteriaTotals.value / criteriaTotals.count).toFixed(1); const overallAvg = ((parseFloat(avgQuality) + parseFloat(avgService) + parseFloat(avgValue)) / 3).toFixed(1); return (<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"><h2 className="text-xl font-bold mb-4 dark:text-white">Vlerësimet e Kompanisë</h2><div className="space-y-3"><div className="flex justify-between items-center"><span className="text-gray-700 dark:text-gray-300">Mesatarja e Përgjithshme</span><div className="text-right"><span className="font-bold text-lg text-green-600 dark:text-green-400">{overallAvg} / 5</span><div className="text-xs text-gray-500 dark:text-gray-400">{criteriaTotals.count} vlerësime</div></div></div><hr className="my-2 border-gray-200 dark:border-gray-700" /><div className="flex justify-between items-center text-gray-700 dark:text-gray-300"><span>Cilësia</span><span className="font-semibold">{avgQuality}</span></div><div className="flex justify-between items-center text-gray-700 dark:text-gray-300"><span>Shërbimi</span><span className="font-semibold">{avgService}</span></div><div className="flex justify-between items-center text-gray-700 dark:text-gray-300"><span>Vlera</span><span className="font-semibold">{avgValue}</span></div></div></div>); };
const CompanyDetailSkeleton = () => (<div className="bg-white dark:bg-gray-900 min-h-screen py-12"><div className="container mx-auto px-4"><div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6"><div className="flex flex-col md:flex-row items-start md:items-center gap-6"><Skeleton.Avatar active size={96} shape="circle" /><div className="flex-grow"><Skeleton.Input active style={{ width: 250, height: 36, marginBottom: '1rem' }} /><Skeleton paragraph={{ rows: 2, width: ['50%', '30%'] }} /></div></div></div><div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><div className="lg:col-span-1 space-y-6"><div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"><Skeleton active title={{ width: '60%' }} paragraph={{ rows: 5 }} /></div><div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"><Skeleton active title={{ width: '40%' }} paragraph={{ rows: 3 }} /></div></div><div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"><Skeleton active paragraph={{ rows: 8 }} /></div></div></div></div>);
const AddReviewForm = ({ companyId, onReviewAdded, onCancel, token }) => { const [form] = Form.useForm(); const [loading, setLoading] = useState(false); const formValues = Form.useWatch([], form); const handleSubmit = async (values) => { setLoading(true); const reviewData = { quality: values.quality, service: values.service, value: values.value, comment: values.comment, companyId: companyId, }; try { await axiosInstance.post('/reviews', reviewData, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, }); onReviewAdded(); } catch (error) { const errorMsg = error.response?.data?.message || 'Dështoi dërgimi i vlerësimit. Provoni përsëri.'; message.error(errorMsg); } finally { setLoading(false); } }; return (<div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800"><div className="flex justify-between items-center mb-4"><h3 className="text-2xl font-bold text-gray-900 dark:text-white">Lini një Vlerësim</h3><Button shape="circle" icon={<CloseOutlined />} onClick={onCancel} /></div><Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ quality: 3, service: 3, value: 3 }}><Form.Item label={<span className="font-semibold text-base dark:text-gray-300">{`Cilësia (${formValues?.quality || 3}/5)`}</span>} name="quality"><Slider min={1} max={5} step={1} /></Form.Item><div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 -mt-2 mb-4"><span>Dobët</span><span>Shkëlqyer</span></div><Form.Item label={<span className="font-semibold text-base dark:text-gray-300">{`Shërbimi (${formValues?.service || 3}/5)`}</span>} name="service"><Slider min={1} max={5} step={1} /></Form.Item><div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 -mt-2 mb-4"><span>Dobët</span><span>Shkëlqyer</span></div><Form.Item label={<span className="font-semibold text-base dark:text-gray-300">{`Vlera (${formValues?.value || 3}/5)`}</span>} name="value"><Slider min={1} max={5} step={1} /></Form.Item><div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 -mt-2 mb-4"><span>Dobët</span><span>Shkëlqyer</span></div><Form.Item name="comment" label={<span className="font-semibold text-base dark:text-gray-300">Vlerësimi Juaj</span>} rules={[{ required: true, message: 'Ju lutem shkruani një koment!' }]}><TextArea rows={4} placeholder="Ndani përvojën tuaj..." /></Form.Item><LiveReviewSummary values={formValues} /><Form.Item className="mt-6"><Button type="primary" htmlType="submit" loading={loading} block size="large" className="bg-indigo-600 hover:bg-indigo-700 border-indigo-600">Dërgo Vlerësimin</Button></Form.Item></Form></div>); };
const MyReviewDisplay = ({ review, onDelete, onEdit }) => { return (<Card className="mb-6 bg-blue-50 border-blue-200 dark:bg-gray-800/50 dark:border-blue-900/50"><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Vlerësimi Juaj</h3><ReviewCard review={review} /></Card>); };

// --- Main Component ---
const CompanyDetail = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const { user: loggedInUser, token } = useContext(AuthContext);

    const fetchCompanyDetails = async () => { if (!id) { setError("Mungon ID e kompanisë."); setLoading(false); return; } try { setLoading(true); const response = await axiosInstance.get(`/companies/${id}`); setCompany(response.data); setError(''); } catch (err) { setError('Dështoi në ngarkimin e detajeve.'); } finally { setLoading(false); } };
    useEffect(() => { fetchCompanyDetails(); }, [id]);
    const handleReviewSubmitSuccess = () => { setShowReviewForm(false); fetchCompanyDetails(); message.success('Vlerësimi u dërgua me sukses!'); };
    const handleUpdateCompany = async (values) => { setUpdateLoading(true); const formData = new FormData(); Object.keys(values).forEach(key => { if (key !== 'image' && values[key] != null) formData.append(key, values[key]); }); if (values.image) formData.append('image', values.image); try { await axiosInstance.put(`/companies/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } }); message.success("Detajet e kompanisë u përditësuan me sukses!"); setIsEditModalVisible(false); await fetchCompanyDetails(); } catch (err) { message.error("Dështoi përditësimi i detajeve."); } finally { setUpdateLoading(false); } };

    const myReview = loggedInUser && company?.reviews?.find(review => review.userId === loggedInUser.id);
    const isOwner = loggedInUser && loggedInUser.id === company?.userId && loggedInUser.role === 'company';
    const canWriteNewReview = loggedInUser && loggedInUser.role === 'user' && !isOwner && !myReview;
    const otherReviews = (company?.reviews || []).filter(review => !myReview || review.id !== myReview.id);
    const sortedReviews = [...otherReviews].sort((a, b) => { switch (sortBy) { case 'highest': return getReviewAverage(b) - getReviewAverage(a); case 'lowest': return getReviewAverage(a) - getReviewAverage(b); case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt); default: return new Date(b.createdAt) - new Date(a.createdAt); } });

    if (loading) return <CompanyDetailSkeleton />;
    if (error) return <div className="container mx-auto p-8 text-red-500 text-center text-xl">{error}</div>;
    if (!company) return <div className="text-center p-10 dark:text-gray-300">Kompania nuk u gjet.</div>;

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen py-12">
            <div className="max-w-[1250px] pt-[50px] mx-auto px-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <Avatar src={company.imageUrl} size={96} icon={<UserOutlined />} className="border-4 border-white dark:border-gray-700 shadow-lg" />
                        <div className="flex-grow">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{company.name}</h1>
                            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-4">
                                <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">{company.industry}</div>
                                <div className="flex items-center text-gray-600 dark:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg><span>{company.address}</span></div>
                                {company.establishedYear && <div className="text-gray-600 dark:text-gray-300">Themeluar më {company.establishedYear}</div>}
                            </div>
                            <RatingDisplay reviews={company.reviews} />
                        </div>
                        <div className="flex flex-col sm:flex-row md:flex-col gap-3 self-start md:self-center">
                            {isOwner && (<> <Link to={`/company-dashboard/${id}`}><Button icon={<BarChartOutlined />} className="w-full mb-2">Paneli i Analitikave</Button></Link> <Button icon={<EditOutlined />} onClick={() => setIsEditModalVisible(true)} className="w-full">Modifiko Profilin</Button> </>)}
                            {canWriteNewReview && !showReviewForm && (<Button type="primary" size="large" onClick={() => setShowReviewForm(true)} className="bg-green-600 hover:bg-green-700 border-green-600">Shkruaj një Vlerësim</Button>)}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"><h2 className="text-xl font-bold mb-4 dark:text-white">Rreth Nesh</h2><p className="text-gray-700 dark:text-gray-300">{company.description || 'Nuk është dhënë asnjë përshkrim.'}</p></div>
                        <CriteriaRatingsSummary reviews={company.reviews} />
                    </div>
                    <div className="lg:col-span-2">
                        {myReview && <MyReviewDisplay review={myReview} />}
                        {showReviewForm && (<div className="mb-6"><AddReviewForm companyId={company.id} onReviewAdded={handleReviewSubmitSuccess} onCancel={() => setShowReviewForm(false)} token={token} /></div>)}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h2 className="text-xl font-bold dark:text-white">Vlerësimet e Tjera ({sortedReviews.length})</h2>
                                <Select value={sortBy} onChange={setSortBy} style={{ width: 150 }}><Option value="newest">Më të rejat</Option><Option value="oldest">Më të vjetrat</Option><Option value="highest">Vlerësimi më i lartë</Option><Option value="lowest">Vlerësimi më i ulët</Option></Select>
                            </div>
                            <div>
                                {sortedReviews.length > 0 ? (sortedReviews.map(review => (<ReviewCard key={review.id} review={review} />))) : (<div className="text-center py-10 text-gray-500 dark:text-gray-400"><MessageOutlined className="text-4xl mb-4" /><p>Nuk ka ende vlerësime të tjera.</p>{!myReview && !showReviewForm && canWriteNewReview && <p>Bëhu i pari që lë një vlerësim për këtë kompani!</p>}</div>)}
                            </div>
                        </div>
                    </div>
                </div>
                {isOwner && <EditCompanyModal visible={isEditModalVisible} onUpdate={handleUpdateCompany} onCancel={() => setIsEditModalVisible(false)} initialData={company} loading={updateLoading} />}
            </div>
        </div>
    );
};

export default CompanyDetail;