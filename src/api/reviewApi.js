import axios from './axiosInstance';

export const createReview = (data) => axios.post('/reviews', data);
export const getReviews = (companyId) => axios.get(`/reviews?companyId=${companyId}`);
