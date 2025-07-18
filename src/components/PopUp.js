import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
    // State to control the visibility of the banner.
    const [isVisible, setIsVisible] = useState(false);

    // This effect runs once when the component mounts.
    useEffect(() => {
        // Check if the user has already given their consent.
        const consent = localStorage.getItem('cookie_consent');
        // If no consent has been recorded, show the banner.
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        // Store the user's consent in localStorage.
        localStorage.setItem('cookie_consent', 'accepted');
        console.log('Cookies u pranuan');
        // Hide the banner.
        setIsVisible(false);
    };

    const handleDecline = () => {
        // Store the user's choice in localStorage.
        localStorage.setItem('cookie_consent', 'declined');
        console.log('Cookies u refuzuan');
        // Hide the banner.
        setIsVisible(false);
    };



    // If the banner shouldn't be visible, render nothing.
    if (!isVisible) {
        return null;
    }

    // Render the banner if it should be visible.
    return (
        <div className="fixed bottom-4 left-4 right-4 z-50">
            <div className="max-w-6xl mx-auto">
                <div className="bg-[#2a2d3a] border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden animate-slide-up-fade">
                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row items-start gap-6">
                            {/* Icon and Title Section */}
                            <div className="flex items-start gap-4 flex-shrink-0">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg" title='informations'>
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        tittle="Information"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-lg mb-1">
                                        Preferencat e Cookies
                                    </h3>
                                    <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
                                        Ne përdorim 'cookies' për të përmirësuar përvojën tuaj, për të analizuar trafikun e faqes dhe për të personalizuar përmbajtjen. Zgjidhni preferencat tuaja ose pranoni të gjitha për të vazhduar me cilësimet tona të rekomanduara.
                                    </p>
                                </div>
                            </div>

                            {/* Buttons Section */}
                            <div className="flex flex-col sm:flex-row gap-3 lg:ml-auto flex-shrink-0">

                                <button
                                    onClick={handleDecline}
                                    className="px-5 py-2.5 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-all duration-200 hover:bg-gray-700/30 font-medium text-sm"
                                >
                                    Refuzo të gjitha
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-emerald-500/25 font-medium text-sm"
                                >
                                    Prano të gjitha
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inlined CSS for the animation */}
            <style jsx>{`
                @keyframes slideUpFade {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slide-up-fade {
                    animation: slideUpFade 0.4s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default CookieConsent;