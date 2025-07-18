import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const legalLinks = [
    { path: '/legal/terms', label: 'Kushtet e Shërbimit' },
    { path: '/legal/privacy', label: 'Politika e Privatësisë' },
    { path: '/legal/cookies', label: 'Politika e Cookies' },
    { path: '/legal/legacy', label: 'Programi i Trashëgimisë' },
    { path: '/legal/refund', label: 'Politika e Rimbursimit' },
    { path: '/legal/faq', label: 'Pyetjet e Bëra Shpesh' },
    { path: '/legal/brand', label: 'Identiteti i Brendit' },
];

const LegalLayout = () => {
    // Stili për NavLink aktiv dhe joaktiv
    const navLinkStyles = ({ isActive }) => {
        return isActive
            ? 'bg-emerald-500 text-white font-semibold'
            : 'text-gray-600 hover:bg-emerald-100 hover:text-emerald-800';
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                    {/* Navigimi anësor */}
                    <aside className="md:w-1/4 lg:w-1/5">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Informacione Ligjore</h2>
                        <nav className="flex flex-col space-y-2">
                            {legalLinks.map(link => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={`text-left px-4 py-2 rounded-md transition-colors duration-200 ${navLinkStyles}`}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </nav>
                    </aside>

                    {/* Përmbajtja kryesore do të shfaqet këtu */}
                    <main className="md:w-3/4 lg:w-4/5">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default LegalLayout;