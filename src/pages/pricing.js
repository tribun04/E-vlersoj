"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faStar,
    faQuestionCircle,
    faChevronDown,
    faChevronUp
} from "@fortawesome/free-solid-svg-icons";

const PricingPage = () => {
    // State to manage the open FAQ item
    const [openFaq, setOpenFaq] = useState(null);

    const plans = [
        {
            name: "Starter",
            price: "Free",
            description: "Perfect for individuals getting started with reviews.",
            features: [
                "Up to 100 monthly reviews",
                "Basic review collection",
                "Standard review widgets",
                "Email support",
                "Public review profile"
            ],
            cta: "Get Started",
            popular: false
        },
        {
            name: "Business",
            price: "$199",
            period: "/month",
            description: "For growing businesses needing more control and insights.",
            features: [
                "Up to 1,000 monthly reviews",
                "Advanced review collection",
                "Custom review widgets",
                "Review moderation tools",
                "Priority email support",
                "Review analytics dashboard",
                "Branded review pages"
            ],
            cta: "Start 14-day Trial",
            popular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "For large organizations with complex security and support needs.",
            features: [
                "Unlimited reviews",
                "Dedicated account manager",
                "API access",
                "Advanced analytics",
                "Single sign-on (SSO)",
                "Custom integrations",
                "24/7 phone support",
                "SLA guarantees"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ];

    const features = [
        { title: "Review Collection", description: "Easily gather authentic reviews from your customers via email, SMS, or on-site.", icon: faStar },
        { title: "Review Moderation", description: "Stay in control. Approve, reply to, or dismiss reviews before they go public.", icon: faCheck },
        { title: "Analytics Dashboard", description: "Track and analyze your review performance with powerful, easy-to-understand data.", icon: faStar },
        { title: "Custom Branding", description: "Match the platform to your brand identity for a seamless customer experience.", icon: faStar },
        { title: "API Access", description: "Integrate with your existing systems and workflows for ultimate flexibility.", icon: faStar },
        { title: "Priority Support", description: "Get fast, expert help from our dedicated support team when you need it.", icon: faQuestionCircle }
    ];

    const faqs = [
        { question: "Can I change my plan later?", answer: "Yes, absolutely! You can easily upgrade, downgrade, or cancel your plan at any time directly from your account dashboard. We prorate the charges so you only pay for what you use." },
        { question: "What payment methods do you accept?", answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For Enterprise plans, we also support payment via bank transfer and invoice." },
        { question: "Is there a minimum contract term?", answer: "No. Our monthly plans are billed month-to-month, and you can cancel at any time without any penalty. We believe in earning your business every month." },
        { question: "How is my data protected?", answer: "We take data security very seriously. All data is encrypted in transit and at rest using industry-standard protocols. Our infrastructure is hosted on secure, SOC 2 compliant servers, and we perform regular security audits." }
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
            {/* Hero Section */}
            <div className="bg-white dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 mb-4">
                        Simple, transparent pricing
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Choose the plan that works best for your business. Start free, upgrade anytime.
                    </p>
                </div>
            </div>

            {/* Pricing Plans */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-xl shadow-lg border bg-white dark:bg-gray-800 transition-all duration-300 ${plan.popular
                                ? "border-[#00B67A] dark:border-[#00e096] ring-2 ring-[#00B67A] dark:ring-[#00e096] transform md:-translate-y-4"
                                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-1"
                                } overflow-hidden`}
                        >
                            <div className="p-8">
                                {plan.popular && (
                                    <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold bg-[#00B67A] text-white">
                                        Most Popular
                                    </span>
                                )}
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{plan.name}</h2>
                                <div className="flex items-baseline mb-4">
                                    <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                                        {plan.price}
                                    </span>
                                    {plan.period && (
                                        <span className="ml-1 text-lg font-medium text-gray-500 dark:text-gray-400">
                                            {plan.period}
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 h-12">{plan.description}</p>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="flex-shrink-0 h-5 w-5 text-[#00B67A] dark:text-[#00e096] mt-0.5 mr-3"
                                            />
                                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="#"
                                    className={`block w-full py-3 px-6 rounded-lg text-center font-semibold transition-all duration-300 shadow-sm ${plan.popular
                                        ? "bg-[#00B67A] text-white hover:bg-[#008a5c] dark:hover:bg-[#00d48a] ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-transparent focus:ring-[#00B67A]"
                                        : "bg-gray-100 text-[#008a5c] dark:bg-gray-700 dark:text-[#00e096] hover:bg-gray-200 dark:hover:bg-gray-600"
                                        }`}
                                >
                                    {plan.cta}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Everything you need to build trust
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Our platform includes all these features and more to help your business thrive.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                    {features.map((feature, index) => (
                        <div key={index} className="flex">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#00B67A]/10 dark:bg-[#00e096]/20 text-[#00B67A] dark:text-[#00e096]">
                                    <FontAwesomeIcon icon={feature.icon} className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    {feature.title}
                                </h3>
                                <p className="mt-1 text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white dark:bg-gray-800/50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((item, index) => (
                            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex justify-between items-center text-left p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B67A]"
                                >
                                    <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{item.question}</span>
                                    <FontAwesomeIcon
                                        icon={openFaq === index ? faChevronUp : faChevronDown}
                                        className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${openFaq === index ? 'transform rotate-180' : ''}`}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="p-5 border-t border-gray-200 dark:border-gray-700">
                                        <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-[#00B67A] to-[#00a36e]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
                    <h2 className="text-3xl font-extrabold text-white mb-4">
                        Ready to build trust with your customers?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                        Join thousands of businesses using our platform to collect and showcase authentic reviews.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#"
                            className="inline-block bg-white text-[#008a5c] px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Get Started Free
                        </a>
                        <a
                            href="#"
                            className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                        >
                            Contact Sales
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;