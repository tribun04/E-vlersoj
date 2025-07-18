// src/components/GoogleLoginButton.js (Corrected and Final Version)
import { GoogleLogin } from '@react-oauth/google';
import axiosInstance from '../api/axiosInstance'; // Your axios instance
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
    const navigate = useNavigate();

    // ✅ THE FIX: The function name now matches what the component expects.
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        console.log("Received token from Google:", credentialResponse);
        try {
            // Send the token received from Google to your backend
            const res = await axiosInstance.post('/auth/google-signin', {
                token: credentialResponse.credential // The JWT is in the 'credential' field
            });

            // Your backend will send back its own app token
            const { token, user } = res.data;
            localStorage.setItem('token', token);

            message.success('Login successful!');
            // Redirect to the main dashboard or home page after login
            navigate('/');
            window.location.reload(); // Force a full refresh to clear all states

        } catch (error) {
            console.error("Backend Google Sign-In Error:", error);
            message.error(error.response?.data?.message || 'Google Sign-In failed.');
        }
    };

    const handleGoogleError = () => {
        console.error('Google Login Failed');
        message.error('Google authentication failed. Please try again.');
    };

    return (
        <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleError}
        // useOneTap // Optional: for a smoother user experience
        />
    );
};

export default GoogleLoginButton;