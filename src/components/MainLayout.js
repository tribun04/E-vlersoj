// src/components/MainLayout.js

import { Outlet } from 'react-router-dom'; // <-- Import Outlet
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// --- COMPONENT IMPORTS ---
import Header from './Header';
import Footer from './Footer';
import DarkModeToggle from './DarkModeToggle';
import PopUp from './PopUp';
import AiChatBox from './AiChatBox';

const MainLayout = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="flex flex-col min-h-screen">
            {/* This is the layout for your main app. It will now have the Header and Footer. */}
            <Header user={user} onLogout={logout} />

            <main className="flex-grow">
                {/* The <Outlet> will render the specific page component for the current route */}
                <Outlet />
            </main>

            <DarkModeToggle />
            <AiChatBox />
            <PopUp />
            <Footer />
        </div>
    );
};

export default MainLayout;