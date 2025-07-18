import React from 'react';

const PrivacyPolicy = () => (
    <div className="min-h-screen  relative overflow-hidden pt-5 mt-[80px] p-6 sm:p-8 md:p-10 max-w-[1280px] mx-auto text-gray-200 leading-relaxed space-y-6 rounded-2xl shadow-2xl animate-slide-up-fade">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Politika e Privatësisë</h1>
        <p className="text-lg text-gray-600 mb-8">Data e hyrjes në fuqi: [Data e Sotme]</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">1. Hyrje</h2>
                <p>Shigjeta LLC ("ne", "neve", "tonë") është e përkushtuar të mbrojë privatësinë tuaj. Kjo Politikë e Privatësisë shpjegon se si ne mbledhim, përdorim, zbulojmë dhe mbrojmë informacionin tuaj kur ju vizitoni dhe përdorni platformën tonë e-vlersoj ("Platforma"). Ju lutemi lexoni me kujdes këtë politikë. Duke përdorur Platformën, ju pranoni praktikat e përshkruara këtu.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">2. Informacioni që Mbledhim</h2>
                <p>Ne mund të mbledhim informacione personale dhe jo-personale në mënyra të ndryshme:</p>
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">A. Informacioni që ju na jepni drejtpërdrejt:</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><strong>Të dhënat e regjistrimit:</strong> Kur krijoni një llogari, ne mbledhim emrin tuaj, adresën e email-it, dhe fjalëkalimin.</li>
                    <li><strong>Përmbajtja e Vlerësimit:</strong> Kur shkruani një vlerësim, ne mbledhim përmbajtjen e atij vlerësimi.</li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">B. Informacioni që mblidhet automatikisht:</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><strong>Të dhënat e përdorimit:</strong> Ne mbledhim informacione rreth ndërveprimit tuaj me Platformën.</li>
                    <li><strong>Të dhënat e pajisjes dhe lokacionit:</strong> Ne mbledhim informacione rreth kompjuterit ose pajisjes suaj mobile, si adresa IP.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">3. Si e Përdorim Informacionin Tuaj</h2>
                <p>Ne i përdorim informacionet e mbledhura për qëllime të ndryshme, duke përfshirë:</p>
                <ul className="list-disc list-inside space-y-2 pl-4 mt-2">
                    <li>Për të ofruar, operuar dhe mirëmbajtur Platformën tonë.</li>
                    <li>Për të përmirësuar, personalizuar dhe zgjeruar Platformën tonë.</li>
                    <li>Për të komunikuar me ju për qëllime marketingu dhe promocionale (me pëlqimin tuaj).</li>
                    <li>Për të zbuluar dhe parandaluar mashtrimin.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">4. Ndarja e Informacionit Tuaj</h2>
                <p>Ne nuk e ndajmë informacionin tuaj personal me palë të treta, përveç në rrethana specifike si me pëlqimin tuaj, për të përmbushur kërkesat ligjore, ose me ofruesit tanë të shërbimeve që na ndihmojnë të operojmë.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">5. Të Drejtat Tuaja për Mbrojtjen e të Dhënave</h2>
                <p>Ju keni të drejtë të aksesoni, korrigjoni, ose fshini të dhënat tuaja personale. Për të ushtruar këto të drejta, ju lutemi na kontaktoni në [email protected]</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">8. Kontakt</h2>
                <p>Nëse keni pyetje ose shqetësime në lidhje me këtë Politikë të Privatësisë, ju lutemi na kontaktoni në:<br />
                    <span className="font-semibold">Shigjeta LLC</span><br />
                    Bulevardi Ismail Raka, Kaçanik, Republika e Kosovës<br />
                    Email: [email protected]
                </p>
            </section>
        </div>
    </div>
);

export default PrivacyPolicy;