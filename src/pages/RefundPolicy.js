import React from 'react';

const RefundPolicy = () => (
    <div className="min-h-screen  relative overflow-hidden pt-5 mt-[80px] p-6 sm:p-8 md:p-10 max-w-[1280px] mx-auto text-gray-200 leading-relaxed space-y-6 rounded-2xl shadow-2xl animate-slide-up-fade">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Politika e Rimbursimit</h1>
        <p className="text-lg text-gray-600 mb-8">Data e hyrjes në fuqi: [Data e Sotme]</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">1. Fushëveprimi i Politikës</h2>
                <p>Kjo Politikë e Rimbursimit zbatohet për shërbimet me pagesë të ofruara nga e-vlersoj për <strong>Përdoruesit e Kompanive</strong> (p.sh., planet e abonimit). Përdorimi i platformës për Përdoruesit Personalë është pa pagesë dhe nuk i nënshtrohet kësaj politike.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">2. Planet e Abonimit</h2>
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">A. Kërkesa për Rimbursim brenda 14 Ditëve</h3>
                <p>Nëse nuk jeni të kënaqur me shërbimin tonë të abonimit, ju keni të drejtë të kërkoni një rimbursim të plotë brenda <strong>14 ditëve kalendarike</strong> nga data fillestare e blerjes së abonimit tuaj të parë. Kjo garanci nuk vlen për rinovimet.</p>

                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">B. Pas Periudhës 14-ditore</h3>
                <p>Pas skadimit të periudhës 14-ditore, pagesat për planet e abonimit <strong>nuk janë të rimbursueshme</strong>. Ju mund ta anuloni abonimin tuaj në çdo kohë, dhe ai do të përfundojë në fund të ciklit aktual të faturimit.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">3. Përjashtimet</h2>
                <p>Një rimbursim nuk do të ofrohet nëse llogaria juaj është pezulluar ose mbyllur për shkak të shkeljes së Kushteve tona të Shërbimit.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">4. Kontakt</h2>
                <p>Për çdo çështje faturimi ose kërkesë për rimbursim, ju lutemi dërgoni një email në <span className="font-semibold">[email protected]</span>.</p>
            </section>
        </div>
    </div>
);

export default RefundPolicy;