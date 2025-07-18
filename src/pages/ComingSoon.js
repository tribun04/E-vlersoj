import React, { useEffect, useState } from 'react';

const ComingSoon = () => {
    // Your existing countdown logic can remain exactly the same.
    const [countdown, setCountdown] = useState({
        days: '--',
        hours: '--',
        minutes: '--',
        seconds: '--',
    });

    useEffect(() => {
        const launchDate = new Date(2025, 11, 31, 23, 59, 59).getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = launchDate - now;

            if (distance < 0) {
                setCountdown({
                    days: "We're Live!",
                    hours: '',
                    minutes: '',
                    seconds: '',
                });
                clearInterval(interval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountdown({
                days,
                hours: hours.toString().padStart(2, '0'),
                minutes: minutes.toString().padStart(2, '0'),
                seconds: seconds.toString().padStart(2, '0'),
            });
        };

        const interval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Run once immediately

        return () => clearInterval(interval);
    }, []);

    return (
        // --- KEY CHANGES HERE ---
        // Light mode: light green gradient, dark text
        // Dark mode: dark gray/slate gradient, light text
        <div className="min-h-screen bg-gradient-to-br from-[#F0FAF6] to-[#E0F5ED] text-[#1A2E35] dark:from-slate-900 dark:to-gray-900 dark:text-slate-200 flex flex-col items-center justify-center px-6 text-center font-dm-sans transition-colors duration-300">

            {/* Light mode: white background
                Dark mode: dark gray background with a subtle ring for separation */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg mb-10 dark:bg-slate-800 dark:shadow-none dark:ring-1 dark:ring-white/10">
                <img className="h-16 w-auto" src="images/Logo.png" alt="E-Vlersoj Logo" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00B67A] to-[#008C5E] mb-5">
                We're Building Something Great!
            </h1>

            {/* Light mode: medium gray text
                Dark mode: lighter gray text for better readability */}
            <p className="text-lg md:text-xl text-[#4A5C62] dark:text-slate-400 max-w-xl mb-8 leading-relaxed">
                <span className="text-[#00B67A] font-bold">E-Vlersoj</span> is revolutionizing evaluation systems in Kosovo.
                Transparent ratings. Objective feedback. Trusted results.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {countdown.hours !== '' ? (
                    <>
                        <CountdownItem label="Days" value={countdown.days} />
                        <CountdownItem label="Hours" value={countdown.hours} />
                        <CountdownItem label="Minutes" value={countdown.minutes} />
                        <CountdownItem label="Seconds" value={countdown.seconds} />
                    </>
                ) : (
                    <div className="bg-white dark:bg-slate-800 px-8 py-4 rounded-xl shadow dark:shadow-none dark:ring-1 dark:ring-white/10 text-xl font-bold text-[#00B67A]">
                        We're Live!
                    </div>
                )}
            </div>

            {/* The green brand color for the link works well on both light and dark backgrounds */}
            <div className="text-[#4A5C62] dark:text-slate-400 text-base">
                <a
                    href="mailto:info@e-vlersoj.com"
                    className="text-[#00B67A] font-medium inline-flex items-center gap-2 hover:text-[#008C5E] transition"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    info@e-vlersoj.com
                </a>
            </div>

            {/* Light mode: light gray text
                Dark mode: slightly darker gray text for the footer */}
            <div className="mt-10 text-sm text-[#7A8C92] dark:text-slate-500">
                © {new Date().getFullYear()} E-Vlersoj. All rights reserved.
            </div>
        </div>
    );
};

// --- KEY CHANGES HERE in CountdownItem ---
const CountdownItem = ({ label, value }) => (
    // Light mode: white background
    // Dark mode: dark gray background with subtle ring
    <div className="bg-white dark:bg-slate-800 dark:shadow-none dark:ring-1 dark:ring-white/10 px-6 py-4 rounded-xl shadow text-center min-w-[80px]">
        {/* The green brand color for the number works fine in both modes */}
        <div className="text-2xl font-bold text-[#00B67A]">{value}</div>

        {/* Light mode: light gray text for label
            Dark mode: lighter gray text for better readability */}
        <div className="text-xs text-[#7A8C92] dark:text-slate-400 uppercase tracking-wide mt-1">{label}</div>
    </div>
);

export default ComingSoon;