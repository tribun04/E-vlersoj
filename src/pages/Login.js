// Login.js

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import AuthContext from '../context/AuthContext';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { Helmet } from 'react-helmet';

const Login = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext); // Get the entire context first

    // State for the form
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // **THE FIX**: Add a check to ensure the context is available.
    // This prevents the app from crashing and gives a clear error.
    useEffect(() => {
        if (!authContext) {
            const errorMessage = "AuthContext is not available. Make sure you have wrapped your application in <AuthProvider> in your App.js or index.js file.";
            setError(errorMessage);
            console.error(errorMessage);
        }
    }, [authContext]);

    // If context is not found, we can't proceed.
    if (!authContext) {
        // You can render a loading state or the error message directly
        return (
            <div className="min-h-screen flex items-center justify-center">
             
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                    <p className="font-bold">Configuration Error</p>
                    <p>Could not find Auth Provider. Please check the console.</p>
                </div>
            </div>
        );
    }

    // Now that we've checked, we can safely destructure.
    const { login } = authContext;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    // --- Standard Form Submission ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            const { token, user } = res.data;

            login(user, token); // Call the context's login function

            // --- START: MODIFICATION ---
            // Check the user's role and redirect to the appropriate page.
            if (user.role === 'company') {
                navigate(`/company/${user.id}`); // Redirect company to their profile
            } else if (user.role === 'admin') {
                navigate('/admin/dashboard'); // Redirect admin to dashboard
            } else {
                navigate('/'); // Redirect regular users to the homepage
            }
            // --- END: MODIFICATION ---

        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // --- Google Login Handler ---
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/google-signin', {
                token: credentialResponse.credential,
            });
            const { token, user } = res.data;

            login(user, token); // Use the same central login function

            // --- START: MODIFICATION ---
            // Apply the same redirection logic here for consistency.
            if (user.role === 'company') {
                navigate(`/company/${user.id}`);
            } else if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
            // --- END: MODIFICATION ---

        } catch (err) {
            console.error("Backend Google Sign-In Error:", err);
            setError(err.response?.data?.message || 'Google Sign-In failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleError = () => {
        setError('Google login failed. Please try again.');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
               <Helmet>
        <title>E-Vleresoj - Login</title>
      </Helmet>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                    Hyr në llogarinë tënde
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                    Ose{' '}
                    <Link to="/register" className="font-medium text-brand-green">
                        regjistrohu këtu
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {error && (
                        <div className="mb-4 bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4">
                            <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Fjalëkalimi
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand-green border-gray-300 rounded focus:ring-brand-green" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Më mbaj mend</label>
                            </div>
                            <div className="text-sm">
                                <Link to="/forgot-password" className="font-medium text-brand-green hover:text-brand-green-dark">Harruat fjalëkalimin?</Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-green hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green disabled:opacity-50"
                        >
                            {loading ? 'Po procesoj...' : 'Hyr'}
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300 dark:border-gray-600" /></div>
                            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300">Ose vazhdo me</span></div>
                        </div>

                        <div className="mt-6 flex justify-center">
                            {/* Pass the success handler to your button component */}
                            <GoogleLoginButton onSuccess={handleGoogleLoginSuccess} onError={handleGoogleError} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;