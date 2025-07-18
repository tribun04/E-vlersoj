import React from 'react';

const FAQ = () => (
    <div className="min-h-screen  relative overflow-hidden pt-5 mt-[80px] p-6 sm:p-8 md:p-10 max-w-[1280px] mx-auto text-gray-200 leading-relaxed space-y-6 rounded-2xl shadow-2xl animate-slide-up-fade">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">Pyetjet e Bëra Shpesh (FAQ)</h1>

        <div className="space-y-10">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-emerald-500 pb-2">Për Përdoruesit Personalë</h2>
                <div className="space-y-6">
                    <div className="faq-item">
                        <h3 className="text-xl font-semibold text-gray-800">1. Si mund të shkruaj një vlerësim?</h3>
                        <p className="mt-2 text-gray-700 leading-relaxed">Pasi të jeni kyçur, kërkoni kompaninë dhe në faqen e profilit të saj, do të gjeni një seksion për të shkruar vlerësimin tuaj. Sigurohuni që vlerësimi të jetë i sinqertë dhe të respektojë rregullat tona.</p>
                    </div>
                    <div className="faq-item">
                        <h3 className="text-xl font-semibold text-gray-800">2. Çfarë të bëj nëse shoh një vlerësim të rremë?</h3>
                        <p className="mt-2 text-gray-700 leading-relaxed">Çdo vlerësim ka një buton "Raporto". Klikojeni atë dhe ekipi ynë do ta shqyrtojë raportin dhe do të ndërmarrë veprimet e duhura.</p>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-emerald-500 pb-2">Për Kompanitë</h2>
                <div className="space-y-6">
                    <div className="faq-item">
                        <h3 className="text-xl font-semibold text-gray-800">1. Si mund ta regjistroj kompaninë time?</h3>
                        <p className="mt-2 text-gray-700 leading-relaxed">Vizitoni seksionin "Për Bizneset" dhe ndiqni hapat për të krijuar dhe verifikuar profilin e kompanisë suaj.</p>
                    </div>
                    <div className="faq-item">
                        <h3 className="text-xl font-semibold text-gray-800">2. A mund të fshij një vlerësim negativ?</h3>
                        <p className="mt-2 text-gray-700 leading-relaxed">Jo, kompanitë nuk mund të fshijnë vlerësimet për të ruajtur transparencën. Megjithatë, ju mund të raportoni një vlerësim nëse besoni se ai shkel rregullat tona.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default FAQ;