// You'll need to install react-icons first:
// npm install react-icons
// or
// yarn add react-icons

"use client";
import { motion } from 'framer-motion';
import {
    FiAward,        // For licensed experts
    FiZap,          // For speed
    FiCheckCircle,  // For accuracy
    FiGlobe,        // For national coverage
    FiSmartphone,   // For digital platform
    FiHeadphones,   // For support
    FiArrowRight
} from 'react-icons/fi';
import {
    FaClipboardList, // For submitting request
    FaRegHandshake,    // For connecting with expert
    FaSearchLocation,  // For property inspection
    FaFileDownload   // For receiving report
} from 'react-icons/fa';

// Main Page Component for E-Vleresoj
const EVleresojPage = () => {

    // --- Data for the Features Section ---
    const features = [
        { icon: FiAward, title: "Ekspertë të Licencuar", description: "Bashkëpunojmë vetëm me vlerësues të certifikuar, duke garantuar profesionalizëm dhe besueshmëri të lartë.", highlight: "Garanci Cilësie" },
        { icon: FiZap, title: "Proces i Shpejtë dhe Efikas", description: "Platforma jonë optimizon çdo hap, duke ju mundësuar të merrni raportin tuaj në kohë rekord.", highlight: "Përgjigje e Menjëhershme" },
        { icon: FiCheckCircle, title: "Raporte të Sakta dhe Standardizuara", description: "Të gjitha vlerësimet tona janë në përputhje me Standardet Ndërkombëtare të Vlerësimit (IVS).", highlight: "Standarde Ndërkombëtare" },
        { icon: FiGlobe, title: "Mbulim Kombëtar", description: "Rrjeti ynë i ekspertëve mbulon çdo qytet dhe zonë të Shqipërisë, kudo që ndodhet prona juaj.", highlight: "Në të gjithë Shqipërinë" },
        { icon: FiSmartphone, title: "Platformë e Plotë Dixhitale", description: "Nga kërkesa fillestare deri te marrja e raportit final, gjithçka menaxhohet online, thjesht dhe lehtë.", highlight: "100% Online" },
        { icon: FiHeadphones, title: "Suport i Dedikuar", description: "Ekipi ynë është i gatshëm t'ju asistojë në çdo fazë të procesit për një eksperiencë pa probleme.", highlight: "Gjithmonë në dispozicion" }
    ];

    // --- Data for the How It Works Section ---
    const steps = [
        { icon: FaClipboardList, title: "Dërgo Kërkesën", description: "Plotësoni formularin online me të dhënat e pronës suaj në më pak se 2 minuta." },
        { icon: FaRegHandshake, title: "Lidhu me Ekspertin", description: "Platforma jonë ju cakton automatikisht vlerësuesin më të afërt dhe të përshtatshëm për ju." },
        { icon: FaSearchLocation, title: "Inspektimi i Pronës", description: "Eksperti ynë kryen verifikimin dhe inspektimin e nevojshëm të pasurisë tuaj në terren." },
        { icon: FaFileDownload, title: "Merr Raportin Final", description: "Raporti i plotë dhe i vulosur ju dërgohet në format dixhital, i gatshëm për përdorim." }
    ];

    // --- Animation Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <main className="bg-white dark:bg-gray-900">
            {/* =================================================================
                HERO SECTION
            ================================================================= */}
            <section className="relative overflow-hidden bg-gray-900 text-white py-24 sm:py-32">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 via-emerald-600/20 to-teal-600/20 opacity-50 blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                            Vlerësimi i Pronës Tuaj, <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Thjesht dhe Profesionalisht.</span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-gray-300">
                            Lidhuni me vlerësues të licencuar dhe merrni një raport të saktë për pronën tuaj në kohë rekord. Platforma lider në Shqipëri.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-teal-500/50 transition-all duration-300"
                            >
                                Fillo Vlerësimin Tani
                            </motion.button>
                            <motion.a
                                href="#si-funksionon"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="font-semibold leading-6 text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2"
                            >
                                Shiko Si Funksionon <FiArrowRight />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* =================================================================
                FEATURES SECTION
            ================================================================= */}
            <section id="features" className="py-20 sm:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-[#101014]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }} viewport={{ once: true }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight"
                        >
                            Përfitimet e Platformës <span className="text-teal-600">E-Vlerësoj</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}
                            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                        >
                            Ne kemi ndërtuar një ekosistem të plotë për t'ju ofruar shërbimin më të mirë të vlerësimit të pasurive në treg.
                        </motion.p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants} initial="hidden"
                        whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                    >
                        {features.map((feature) => (
                            <motion.div
                                key={feature.title} variants={itemVariants}
                                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                                className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-shadow duration-300"
                            >
                                <div className="p-8">
                                    <div className="bg-teal-100 dark:bg-teal-900/50 p-3 rounded-xl inline-block mb-5">
                                        <feature.icon className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-5 text-base leading-relaxed">{feature.description}</p>
                                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
                                        {feature.highlight}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* =================================================================
                HOW IT WORKS SECTION
            ================================================================= */}
            <section id="si-funksionon" className="py-20 sm:py-24 bg-white dark:bg-[#101014]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                            Procesi ynë në 4 Hapa të Thjeshtë
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Ndiqni hapat e mëposhtëm për të marrë vlerësimin profesional të pronës tuaj.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 relative"
                            variants={containerVariants} initial="hidden"
                            whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                        >
                            {steps.map((step, index) => (
                                <motion.div key={step.title} variants={itemVariants} className="text-center flex flex-col items-center">
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-center h-24 w-24 rounded-full bg-white dark:bg-gray-800 border-4 border-teal-500 text-teal-500 dark:text-teal-400 shadow-lg">
                                            <step.icon className="w-10 h-10" />
                                        </div>
                                        <span className="absolute -top-3 -right-3 flex items-center justify-center h-10 w-10 rounded-full bg-teal-500 text-white font-bold text-lg shadow-md ring-4 ring-white dark:ring-[#101014]">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                                    <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-xs mx-auto">{step.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* =================================================================
                CALL TO ACTION (CTA) SECTION
            ================================================================= */}
            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
                    <div className="bg-gradient-to-r from-teal-600 to-emerald-700 rounded-3xl p-12 lg:p-16 shadow-2xl lg:flex lg:items-center lg:justify-between">
                        <div className="lg:w-0 lg:flex-1">
                            <h2 className="text-3xl font-extrabold tracking-tight text-white">
                                Gati të zbuloni vlerën e saktë të pronës suaj?
                            </h2>
                            <p className="mt-4 max-w-3xl text-lg text-teal-100">
                                Mos hamendësoni më. Merrni një vlerësim profesional që ju ndihmon të merrni vendime të informuara për investimet, kreditë apo shitjet tuaja.
                            </p>
                        </div>
                        <div className="mt-8 lg:mt-0 lg:ml-8 lg:flex-shrink-0">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 bg-white text-teal-600 font-bold text-lg rounded-xl shadow-xl hover:bg-gray-100 transition-all duration-300"
                            >
                                Kërko një Vlerësim
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default EVleresojPage;