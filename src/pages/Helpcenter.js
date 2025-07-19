import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from 'react-helmet';

import {
    faStar as solidStar,
    faStarHalfAlt as halfStar,
    faStar as regularStar,
    faChevronDown,
    faCheckCircle,
    faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import Banner from "../components/Banner";

function Banner1() {
    return (
          
        
        <div className="bg-gradient-to-r from-[#00B67A]/10 via-[#00B67A]/20 to-[#00B67A]/30 p-4 rounded-xl mb-8 border border-[#00B67A]/20 mt-10 ">
            <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                ✨ E besuar nga <span className="font-bold text-[#00B67A] dark:text-[#00B67A]/80">2,450+</span> klientë dhe kompani ✨
            </p>
        </div>
    );
}

export default function PremiumReviewSection() {
    const [expandedReview, setExpandedReview] = useState(null);
    const [activeFilter, setActiveFilter] = useState("all");

    const reviews = [
        // (You can translate review contents here as well if you want)
        {
            id: 1,
            name: "Alex Johnson",
            rating: 5,
            date: "2023-05-15",
            title: "Shërbim dhe kujdes i jashtëzakonshëm",
            content: "Ekipi bëri gjithçka për të bërë që qeni ynë të ndihej rehat. Përditësimet ditore me foto na dhanë qetësi gjatë udhëtimit. Ambientet janë të pastra dhe të dizajnuara për rehati. Golden Retriever-i ynë entuziazmohet çdo herë kur arrijmë!",
            verified: true,
            experience: "positive",
            tags: ["shërbim", "kompani"],
        },
        {
            id: 2,
            name: "Maria Garcia",
            rating: 4.5,
            date: "2023-04-22",
            title: "Eksperiencë shumë e mirë me produktin",
            content: "Produkti që bleva tejkaloi pritshmëritë. Cilësia dhe dizajni ishin perfekte. Çmimi është pak më i lartë, por ia vlen.",
            verified: true,
            experience: "positive",
            tags: ["produkt", "cilësi"],
        },
        // Add more translated reviews as needed...
    ];

    const filteredReviews = activeFilter === "all"
        ? reviews
        : reviews.filter(review => review.tags.includes(activeFilter));

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        return (

<div className="flex items-center">
<Helmet>
        <title>E-Vleresoj - Home</title>
      </Helmet>
                {Array(5).fill(0).map((_, i) => {
                    if (i < fullStars) {
                        return <FontAwesomeIcon key={i} icon={solidStar} className="text-yellow-400 mr-0.5" />;
                    } else if (i === fullStars && hasHalfStar) {
                        return <FontAwesomeIcon key={i} icon={halfStar} className="text-yellow-400 mr-0.5" />;
                    } else {
                        return <FontAwesomeIcon key={i} icon={regularStar} className="text-gray-300 dark:text-gray-600 mr-0.5" />;
                    }
                })}
                <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {rating.toFixed(1)}
                </span>
            </div>
        );
    };

    return (
        
        <section className="w-full py-16 bg-white dark:bg-gray-900">
            <Banner />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Banner1 />

                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
                    <div className="max-w-3xl">
                        <span className="inline-block mb-3 px-3 py-1 text-sm font-medium rounded-full bg-[#00B67A]/10 text-[#00B67A] dark:bg-[#00B67A]/20 dark:text-[#00B67A]/80">
                            Vlerësimet e klientëve dhe kompanive
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                            Vleresime te verteta nga
                            <span className="text-[#00B67A] dark:text-[#00B67A]/80"> klientët per bizneset </span> qe kane pasur experience
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Mos I besoni marketingut te bizneseve, besoju njerezve qe kane experience me kualitetin, shpejtesine dhe cmimet e ketyre bizneseve.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        <a href="/CompaniesPage" className="px-5 py-2.5 bg-[#00B67A] hover:bg-[#009A6B] text-white font-medium rounded-lg shadow transition-colors flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Shto vlerësim
                        </a>

                    </div>
                </div>

                {/* Stats Banner */}
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-gray-200 dark:divide-gray-700">
                        <div className="text-center p-8 group hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex items-center justify-center mb-3">
                                <div className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mr-2">
                                    3
                                </div>
                                <div className="flex">

                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-medium text-sm uppercase tracking-wider">
                                Menyra Vleresimi                             </p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                                Per me shume saktesi
                            </p>
                        </div>

                        <div className="text-center p-8 group hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
                                3,850+
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-medium text-sm uppercase tracking-wider">
                                Vizitor Ditor                             </p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                                Te cilet hulumtojne
                            </p>
                        </div>

                        <div className="text-center p-8 group hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
                                100%
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-medium text-sm uppercase tracking-wider">
                                Transparente
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                                Pa ndikim komercial

                            </p>
                        </div>

                        <div className="text-center p-8 group hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex items-center justify-center space-x-2 mb-3">
                                <div className="text-4xl font-extrabold text-gray-900 dark:text-white">
                                    24/7
                                </div>

                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-medium text-sm uppercase tracking-wider">
                                Asistence
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                                Permes Void Ai Chat                            </p>
                        </div>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="mb-8 flex flex-wrap gap-2">
                    <button
                        onClick={() => setActiveFilter("all")}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeFilter === "all" ? "bg-[#00B67A] text-white" : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"}`}
                    >
                        Të gjitha vlerësimet
                    </button>


                </div>

                {/* Reviews Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredReviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-1"
                        >
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#00B67A]/10 dark:bg-[#00B67A]/20 flex items-center justify-center text-[#00B67A] dark:text-[#00B67A]/80 font-medium">
                                            {review.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">{review.name}</h4>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(review.date).toLocaleDateString('sq-AL', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </div>
                                        </div>
                                    </div>
                                    {review.verified && (
                                        <div className="flex items-center text-xs text-[#00B67A] dark:text-[#00B67A]/80">
                                            <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                                            I verifikuar
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">{renderStars(review.rating)}</div>

                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                    {review.title}
                                </h3>

                                <div className="relative mb-3">
                                    <FontAwesomeIcon
                                        icon={faQuoteLeft}
                                        className="absolute -top-1 left-0 text-gray-200 dark:text-gray-700 text-3xl -z-10"
                                    />
                                    <p className={`text-gray-600 dark:text-gray-300 relative z-10 ${expandedReview === review.id ? "" : "line-clamp-3"}`}>
                                        {review.content}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                                        className="text-[#00B67A] dark:text-[#00B67A]/80 hover:text-[#009A6B] dark:hover:text-[#00B67A] text-sm font-medium flex items-center"
                                    >
                                        {expandedReview === review.id ? "Trego më pak" : "Lexo më shumë"}
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className={`ml-1 transition-transform ${expandedReview === review.id ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    <div className="flex gap-1">
                                        {review.tags.slice(0, 2).map(tag => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 capitalize"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}


                <div className="max-w-[1450px] mx-auto">
                    <div className="m-4 lg:m-6 p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 text-center lg:text-left">

                            {/* Text Content Column */}
                            <div className="lg:max-w-[650px]">
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                                    Gati të bëhesh pjesë e <span className="text-brand-green">familjes sonë</span> të klientëve?
                                </h3>
                                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                                    Përjeto ndryshimin që mijëra klientë dhe kompani e besojnë.
                                </p>
                            </div>

                            {/* Buttons Column */}
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                                <button className="w-full sm:w-auto px-8 py-3.5 bg-brand-green text-white font-medium rounded-lg shadow-lg hover:shadow-brand-green transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-brand-green">
                                    Rezervo tani
                                </button>
                                <button className="w-full sm:w-auto px-8 py-3.5 border-2 border-gray-300 dark:border-gray-600 hover:border-brand-green dark:hover:border-brand-green text-gray-800 dark:text-white font-medium rounded-lg hover:text-brand-green dark:hover:text-brand-green transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-teal-500/50">
                                    Na kontakto
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}