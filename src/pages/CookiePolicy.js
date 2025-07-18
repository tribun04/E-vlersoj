import React from 'react';

const CookiePolicy = () => (
    <div className="min-h-screen  relative overflow-hidden pt-5 mt-[80px] p-6 sm:p-8 md:p-10 max-w-[1280px] mx-auto text-gray-200 leading-relaxed space-y-6 rounded-2xl shadow-2xl animate-slide-up-fade">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Politika e Cookies</h1>
        <p className="text-lg text-gray-600 mb-8">Data e hyrjes në fuqi: [Data e Sotme]</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">1. Çfarë janë Cookies?</h2>
                <p>Cookies (ose "biskotat") janë skedarë të vegjël teksti që ruhen në shfletuesin ose pajisjen tuaj kur vizitoni një uebfaqe. Ato i mundësojnë platformës sonë e-vleresoj të njohë pajisjen tuaj dhe të mbajë mend informacione rreth preferencave ose veprimeve tuaja të kaluara.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">2. Si i Përdorim Ne Cookies?</h2>
                <p>Ne përdorim cookies për disa arsye:</p>
                <ul className="list-disc list-inside space-y-2 pl-4 mt-2">
                    <li><strong>Cookies Thelbësore:</strong> Të nevojshme për funksionimin e Platformës, si p.sh. për t'ju mbajtur të kyçur.</li>
                    <li><strong>Cookies të Performancës:</strong> Na ndihmojnë të kuptojmë se si vizitorët e përdorin Platformën tonë, duke na lejuar të përmirësojmë shërbimin.</li>
                    <li><strong>Cookies Funksionale:</strong> Mbajnë mend zgjedhjet që bëni (si gjuha) për t'ju ofruar një përvojë më personale.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">3. Menaxhimi i Cookies</h2>
                <p>Ju keni kontroll të plotë mbi cookies. Mund t'i menaxhoni ato përmes cilësimeve të shfletuesit tuaj (browser). Ju lutemi vini re se bllokimi i cookies thelbësore mund të ndikojë në funksionalitetin e uebfaqes.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">4. Na Kontaktoni</h2>
                <p>Nëse keni pyetje rreth përdorimit tonë të cookies, ju lutemi na kontaktoni në:<br />
                    <span className="font-semibold">Shigjeta LLC</span><br />
                    Bulevardi Ismail Raka, Kaçanik, Republika e Kosovës<br />
                    Email: [email protected]
                </p>
            </section>
        </div>
    </div>
);

export default CookiePolicy;