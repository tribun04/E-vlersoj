import { useEffect, useRef, useState } from 'react';
import {
    ShieldCheckIcon,
    PencilSquareIcon,
    PaperAirplaneIcon,
    ChatBubbleBottomCenterTextIcon,
    CheckCircleIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';

// A reusable component for the animated number counters
const AnimatedStat = ({ number, suffix, text }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInteger = Number.isInteger(number);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let start = 0;
                    const end = number;
                    if (start === end) { setCount(end); return; }

                    const duration = 2000;
                    const startTime = Date.now();

                    const step = () => {
                        const now = Date.now();
                        const progress = Math.min((now - startTime) / duration, 1);
                        const currentCount = progress * (end - start) + start;

                        setCount(isInteger ? Math.floor(currentCount) : parseFloat(currentCount.toFixed(1)));

                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            setCount(end);
                        }
                    };
                    requestAnimationFrame(step);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [number, isInteger]);

    return (
        <div ref={ref} className="text-center">
            <p className="text-5xl font-bold text-primary-600">
                {count}{suffix}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-500 uppercase tracking-wider">{text}</p>
        </div>
    );
};

// Main Page Component
const HowReviewsWorkPage = () => {
    const processSteps = [
        {
            step: 1,
            icon: PencilSquareIcon,
            title: "Submit Your Review",
            description: "Share your experience through our intuitive platform. Whether you received an email invitation or found us directly, submitting a review takes just minutes with our streamlined process.",
            proTip: "Include specific details, photos, and context to make your review more valuable to others. The most helpful reviews mention particular features or experiences.",
            imageUrl: "https://i.imgur.com/k6k9g5G.png" // Placeholder for a clean UI mockup
        },
        {
            step: 2,
            icon: ShieldCheckIcon,
            title: "Quality Review",
            description: "Our expert moderation team carefully reviews each submission using advanced AI and human oversight to ensure authenticity and compliance with our community standards.",
            proTip: "Most reviews are processed within 24 hours. Our AI pre-screening handles 90% of submissions almost instantly, ensuring a swift and fair process.",
            imageUrl: "https://i.imgur.com/gKEd1vj.png" // Placeholder for a clean UI mockup
        },
        {
            step: 3,
            icon: PaperAirplaneIcon,
            title: "Go Live",
            description: "Your approved review is published and becomes visible to millions of users. It contributes to the business's overall rating and helps others make informed decisions.",
            proTip: "Your review helps thousands of people make better choices every day! Top-rated reviews that are detailed and helpful get featured prominently.",
            imageUrl: "https://i.imgur.com/XqT7hWd.png" // Placeholder for a clean UI mockup
        },
        {
            step: 4,
            icon: ChatBubbleBottomCenterTextIcon,
            title: "Business Engagement",
            description: "Businesses can respond to your review, creating valuable dialogue. This transparency helps build trust and shows how companies handle feedback and customer service.",
            proTip: "Get notified instantly when businesses respond to your reviews! You can continue the conversation and even update your review if the situation is resolved.",
            imageUrl: "https://i.imgur.com/X4uV74U.png" // Placeholder for a clean UI mockup
        }
    ];

    return (
        <div className="bg-slate-50 font-sans antialiased text-slate-800">
            {/* Hero Section */}
            <header className="bg-white">
                <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 text-center">
                    <div className="inline-flex items-center gap-x-2 bg-primary-50 text-primary-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
                        <ShieldCheckIcon className="h-5 w-5" />
                        <span>Our Commitment to Authenticity</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                        How Our Reviews Work
                    </h1>
                    <p className="mt-6 text-lg lg:text-xl max-w-3xl mx-auto leading-8 text-slate-600">
                        We believe in a transparent review process that empowers consumers and holds businesses accountable. Here’s a clear look at how we ensure every review is genuine and helpful.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a href="#process" className="rounded-md bg-primary-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors">
                            See the Process
                        </a>
                        <a href="#guidelines" className="text-base font-semibold leading-6 text-slate-900 hover:text-slate-700">
                            Read Guidelines <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* Stats Section */}
            <section className="bg-white border-t border-b border-slate-200 py-24 sm:py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
                        <AnimatedStat number={10} suffix="M+" text="Reviews Published" />
                        <AnimatedStat number={24} suffix="hrs" text="Average Review Time" />
                        <AnimatedStat number={99.9} suffix="%" text="Uptime Guarantee" />
                        <AnimatedStat number={5} suffix="M+" text="Happy Users" />
                    </div>
                </div>
            </section>

            {/* Main Process Steps Section */}
            <main id="process" className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                        From Submission to Publication
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Our four-step process is designed to be straightforward for you and rigorous for us, ensuring the highest quality content on our platform.
                    </p>
                </div>

                <div className="relative mt-20">
                    {/* The timeline line */}
                    <div className="absolute left-1/2 -ml-px w-0.5 h-full bg-slate-200 hidden lg:block" aria-hidden="true"></div>

                    {processSteps.map((item, index) => (
                        <div key={item.title} className="relative mb-20 lg:mb-32">
                            <div className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                                {/* Content Section */}
                                <div className="lg:w-1/2">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-600/10 text-primary-600 flex items-center justify-center font-bold text-xl border-2 border-primary-600/20">
                                            {item.step}
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
                                    </div>
                                    <p className="mt-6 text-base leading-7 text-slate-600">{item.description}</p>
                                    <div className="mt-6 bg-primary-50 border-l-4 border-primary-300 p-4 rounded-r-md">
                                        <p className="text-sm text-primary-900/90">{item.proTip}</p>
                                    </div>
                                </div>

                                {/* Image/Mockup Section */}
                                <div className="lg:w-1/2">
                                    <div className="bg-white p-2 rounded-xl shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5">
                                        <img
                                            src={item.imageUrl}
                                            alt={`Mockup for ${item.title}`}
                                            className="rounded-lg w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Guidelines Section */}
            <section id="guidelines" className="bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                            Community Guidelines
                        </h2>
                        <p className="mt-4 text-lg text-slate-600">
                            To maintain a trusted and helpful community, we ask all users to adhere to these simple guidelines when writing reviews.
                        </p>
                    </div>

                    <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
                        {/* "Do Include" List */}
                        <div>
                            <h3 className="text-xl font-semibold flex items-center gap-x-3 text-green-600">
                                <CheckCircleIcon className="w-7 h-7" />
                                Do's for a Great Review
                            </h3>
                            <ul className="mt-6 space-y-4 text-slate-600">
                                <li className="flex gap-x-3"><span><strong className="font-semibold text-slate-900">Be Specific.</strong> Mention products, services, or people by name to add valuable context.</span></li>
                                <li className="flex gap-x-3"><span><strong className="font-semibold text-slate-900">Be Honest.</strong> Provide a fair and balanced assessment of your genuine experience.</span></li>
                                <li className="flex gap-x-3"><span><strong className="font-semibold text-slate-900">Be Helpful.</strong> Write for other consumers. What would you want to know before making a decision?</span></li>
                                <li className="flex gap-x-3"><span><strong className="font-semibold text-slate-900">Be Current.</strong> Review recent experiences to ensure the information is relevant.</span></li>
                            </ul>
                        </div>

                        {/* "Don't Include" List */}
                        <div>
                            <h3 className="text-xl font-semibold flex items-center gap-x-3 text-red-600">
                                <XCircleIcon className="w-7 h-7" />
                                What to Avoid
                            </h3>
                            <ul className="mt-6 space-y-4 text-slate-600">
                                <li className="flex gap-x-3"><span><strong className="font-semibold text-slate-900">Private Information.</strong> Never include phone numbers, addresses, or other personal data.</span></li>
                                <li className="flex gap-x-3"><span><strong className="font-semibold text-slate-900">Inappropriate Content.</strong> No offensive language, hate speech, or discriminatory remarks.</span></li>
                                <li className="flex gap-x-3"><span><strong className="font-semibold text-slate-900">Promotional Content.</strong> Reviews should not be used for advertising or including external links.</span></li>
                                <li className="flex gap-x-3"><span><strong className="font-semibold text-slate-900">Irrelevant Feedback.</strong> Keep your review focused on the specific experience with the business.</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <footer className="bg-slate-900">
                <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                        Ready to Share Your Experience?
                    </h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">
                        Your voice matters. Help strengthen our community and empower others by writing a review today.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a href="#" className="rounded-md bg-primary-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors">
                            Write a Review
                        </a>
                        <a href="#" className="text-base font-semibold leading-6 text-white hover:text-slate-100">
                            Learn more <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HowReviewsWorkPage;