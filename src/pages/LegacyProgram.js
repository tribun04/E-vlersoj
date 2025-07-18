import React from 'react';

const LegacyProgram = () => (
    <div className="min-h-screen  relative overflow-hidden pt-5 mt-[80px] p-6 sm:p-8 md:p-10 max-w-[1280px] mx-auto text-gray-200 leading-relaxed space-y-6 rounded-2xl shadow-2xl animate-slide-up-fade">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Programi i Trashëgimisë</h1>
        <p className="text-lg text-gray-600 mb-8">Data e hyrjes në fuqi: [Data e Sotme]</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">1. Qëllimi i Programit</h2>
                <p>Programi i Trashëgimisë është krijuar për të ofruar udhëzime për menaxhimin e llogarive të përdoruesve që bëhen joaktivë për një periudhë të gjatë kohe ose në rastin fatkeq të ndarjes nga jeta të një përdoruesi. Ky program synon të respektojë privatësinë e përdoruesit dhe të ofrojë mbështetje për familjarët.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">2. Menaxhimi i Llogarive Joaktive</h2>
                <p>Një llogari konsiderohet "joaktive" pas një periudhe të pandërprerë prej <strong>24 muajsh (2 vite)</strong> pa hyrje. Pas kësaj periudhe, ne rezervojmë të drejtën të dërgojmë një njoftim dhe, nëse nuk ka përgjigje, mund ta deaktivizojmë llogarinë për arsye sigurie.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">3. Menaxhimi i Llogarisë së një Përdoruesi të Ndjerë</h2>
                <p>Në rastin e ndarjes nga jeta, anëtarët e verifikuar të familjes ose përfaqësuesit ligjorë mund të kërkojnë <strong>mbylljen e përhershme</strong> të llogarisë. Për shkaqe privatësie, ne nuk mund të ofrojmë qasje në llogari.</p>
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Si të Bëni një Kërkesë:</h3>
                <p>Për të paraqitur një kërkesë, përfaqësuesi i autorizuar duhet të na kontaktojë në [email protected] dhe të ofrojë dokumentacionin e nevojshëm për verifikim, si certifikatën e vdekjes dhe dëshmi të autoritetit ligjor.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">4. Kontakt</h2>
                <p>Për çdo pyetje ose për të nisur një kërkesë në kuadër të Programit të Trashëgimisë, ju lutemi na kontaktoni në: [email protected]</p>
            </section>
        </div>
    </div>
);

export default LegacyProgram;