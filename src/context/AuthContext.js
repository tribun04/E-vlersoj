// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// 1. Create the context
const AuthContext = createContext(null); // <-- This is what we will export as default

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (userData, authToken) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
        setUser(userData);
        setToken(authToken);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };

    const loginWithGoogle = (response) => {
        const decodedUser = jwtDecode(response.credential);
        const userData = {
            id: decodedUser.sub,
            name: decodedUser.name,
            email: decodedUser.email,
            picture: decodedUser.picture,
        };
        const authToken = response.credential;
        login(userData, authToken);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
            try {
                const decodedToken = jwtDecode(storedToken);
                if (decodedToken.exp * 1000 > Date.now()) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                } else {
                    logout();
                }
            } catch (error) {
                console.error("Invalid token found, logging out.", error);
                logout();
            }
        }
        setLoading(false);
    }, []);

    const authContextValue = {
        user,
        token,
        loading,
        login,
        logout,
        loginWithGoogle
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy access
export const useAuth = () => {
    return useContext(AuthContext);
};

// =================================================================
// <<< THIS IS THE LINE YOU NEED TO ADD >>>
// =================================================================
// By adding this, you create the default export that your import needs.
export default AuthContext;
// =================================================================