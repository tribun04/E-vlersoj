"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faBook,
    faQuestionCircle,
    faFileAlt,
    faVideo,
    faComments,
    faChevronDown,
    faChevronUp, // Changed from faChevronRight for a better open/close visual
    faStar,
    faArrowRight,
    faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

const HelpCenterAL = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);

    // --- Translated Content in Albanian ---
    const categories = [
        {
            id: 'getting-started',
            title: 'Si të Filloni',
            icon: faBook,
            articles: [
                { id: 'gs-1', title: 'Krijimi i Vlerësimit tuaj të Parë', views: 1245, featured: true },
                { id: 'gs-2', title: 'Udhëzues për Konfigurimin e Llogarisë', views: 892, featured: false },
                { id: 'gs-3', title: 'Navigimi në Panelin e Kontrollit', views: 756, featured: true },
                { id: 'gs-4', title: 'Rolet e Përdoruesve dhe Lejet', views: 532, featured: false },
            ]
        },
        {
            id: 'assessment-creation',
            title: 'Krijimi i Vlerësimeve',
            icon: faFileAlt,
            articles: [
                { id: 'ac-1', title: 'Pasqyrë e Bankës së Pyetjeve', views: 1876, featured: true },
                { id: 'ac-2', title: 'Krijimi i Pyetjeve të Personalizuara', views: 1123, featured: true },
                { id: 'ac-3', title: 'Importimi i Pyetjeve nga Excel', views: 945, featured: false },
                { id: 'ac-4', title: 'Shpjegimi i Cilësimeve të Vlerësimit', views: 678, featured: false },
            ]
        },
        {
            id: 'proctoring',
            title: 'Mbikëqyrja & Siguria',
            icon: faQuestionCircle,
            articles: [
                { id: 'p-1', title: 'Aktivizimi i Mbikëqyrjes me Inteligjencë Artificiale (IA)', views: 1567, featured: true },
                { id: 'p-2', title: 'Praktikat më të Mira të Sigurisë', views: 1024, featured: false },
                { id: 'p-3', title: 'Shpjegimi i Bllokimit të Shfletuesit (Browser Lockdown)', views: 876, featured: true },
            ]
        },
        {
            id: 'reporting',
            title: 'Raportimi & Analitika',
            icon: faStar,
            articles: [
                { id: 'r-1', title: 'Të Kuptuarit e Raporteve Tuaja', views: 1342, featured: true },
                { id: 'r-2', title: 'Eksportimi i të Dhënave', views: 765, featured: false },
                { id: 'r-3', title: 'Modele të Personalizuara të Raporteve', views: 543, featured: false },
            ]
        }
    ];

    const popularArticles = categories
        .flatMap(category => category.articles)
        .filter(article => article.featured)
        .sort((a, b) => b.views - a.views)
        .slice(0, 6);

    const filteredCategories = categories.map(category => ({
        ...category,
        articles: category.articles.filter(article =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.articles.length > 0);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
            <div className="bg-white dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4">Qendra e Ndihmës</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                            Gjeni përgjigje për pyetjet tuaja rreth krijimit, shpërndarjes dhe analizimit të vlerësimeve.
                        </p>
                        <div className="relative max-w-2xl mx-auto">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faSearch} className="text-gray-400 dark:text-gray-500" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#00B67A] focus:border-[#00B67A] dark:focus:ring-[#00e096] dark:focus:border-[#00e096] transition-all duration-300"
                                placeholder="Kërko artikuj ndihmës..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-12">
                {selectedArticle ? (
                    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <button onClick={() => setSelectedArticle(null)} className="text-sm text-[#00B67A] dark:text-[#00e096] mb-6 hover:underline flex items-center gap-2">
                            <FontAwesomeIcon icon={faArrowLeft} /> Kthehu te Qendra e Ndihmës
                        </button>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{selectedArticle.title}</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                            <p>Kjo është përmbajtja e plotë e artikullit: <strong>{selectedArticle.title}</strong>.</p>
                            <p>Përmbajtja aktuale e artikullit do të shfaqej këtu, e formatuar bukur. Mund të përfshijë paragrafë, lista, imazhe dhe më shumë për të ofruar një përgjigje të plotë për përdoruesin.</p>
                            <p>Për shembull, mund të detajojmë hapat për 'Krijimi i Vlerësimit tuaj të Parë':</p>
                            <ol>
                                <li>Hyni në panelin tuaj të kontrollit.</li>
                                <li>Navigoni te seksioni 'Vlerësimet'.</li>
                                <li>Klikoni butonin 'Krijo Vlerësim të Ri'.</li>
                                <li>Ndiqni udhëzimet në ekran për të shtuar pyetje dhe konfiguruar cilësimet.</li>
                            </ol>
                        </div>
                    </div>
                ) : (
                    <>
                        {searchQuery === '' && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Artikuj Popullorë</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {popularArticles.map((article) => (
                                        <div key={article.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-[#00B67A]/50 dark:hover:border-[#00e096]/50 hover:-translate-y-1 transition-all duration-300 group">
                                            <div className="flex items-center mb-3">
                                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{article.views.toLocaleString()} shikime</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-[#00B67A] dark:group-hover:text-[#00e096] transition-colors duration-300">{article.title}</h3>
                                            <button onClick={() => setSelectedArticle(article)} className="text-[#00B67A] dark:text-[#00e096] hover:text-[#008a5c] dark:hover:text-[#34d399] font-medium inline-flex items-center transition-colors duration-300">
                                                Lexo artikullin
                                                <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-sm transform group-hover:translate-x-1 transition-transform duration-300" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mb-12">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">{searchQuery ? 'Rezultatet e Kërkimit' : 'Shfleto sipas Kategorisë'}</h2>
                            <div className="space-y-4">
                                {filteredCategories.map((category) => (
                                    <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300 hover:border-[#00B67A]/50 dark:hover:border-[#00e096]/50">
                                        <button
                                            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300"
                                            onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                                        >
                                            <div className="flex items-center">
                                                <FontAwesomeIcon icon={category.icon} className="text-[#00B67A] dark:text-[#00e096] mr-4 text-xl" />
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{category.title}</h3>
                                            </div>
                                            <FontAwesomeIcon
                                                icon={activeCategory === category.id ? faChevronUp : faChevronDown}
                                                className="text-gray-500 dark:text-gray-400 transition-transform duration-300"
                                            />
                                        </button>

                                        <div className={`transition-all duration-500 ease-in-out ${activeCategory === category.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
                                                <ul className="space-y-3">
                                                    {category.articles.map((article) => (
                                                        <li key={article.id}>
                                                            <button
                                                                onClick={() => setSelectedArticle(article)}
                                                                className="w-full text-left flex justify-between items-center py-2 text-gray-700 dark:text-gray-300 hover:text-[#00B67A] dark:hover:text-[#00e096] transition-colors duration-300 group"
                                                            >
                                                                <span className="flex items-center">
                                                                    <FontAwesomeIcon icon={faFileAlt} className="mr-3 text-gray-400 dark:text-gray-500" />
                                                                    {article.title}
                                                                </span>
                                                                {article.featured && (
                                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00B67A]/10 text-[#008a5c] dark:bg-[#00B67A]/20 dark:text-[#34d399]">
                                                                        <FontAwesomeIcon icon={faStar} className="mr-1.5" />
                                                                        Popullor
                                                                    </span>
                                                                )}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">Keni nevojë akoma për ndihmë?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:border-[#00B67A]/50 dark:hover:border-[#00e096]/50 hover:-translate-y-1 transition-all duration-300">
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#00B67A]/10 text-[#00B67A] dark:bg-[#00B67A]/20 dark:text-[#00e096] mb-4">
                                        <FontAwesomeIcon icon={faComments} className="text-xl" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Kontakto Mbështetjen</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">Bisedoni me ekipin tonë të mbështetjes 24/7.</p>
                                    <a href='/' className="inline-block bg-[#00B67A] text-white font-semibold px-5 py-2 rounded-lg hover:bg-[#008a5c] dark:hover:bg-[#00a36e] transition-all duration-300 shadow-sm hover:shadow-md">
                                        Fillo Bisedën
                                    </a >
                                </div>

                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:border-[#00B67A]/50 dark:hover:border-[#00e096]/50 hover:-translate-y-1 transition-all duration-300">
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#00B67A]/10 text-[#00B67A] dark:bg-[#00B67A]/20 dark:text-[#00e096] mb-4">
                                        <FontAwesomeIcon icon={faVideo} className="text-xl" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Udhëzues Video</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">Shikoni udhëzues video hap pas hapi.</p>
                                    <a href='/' className="inline-block bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold px-5 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 shadow-sm hover:shadow-md">
                                        Shiko Udhëzuesit
                                    </a>
                                </div>


                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default HelpCenterAL;