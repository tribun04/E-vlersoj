import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import GoogleLoginButton from '../components/GoogleLoginButton';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    // This handles the regular email/password registration
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // THE FIX IS HERE: The key 'name' is changed to 'username'
            const dataToSend = { username: formData.name, email: formData.email, password: formData.password };
            await axiosInstance.post('/auth/register', dataToSend);
            navigate('/');
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Regjistrimi dështoi. Ju lutem provoni përsëri.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    // This handles the response from Google Sign-In
    const handleGoogleSignIn = async (response) => {
        setLoading(true);
        setError('');
        try {
            const res = await axiosInstance.post('/auth/google', {
                token: response.credential
            });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/');
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Google Sign-In failed. Please try again.";
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    // This initializes the Google button when the component loads
    useEffect(() => {
        /* global google */
        if (window.google) {
            google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleGoogleSignIn
            });

            google.accounts.id.renderButton(
                document.getElementById("googleSignInButton"),
                { theme: "outline", size: "large", }
            );
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    Krijo një Llogari Përdoruesi
                </h2>

                {error && (
                    <div className="mb-4 text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded">
                        {error}
                    </div>
                )}

                {/* EMAIL & PASSWORD FORM IS HERE */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Emri i përdoruesit
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B67A] dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email-i
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B67A] dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Fjalëkalimi
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B67A] dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#00B67A] hover:bg-[#009A60] text-white font-medium py-2.5 rounded-lg shadow transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Duke u regjistruar...' : 'Regjistrohu'}
                    </button>
                </form>

                {/* DIVIDER */}
                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    <span className="mx-4 flex-shrink text-sm text-gray-500 dark:text-gray-400">Ose vazhdo me</span>
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                </div>

                {/* GOOGLE BUTTON IS HERE */}
                <GoogleLoginButton />


                {/* LINKS AT THE BOTTOM */}
                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                    Jeni biznes?{' '}
                    <Link to="/CompanyRegister" className="text-green-600 hover:underline">
                        Regjistro një llogari biznesi
                    </Link>
                </p>
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
                    Keni llogari?{' '}
                    <Link to="/login" className="text-green-600 hover:underline">
                        Hyr këtu
                    </Link>

                </p>
            </div>
        </div>
    );
};

export default Register;