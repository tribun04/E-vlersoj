// src/components/CompanyCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddReviewForm from './AddReviewForm';

const CompanyCard = ({ company, onReviewSubmitted }) => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false); // Simulated local state — replace with real logic if needed

    const {
        id,
        name,
        website,
        industry,
        averageRating = 0,
        reviewCount = 0,
        averageDetails = { price: 0, speed: 0, quality: 0 },
        ratingDistribution = [],
    } = company;

    // Translation mapping for rating details
    const fieldTranslations = {
        price: 'Çmimi',
        speed: 'Shpejtësia',
        quality: 'Cilësia',
    };

    const renderRatingBars = () => {
        return [5, 4, 3, 2, 1].map((star, index) => {
            const count = ratingDistribution[4 - index] || 0;
            const percent = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
            return (
                <div key={star} className="flex items-center mb-2">
                    <span className="w-14 text-green-600 font-medium">{star} yll</span>
                    <div className="flex-1 h-3 bg-gray-200 rounded mx-2">
                        <div className="h-3 bg-green-500 rounded" style={{ width: `${percent}%` }}></div>
                    </div>
                    <span className="w-6 text-sm text-gray-500">{count}</span>
                </div>
            );
        });
    };

    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col p-6 h-full">
                {/* Company Info */}
                <div className="flex items-start mb-6">
                    <Link to={`/companies/${id}`}>

                    </Link>
                    <div className="flex-1">
                        <Link to={`/companies/${id}`}>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-green-600">
                                {name}
                            </h2>
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{industry}</p>
                        {website && (
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:underline text-sm mt-1 inline-block"
                            >
                                🌐 Vizito Faqen
                            </a>
                        )}
                    </div>
                </div>

                {/* Ratings */}
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-3 dark:text-white">Vlerësimet e Kompanisë</h3>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-700 dark:text-gray-200">Mesatarja e Përgjithshme</span>
                        <div className="text-green-600 font-bold text-lg">
                            {averageRating.toFixed(1)} / 5
                            <p className="text-xs text-gray-500">{reviewCount} vlerësime</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {['price', 'speed', 'quality'].map((field) => (
                            <div key={field} className="flex justify-between text-sm">
                                <span className="capitalize text-gray-600 dark:text-gray-300">{fieldTranslations[field]}</span>
                                <span className="text-green-500">
                                    {averageDetails[field]?.toFixed(1) || 0}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Review Section */}
                {hasReviewed ? (
                    <p className="text-green-600 mt-2 font-medium">Ju tashmë keni dorëzuar një vlerësim. ✅</p>
                ) : showReviewForm ? (
                    <AddReviewForm
                        companyId={id}
                        onReviewAdded={() => {
                            setHasReviewed(true);
                            setShowReviewForm(false);
                            if (onReviewSubmitted) onReviewSubmitted(id);
                        }}
                        onCancel={() => setShowReviewForm(false)}
                    />
                ) : (
                    <button
                        onClick={() => setShowReviewForm(true)}
                        className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
                    >
                        Lini një Vlerësim
                    </button>
                )}
            </div>
        </div>
    );
};

export default CompanyCard;