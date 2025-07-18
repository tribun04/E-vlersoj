// src/pages/ContactPage.js
"use client"; // This directive is for Next.js App Router

import React, { useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt, faPaperPlane, faCheck } from "@fortawesome/free-solid-svg-icons";

function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear the specific error when the user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Emri është i detyrueshëm";
        if (!formData.email.trim()) newErrors.email = "Emaili është i detyrueshëm";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Ju lutem, shkruani një adresë emaili të vlefshme";
        if (!formData.subject) newErrors.subject = "Subjekti është i detyrueshëm";
        if (!formData.message.trim()) newErrors.message = "Mesazhi është i detyrueshëm";
        else if (formData.message.trim().length < 10) newErrors.message = "Mesazhi duhet të jetë të paktën 10 karaktere";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            // This relative URL will now be correctly proxied to your backend
            await axios.post('/api/contact', formData);

            setIsSubmitted(true);
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); // Reset form on success

        } catch (error) {
            // Display the error message from the backend, or a generic one
            setErrors({ submit: error.response?.data?.message || "Pati një gabim gjatë dërgimit. Ju lutem, provoni përsëri." });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success Message View
    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FontAwesomeIcon icon={faCheck} className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Faleminderit!</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        Mesazhi juaj është dërguar me sukses. Ekipi ynë do t'ju kthejë përgjigje sa më shpejt të jetë e mundur.
                    </p>
                    <button onClick={() => setIsSubmitted(false)} className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg">
                        Dërgo një mesazh tjetër
                    </button>
                </div>
            </div>
        );
    }

    // Main Contact Form View
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="bg-gray-50 dark:bg-gray-800/50 py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Kontaktoni Ekipin Tonë</h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Keni pyetje ose keni nevojë për mbështetje? Na kontaktoni dhe do të jemi të lumtur t'ju ndihmojmë.
                    </p>
                </div>
            </div>

            <div className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Information Column */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                    Detajet Tona të Kontaktit
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                            <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Na shkruani email</h3>
                                            <p className="text-gray-600 dark:text-gray-300">Support@e-vlersoj.com
                                            </p>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Koha tipike e përgjigjes: 24 orë</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                            <FontAwesomeIcon icon={faPhone} className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Na telefononi</h3>
                                            <p className="text-gray-600 dark:text-gray-300">+355 (69) 123-4567</p>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">E hënë - E premte, 9:00 - 17:00</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Zyrat Qendrore</h3>
                                            <p className="text-gray-600 dark:text-gray-300">Rruga "Vlersimit" 123, Tiranë, Shqipëri 1001</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form Column */}
                        <div>
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Na Dërgoni një Mesazh</h2>
                                {errors.submit && <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">{errors.submit}</div>}
                                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Emri i plotë *</label>
                                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`} placeholder="Emri juaj" required />
                                        {errors.name && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Adresa e emailit *</label>
                                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`} placeholder="emaili.juaj@example.com" required />
                                        {errors.email && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Numri i telefonit</label>
                                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" placeholder="(+355) 6X XXX XXXX" />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subjekti *</label>
                                        <select id="subject" name="subject" value={formData.subject} onChange={handleInputChange} className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.subject ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`} required>
                                            <option value="">Për çfarë bëhet fjalë?</option>
                                            <option value="support">Mbështetje Teknike</option>
                                            <option value="sales">Kërkesë për Shitje</option>
                                            <option value="feedback">Feedback për Produktin</option>
                                            <option value="partnership">Mundësi Partneriteti</option>
                                            <option value="other">Tjetër</option>
                                        </select>
                                        {errors.subject && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{errors.subject}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mesazhi *</label>
                                        <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={5} className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none ${errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`} placeholder="Si mund t'ju ndihmojmë?" required></textarea>
                                        {errors.message && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{errors.message}</p>}
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3">
                                        {isSubmitting ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Duke dërguar...</span></>) : (<><span>Dërgo Mesazhin</span><FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4 ml-2" /></>)}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;