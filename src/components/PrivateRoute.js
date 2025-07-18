// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, adminOnly = false }) => {
    const token = localStorage.getItem('token');

    // CHECK 1: Is the user logged in at all?
    if (!token) {
        // No token found, user is not logged in. Redirect to login page.
        return <Navigate to="/login" replace />;
    }

    // CHECK 2: Is the token valid (not expired or malformed)?
    try {
        const user = jwtDecode(token);

        // CHECK 3: If the route is for admins, does the user have the admin role?
        if (adminOnly && user.role !== 'admin') {
            // User is logged in but is not an admin. Redirect to home.
            return <Navigate to="/" replace />;
        }

        // If all checks pass, show the page the user requested.
        return children;

    } catch (error) {
        // The token is invalid. Clean it up and force a re-login.
        localStorage.removeItem('token');
        return <Navigate to="/login" replace />;
    }
};

export default PrivateRoute;