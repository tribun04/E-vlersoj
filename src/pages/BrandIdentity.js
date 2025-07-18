import React from 'react';

const BrandIdentity = () => (
    <div className="min-h-screen  relative overflow-hidden pt-5 mt-[80px] p-6 sm:p-8 md:p-10 max-w-[1280px] mx-auto text-gray-200 leading-relaxed space-y-6 rounded-2xl shadow-2xl animate-slide-up-fade">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Identiteti i Brendit</h1>
        <p className="text-lg text-gray-600 mb-8">Udhëzime për përdorimin e aseteve të markës e-vlersoj.</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Misioni i Brendit Tonë</h2>
                <p>e-vlersoj është ndërtuar mbi themelet e besimit dhe transparencës. Identiteti ynë vizual pasqyron këto vlera. Ju lutemi respektoni këto udhëzime kur përdorni asetet tona të brendit.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Logoja Jonë</h2>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                        <h4 className="font-bold text-emerald-700 mb-2">PO (Bëje kështu):</h4>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Ruani hapësirën e lirë rreth logos.</li>
                            <li>Përdorni versionin me ngjyra në sfonde të çelëta.</li>
                            <li>Përdorni versionin e bardhë në sfonde të errëta.</li>
                        </ul>
                    </div>
                    <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                        <h4 className="font-bold text-red-700 mb-2">JO (Mos e bëj kështu):</h4>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Mos e shtrembëroni ose rrotulloni logon.</li>
                            <li>Mos ndryshoni ngjyrat e logos.</li>
                            <li>Mos shtoni hije ose efekte të tjera.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Paleta e Ngjyrave</h2>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="h-24 w-full rounded-lg bg-emerald-500"></div>
                        <p className="mt-2 font-semibold">Gjelbër Primare</p>
                        <p className="text-sm text-gray-500">#10B981</p>
                    </div>
                    <div className="text-center">
                        <div className="h-24 w-full rounded-lg bg-gray-800"></div>
                        <p className="mt-2 font-semibold">Tekst i Errët</p>
                        <p className="text-sm text-gray-500">#1F2937</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Përdorimi i Emrit</h2>
                <p>Kur i referoheni platformës sonë në tekst, ju lutemi përdorni: <strong>e-vlersoj</strong> (me 'e' të vogël, pa hapësirë).</p>
            </section>
        </div>
    </div>
);

export default BrandIdentity;