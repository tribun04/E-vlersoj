import React, { useState, useEffect } from 'react';
import ReviewList from './components/ReviewList';
import ReviewForm from './components/ReviewForm';

function CompanyDetail({ companyId, token }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const res = await fetch(`http://localhost:5000/api/reviews?companyId=${companyId}`);
                const data = await res.json();
                setReviews(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchReviews();
    }, [companyId]);

    const handleReviewAdded = (newReview) => {
        setReviews((prev) => [newReview, ...prev]);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>

                <div className="mb-8">
                    <ReviewForm
                        companyId={companyId}
                        onReviewAdded={handleReviewAdded}
                        token={token}
                    />
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <ReviewList reviews={reviews} />
                </div>
            </div>
        </div>
    );
}

export default CompanyDetail;