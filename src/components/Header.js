// src/components/Header.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SettingOutlined, CommentOutlined, DashboardOutlined } from '@ant-design/icons';

// Translated navigation links
const navLinks = [
    { href: '/about', label: 'Rreth Nesh' },
];

const Header = ({ user, onLogout }) => {
    // --- State and Refs ---
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const userMenuRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const navigate = useNavigate();

    // --- Effects ---

    // Effect for handling header style on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Effect for closing menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('button[aria-label="Menuja e lëvizshme"]')) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // --- Event Handlers ---

    const handleLogout = () => {
        onLogout();
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
        navigate('/login');
    };

    // Closes the user dropdown when a link is clicked
    const handleUserMenuLinkClick = () => {
        setUserMenuOpen(false);
    };

    // Closes the mobile menu when a link is clicked
    const handleMobileMenuLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header
            className={`
                fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80
                backdrop-filter backdrop-blur-lg border-b transition-all duration-300
                ${scrolled ? 'border-gray-200 dark:border-gray-700 shadow-sm' : 'border-transparent'}
            `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ============================ */}
                {/* ===   DESKTOP HEADER   === */}
                {/* ============================ */}
                <div className="hidden md:flex justify-between items-center h-16">
                    {/* --- Logo --- */}
                    <Link to="/" className="flex items-center space-x-2 transform hover:scale-105 transition-transform duration-200">
                        <img src="/images/Logo.png" alt="Vlersoj Logo" className="w-[150px] object-contain" />
                    </Link>

                    {/* --- Navigation & Actions --- */}
                    <div className="flex items-center space-x-8">
                        <nav className="flex items-center space-x-8">
                            {navLinks.map(link => (
                                <Link key={link.href} to={link.href} className="relative text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 group">
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center space-x-6">
                            {user ? (
                                // --- User Logged In Dropdown ---
                                <div className="relative" ref={userMenuRef}>
                                    <button onClick={() => setUserMenuOpen(prev => !prev)} className="flex items-center space-x-2 focus:outline-none group" aria-expanded={userMenuOpen} aria-label="Menuja e përdoruesit">
                                        <div className="relative">
                                            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=random&color=fff`} alt="User Avatar" className="h-9 w-9 rounded-full ring-2 ring-green-500 group-hover:ring-green-600 transition-all" />
                                            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900"></span>
                                        </div>
                                        <svg className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    <div className={`absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700 focus:outline-none transition-all duration-200 z-20 ${userMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                        <div className="px-4 py-3">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.username}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                                        </div>
                                        <div className="py-1">
                                            {user.role === 'admin' && <Link to="/admin" onClick={handleUserMenuLinkClick} className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"><DashboardOutlined className="mr-2" />Paneli i Adminit</Link>}
                                            {user.role === 'company' && <Link to={`/companies/${user.id}`} onClick={handleUserMenuLinkClick} className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profili Im</Link>}
                                            {user.role === 'user' && <Link to="/my-reviews" onClick={handleUserMenuLinkClick} className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"><CommentOutlined className="mr-2" />Vlerësimet e Mia</Link>}
                                            <Link to="/settings" onClick={handleUserMenuLinkClick} className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"><SettingOutlined className="mr-2" />Cilësimet</Link>
                                        </div>
                                        <div className="py-1">
                                            <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">Dil</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // --- Guest Links (MODIFIED) ---
                                <nav className="flex items-center space-x-4">
                                    {/* Outline Green Button */}
                                    <Link
                                        to="/Login"
                                        className="relative inline-flex items-center px-4 py-2 border border-green-500 text-sm font-medium rounded-full text-green-600 bg-transparent hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:scale-105"
                                    >
                                        <span>Hyrë si Kompani</span>
                                        <svg className="ml-1 -mr-0.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>

                                    {/* Solid Green Button */}
                                    <Link
                                        to="/companiesPage"
                                        className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-green-500 to-green-600 shadow-sm hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:scale-105"
                                    >
                                        <span>Fillo Vlerësimin</span>
                                        <svg className="ml-1 -mr-0.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                </nav>
                            )}
                            {/* --- Call to Action Button --- */}

                        </div>
                    </div>
                </div>

                {/* ========================== */}
                {/* ===   MOBILE HEADER    === */}
                {/* ========================== */}
                <div className="md:hidden flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center">
                        <img src="/images/Logo.png" alt="Logo" className="object-contain w-36" />
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link to="/companiesPage" className="px-3 py-1.5 text-xs font-medium rounded-full text-white bg-gradient-to-r from-green-500 to-green-600 shadow-sm">Fillo</Link>
                        <button onClick={() => setMobileMenuOpen(prev => !prev)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 focus:outline-none" aria-label="Menuja e lëvizshme">
                            {mobileMenuOpen ? <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>}
                        </button>
                    </div>
                </div>
            </div>

            {/* ============================== */}
            {/* ===   MOBILE MENU PANEL    === */}
            {/* ============================== */}
            <div ref={mobileMenuRef} className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    {/* --- Mobile Navigation Links --- */}
                    {navLinks.map((link) => (
                        <Link key={link.href} to={link.href} onClick={handleMobileMenuLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">{link.label}</Link>
                    ))}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        {user ? (
                            // --- Mobile Logged In User Section ---
                            <div className="space-y-1">
                                <div className="flex items-center px-3 mb-3">
                                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=random&color=fff`} alt="User Avatar" className="h-10 w-10 rounded-full ring-2 ring-green-500" />
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800 dark:text-white">{user.username}</div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">{user.role}</div>
                                    </div>
                                </div>
                                {user.role === 'admin' && <Link to="/admin" onClick={handleMobileMenuLinkClick} className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"><DashboardOutlined className="mr-3" />Paneli i Adminit</Link>}
                                {user.role === 'company' && <Link to={`/companies/${user.id}`} onClick={handleMobileMenuLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800">Profili Im</Link>}
                                {user.role === 'user' && <Link to="/my-reviews" onClick={handleMobileMenuLinkClick} className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"><CommentOutlined className="mr-3" />Vlerësimet e Mia</Link>}
                                <Link to="/settings" onClick={handleMobileMenuLinkClick} className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"><SettingOutlined className="mr-3" />Cilësimet</Link>
                                <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800">Dil</button>
                            </div>
                        ) : (
                            // --- Mobile Guest Links ---
                            <div className="space-y-1">
                                <Link to="/login" onClick={handleMobileMenuLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Hyr</Link>
                                <Link to="/register" onClick={handleMobileMenuLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Regjistrohu</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;