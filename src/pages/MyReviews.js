// src/pages/MyReviews.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import { Alert, Skeleton, Button } from 'antd'; // Removed unused Card and Slider imports

// --- FUNKSIONI NDIHMËS për Slider-in më të veçantë (E pandryshuar) ---
/**
 * Kthen një ngjyrë specifike bazuar në vlerën e vlerësimit.
 * @param {number} rating - Vlera e vlerësimit nga 1 deri në 5.
 * @returns {string} Një kod ngjyre hex.
 */
const getRatingColor = (rating) => {
    if (rating <= 2) return '#f5222d'; // Ant Design E Kuqe
    if (rating === 3) return '#faad14'; // Ant Design Portokalli/E Verdhë
    return '#00B67A'; // Ant Design E Gjelbër
};

// --- KOMPONENTËT NDIHMËS ---
// Stiluar për t'u përshtatur më mirë me temën e errët
const ReviewSkeleton = () => (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 animate-pulse">
        <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-slate-600 rounded w-1/3"></div>
            <div className="h-5 bg-slate-600 rounded w-52"></div>
        </div>
        <div className="h-4 bg-slate-600 rounded w-full mb-2"></div>
        <div className="h-4 bg-slate-600 rounded w-5/6 mb-4"></div>
        <div className="flex justify-end items-center">
            <div className="h-4 bg-slate-600 rounded w-32"></div>
        </div>
    </div>
);

// --- KOMPONENTI KRYESOR I FAQES ---
const MyReviewsPage = () => {
    // --- MARRJA E TË DHËNAVE (E pandryshuar) ---
    const { data: reviews, error, isLoading } = useQuery({
        queryKey: ['myReviews'],
        queryFn: async () => {
            const response = await axiosInstance.get('/reviews/my-reviews');
            return response.data;
        },
    });

    // --- LOGJIKA E RENDERIMIT (Me stilim të ri) ---
    const renderContent = () => {
        if (isLoading) {
            return <div className="space-y-6"><ReviewSkeleton /><ReviewSkeleton /></div>;
        }

        if (error) {
            // Përshtatur për temën e errët
            return <Alert message="Gabim" description={error.response?.data?.message || 'Dështim në ngarkimin e vlerësimeve.'} type="error" showIcon className="bg-red-900/20 border-red-500/30 text-red-300" />;
        }

        if (reviews?.length > 0) {
            return (
                <div className="space-y-5">
                    {reviews.map((review) => {
                        const ratingColor = getRatingColor(review.rating);
                        // Calculate the percentage fill for the gradient
                        const fillPercentage = ((review.rating - 1) / (5 - 1)) * 100;

                        // Create the dynamic style object for the slider
                        const sliderStyle = {
                            // Sets the CSS variable for the thumb's border color
                            '--rating-color': ratingColor,
                            // Creates the two-tone track background
                            background: `linear-gradient(to right, #00B67A ${fillPercentage}%, #4b5563 ${fillPercentage}%)`
                        };

                        return (
                            // Kartë e ridizenjuar për një pamje më të pastër dhe moderne
                            <div key={review.id} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                                    <Link to={`/company/${review.company?.id}`} className="text-xl font-semibold text-gray-100 hover:text-white transition-colors">
                                        {review.company?.name || 'Kompania e Fshirë'}
                                    </Link>

                                    {/* --- SLIDER I RI I PERSONALIZUAR (I KORRIGJUAR) --- */}
                                    <div className="flex items-center gap-x-4 mt-2 sm:mt-0">
                                        <div className="w-32 sm:w-40">
                                            <input
                                                type="range"
                                                min="1"
                                                max="5"
                                                step="0.1"
                                                value={review.rating}
                                                disabled
                                                className="custom-range h-[5px]"
                                                style={sliderStyle}
                                            />
                                        </div>
                                        <span className="font-bold text-lg w-12 text-right" style={{ color: ratingColor }}>
                                            {review.rating.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-4 leading-relaxed whitespace-pre-wrap">"{review.comment}"</p>
                                <div className="text-right text-sm text-gray-500">
                                    <span>Vlerësuar më: {new Date(review.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }

        return (
            // Stil i ri për rastin kur nuk ka vlerësime
            <div className="text-center py-16 bg-slate-800 rounded-lg border border-slate-700">
                <h2 className="text-xl font-semibold text-gray-200">Nuk u Gjetën Vlerësime</h2>
                <p className="mt-2 text-gray-400">Ju nuk keni dorëzuar ende asnjë vlerësim.</p>
                <Link to="/CompaniesPage"><Button type="primary" size="large" className="mt-6">Gjej një Kompani për të Vlerësuar</Button></Link>
            </div>
        );
    };

    return (
        // Sfond i përgjithshëm i errët për pamjen e re
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-12">
            <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">Vlerësimet e Mia</h1>
                    <p className="mt-2 text-lg text-gray-400">Një listë e të gjitha vlerësimeve që keni dorëzuar.</p>
                </div>
                {renderContent()}
            </div>
        </div>
    );
};

export default MyReviewsPage;