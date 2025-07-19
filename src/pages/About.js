import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faShieldAlt, faChartLine, faGlobe, faHandshake, } from "@fortawesome/free-solid-svg-icons";






const AboutUsPage = () => {
   
    const milestones = [
        {
            year: "2024", event: "Kompania u ideua me mission per te ndertuar besim online "
        },
        { year: "2025", event: "Lansuam platformen e pare te vleresimit ne trojet shqip-folese " },
        { year: "2025", event: "Arritem 10K vizitor ne diten e pare " },


    ];

    const values = [
        {
            icon: faShieldAlt,
            title: "Integriteti",
            description: "Ne mbajmë standardet më të larta të ndershmërisë në të gjitha vlerësimet dhe ndërveprimet."
        },
        {
            icon: faUsers,
            title: "Komuniteti",
            description: "Ne ndërtojmë mjete që u shërbejnë në mënyrë të drejtë si konsumatorëve ashtu edhe bizneseve."
        },


        {
            icon: faHandshake,
            title: "Partneriteti",
            description: "Ne punojmë në bashkëpunim me bizneset për të përmirësuar ofertat e tyre."
        }
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">

            {/* Seksioni Hero */}
            <div className="relative bg-white dark:bg-gray-800 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white dark:bg-gray-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <div className="pt-10 px-4 sm:px-6 lg:px-8">
                            <div className="mt-20 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                                <div className="text-center lg:text-left">
                                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                                        <span className="block">Ne deshirojme te jemi nje ure
                                        </span>
                                        <span className="block text-[#00B67A]">transparente mes klienteve dhe bizneseve</span>
                                    </h1>
                                    <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                        Platforma jone po ndryshon formen se si bizneset dhe klientet nderlidhen permes vlersimeve autentike.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:absolute  object-cover lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="images/HeroSection-Banner.png" alt="Ekipi duke bashkepunuar" />
                </div>
            </div>

            {/* Historia Jonë */}
            <div className="py-16 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-[#00B67A] font-semibold tracking-wide uppercase">Historia Jonë</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Ndertimi I nje tregu me transparent
                        </p>
                        <div className="mt-10">
                            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 items-center">
                                <div>
                                    <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
                                        E ideuar ne vitin 2024 me nje iniciative te brendshme ne Shigjeta LLC, si programmer dhe pjsese e ekipit Tribun Bajra zgjedh qe nje problematike si fenomen aktual ta kthej me nje zgjidhje e cila aplikohet lehte dhe pa kosto. 2025 kjo platforme merr formen e duhur dhe konceptin me nje themel shume te fuqishem.

                                    </p>

                                </div>
                                <div className="relative">
                                    <div className="bg-[#00B67A]/10 dark:bg-[#00B67A]/20 p-6 rounded-lg border-l-4 border-[#00B67A]">
                                        <h3 className="text-lg font-medium text-[#008a5c] dark:text-[#00e096] mb-2">Misioni Ynë</h3>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            te krijojme nje treg transparent I cili nuk I demton bizneset e as klientet dhe te jete nje institucion qe fuqizon te dy palet.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Arritjet Tona */}
            <div className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center mb-12">
                        <h2 className="text-base text-[#00B67A] font-semibold tracking-wide uppercase">Arritjet Tona</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Udhetimi yne deri ne lansim
                        </p>
                    </div>
                    <div className="flow-root">
                        <ul className="-mb-8">
                            {milestones.map((milestone, index) => (
                                <li key={index}>
                                    <div className="relative pb-8">
                                        {index !== milestones.length - 1 && (
                                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></span>
                                        )}
                                        <div className="relative flex space-x-3">
                                            <div>
                                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-gray-50 dark:ring-gray-900 ${index % 2 === 0 ? 'bg-[#00B67A] text-white' : 'bg-gray-400 dark:bg-gray-600 text-white'}`}>
                                                    {index + 1}
                                                </span>
                                            </div>
                                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                <div>
                                                    <p className="text-lg text-gray-900 dark:text-gray-200 font-medium">{milestone.event}</p>
                                                </div>
                                                <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                    {milestone.year}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Vlerat Tona */}
            <div className="py-16 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center mb-12">
                        <h2 className="text-base text-[#00B67A] font-semibold tracking-wide uppercase">Vlerat Tona</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Cfare na motivon cdo dite
                        </p>
                    </div>
                    <div className="mt-10">
                        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-10">
                            {values.map((value, index) => (
                                <div key={index} className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#00B67A] text-white">
                                            <FontAwesomeIcon icon={value.icon} className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{value.title}</h3>
                                        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Udhëheqësia */}


            {/* Thirrje për Veprim (CTA) */}
            <div className="bg-[#00B67A]">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Gati per te ndjek platformat tjera?
                        </span>
                        <span className="block text-white text-opacity-90">Ne krijojme benefite per tregun dhe klientet.
                        </span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <a
                                href="https://e-visiton.com/" target="_blank"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#00B67A] bg-white hover:bg-gray-50"
                            >
                                E- Visiton
                            </a>
                        </div>
                        <div className="ml-3 inline-flex rounded-md shadow">
                            <a
                                href="https://e-krahasoj.com/" target="_blank"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#00B67A] bg-white hover:bg-gray-50"
                            >
                                E- krahasoj
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;