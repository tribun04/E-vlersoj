"use client";
import React from "react";
import axiosInstance from '../api/axiosInstance';
import { message } from 'antd';

function ReviewForm({ companyId, onReviewAdded, onCancel }) {
    const [ratings, setRatings] = React.useState({
        quality: 2,
        service: 2,
        value: 2,
    });
    const [review, setReview] = React.useState("");
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleRatingChange = (category, value) => {
        setRatings((prev) => ({ ...prev, [category]: parseInt(value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const averageRating = (ratings.quality + ratings.service + ratings.value) / 3;

            const reviewData = {
                companyId: parseInt(companyId),
                rating: parseFloat(averageRating.toFixed(1)),
                comment: review,
                detailedRatings: ratings
            };

            console.log("🔥 Sending reviewData:", reviewData);

            await axiosInstance.post('/reviews', reviewData);

            if (onReviewAdded) onReviewAdded();

            // Translated Text
            message.success("Vlerësimi u dorëzua me sukses!");
            if (onCancel) onCancel();
        } catch (err) {
            // Translated Text
            const errorMessage = err.response?.data?.message || 'Dështoi dorëzimi i vlerësimit.';
            setError(errorMessage);
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg ">
            <div className="flex justify-between items-center mb-6">
                {/* Translated Text */}
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Lini një Vlerësim</h2>
                {onCancel && (
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl font-light">
                        ×
                    </button>
                )}
            </div>

            {error && <p className="text-red-500 text-sm mb-6 bg-red-100 dark:bg-red-900/30 p-3 rounded-md">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    {/* Translated Text */}
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cilësia ({ratings.quality}/5)</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={ratings.quality}
                        onChange={(e) => handleRatingChange("quality", e.target.value)}
                        className="custom-range range-orange "
                    />                </div>

                <div className="space-y-2">
                    {/* Translated Text */}
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Shërbimi ({ratings.service}/5)</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={ratings.service}
                        onChange={(e) => handleRatingChange("service", e.target.value)}
                        className="custom-range range-purple h-1"
                    />                </div>

                <div className="space-y-2">
                    {/* Translated Text */}
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vlera për Paratë ({ratings.value}/5)</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={ratings.value}
                        onChange={(e) => handleRatingChange("value", e.target.value)}
                        className="custom-range range-green"
                    />                </div>

                <div className="space-y-2">
                    {/* Translated Text */}
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vlerësimi Juaj</label>
                    {/* Translated Text */}
                    <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Shpjegoni përvojën tuaj..." rows="4" required className="w-full px-3 py-2 border rounded-md" />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-[#00B67A] text-white py-2 px-4 rounded-md hover:bg-[#009966]">
                    {/* Translated Text */}
                    {loading ? 'Duke dërguar...' : 'Dërgo Vlerësimin'}
                </button>
            </form>
        </div>
    );
}

export default ReviewForm;