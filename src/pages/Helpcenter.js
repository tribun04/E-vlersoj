"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faQuestionCircle,
  faFileAlt,
  faComments,
  faChevronDown,
  faChevronUp,
  faArrowRight,
  faArrowLeft,
  faUser,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

// --- HelpCenterAL: Versioni Final dhe i Plotë për "e-vlersoj" ---

const HelpCenterAL = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  // --- Të dhëna të plota me përmbajtje të detajuar për çdo artikull ---
  const categories = [
    {
      id: "personal-users",
      title: "Për Përdoruesit Personalë",
      icon: faUser,
      articles: [
        {
          id: "pu-1",
          title: "Si të regjistroheni dhe të konfiguroni profilin tuaj",
          views: 2500,
          featured: true,
          content: (
            <>
              <p className="lead">
                Regjistrimi në e-vlersoj si përdorues personal është hapi i parë
                për t'u bërë pjesë e komunitetit tonë. Ndiqni këto hapa të
                thjeshtë:
              </p>
              <ol>
                <li>
                  <strong>Gjeni Butonin "Regjistrohu":</strong> Në krye të
                  faqes, klikoni butonin "Regjistrohu" ose "Krijo Llogari".
                </li>
                <li>
                  <strong>Zgjidhni "Llogari Personale":</strong> Do t'ju
                  paraqiten dy opsione. Zgjidhni "Jam Përdorues Personal".
                </li>
                <li>
                  <strong>Plotësoni të Dhënat:</strong> Shkruani emrin tuaj,
                  adresën e email-it dhe një fjalëkalim të sigurt. Pranoni
                  kushtet e shërbimit.
                </li>
                <li>
                  <strong>Verifikoni Email-in Tuaj:</strong> Do të merrni një
                  email verifikimi. Klikoni lidhjen në email për të aktivizuar
                  llogarinë tuaj.
                </li>
              </ol>
              <h4 className="mt-6 font-bold">Konfigurimi i Profilit Tuaj</h4>
              <p>
                Pasi të jeni regjistruar, shkoni te "Profili im" për të shtuar
                një foto profili dhe për të plotësuar informacione të tjera që
                dëshironi të ndani me komunitetin.
              </p>
            </>
          ),
        },
        {
          id: "pu-2",
          title: "Udhëzues i plotë: Si të shkruani vlerësimin tuaj të parë",
          views: 3150,
          featured: true,
          content: (
            <>
              <p className="lead">
                Vlerësimi juaj ka rëndësi! Ai ndihmon përdoruesit e tjerë të
                marrin vendime më të mira dhe bizneset të përmirësohen. Ja si
                mund të shkruani një vlerësim efektiv:
              </p>
              <ol>
                <li>
                  <strong>Gjeni Produktin ose Kompaninë:</strong> Përdorni
                  shiritin e kërkimit për të gjetur produktin ose kompaninë që
                  dëshironi të vlerësoni.
                </li>
                <li>
                  <strong>Klikoni "Shkruaj Vlerësim":</strong> Në faqen e
                  profilit të produktit/kompanisë, do të gjeni një buton të
                  qartë për të lënë vlerësimin tuaj.
                </li>
                <li>
                  <strong>Jepni një Vlerësim të Përgjithshëm me Yje:</strong>{" "}
                  Zgjidhni nga 1 deri në 5 yje për të pasqyruar përvojën tuaj të
                  përgjithshme.
                </li>
                <li>
                  <strong>Vlerësoni Kriteret Specifike:</strong> Kjo është pjesa
                  më e rëndësishme. Jepni vlerësime të veçanta për{" "}
                  <strong>Cilësinë</strong>, <strong>Shpejtësinë</strong> (e
                  dërgesës/shërbimit), dhe <strong>Çmimin</strong> (vlerën për
                  paratë).
                </li>
                <li>
                  <strong>Shkruani Përvojën Tuaj:</strong> Jepni një titull
                  vlerësimit tuaj dhe më pas përshkruani përvojën tuaj.
                  Mundohuni të jeni specifik dhe të sinqertë. Çfarë ju pëlqeu?
                  Çfarë mund të përmirësohej?
                </li>
                <li>
                  <strong>Postoni Vlerësimin:</strong> Pasi të jeni të kënaqur
                  me atë që keni shkruar, klikoni "Posto". Vlerësimi juaj do të
                  jetë i dukshëm për të gjithë komunitetin!
                </li>
              </ol>
            </>
          ),
        },
        {
          id: "pu-3",
          title:
            "Kuptimi i kritereve të vlerësimit (Cilësia, Shpejtësia, Çmimi)",
          views: 2843,
          featured: true,
          content: (
            <>
              <p className="lead">
                Për të siguruar vlerësime të dobishme dhe të strukturuara, ne
                përdorim tre kritere kryesore. Kuptimi i tyre ju ndihmon të
                jepni një feedback më të saktë.
              </p>
              <h4>1. Cilësia</h4>
              <p>
                Ky kriter i referohet cilësisë së vetë produktit ose shërbimit.
                Kur vlerësoni cilësinë, mendoni për këto pyetje:
              </p>
              <ul>
                <li>A ishin materialet e produktit të mira?</li>
                <li>A funksionoi produkti siç pritej?</li>
                <li>
                  A i përmbushi produkti pritshmëritë tuaja bazuar në
                  përshkrimin e tij?
                </li>
              </ul>
              <h4>2. Shpejtësia</h4>
              <p>
                Ky kriter zakonisht i referohet shpejtësisë së shërbimit ose
                dërgesës. Mendoni për:
              </p>
              <ul>
                <li>Sa shpejt u përpunua porosia juaj?</li>
                <li>A mbërriti produkti brenda afatit kohor të premtuar?</li>
                <li>A ishte komunikimi nga kompania i shpejtë dhe efikas?</li>
              </ul>
              <h4>3. Çmimi</h4>
              <p>
                Ky kriter nuk do të thotë thjesht nëse diçka ishte e lirë apo e
                shtrenjtë. Ai i referohet <strong>vlerës për paratë</strong>.
                Mendoni:
              </p>
              <ul>
                <li>A ishte çmimi i drejtë për cilësinë që morët?</li>
                <li>A do ta konsideronit një blerje të mirë?</li>
                <li>Si krahasohet çmimi me alternativa të ngjashme në treg?</li>
              </ul>
            </>
          ),
        },
        {
          id: "pu-4",
          title: "Modifikimi ose fshirja e një vlerësimi të postuar",
          views: 980,
          featured: false,
        },
      ],
    },
    {
      id: "company-users",
      title: "Për Bizneset",
      icon: faBuilding,
      articles: [
        {
          id: "cu-1",
          title: "Si të regjistroni dhe verifikoni profilin e kompanisë suaj",
          views: 1987,
          featured: true,
          content: (
            <>
              <p className="lead">
                Prania e biznesit tuaj në e-vlersoj fillon me një profil të
                verifikuar. Kjo ndërton besim te klientët potencialë. Ndiqni
                këto hapa:
              </p>
              <ol>
                <li>
                  <strong>Zgjidhni Llogarinë e Biznesit:</strong> Gjatë
                  regjistrimit, zgjidhni opsionin "Jam Biznes".
                </li>
                <li>
                  <strong>Plotësoni Informacionin e Kompanisë:</strong> Do t'ju
                  kërkohet të jepni informacione zyrtare si emri i kompanisë,
                  NIPT-i (numri i identifikimit për personin e tatueshëm),
                  adresa, dhe të ngarkoni logon tuaj.
                </li>
                <li>
                  <strong>Procesi i Verifikimit:</strong> Pasi të keni dorëzuar
                  informacionin, ekipi ynë do ta shqyrtojë atë për të konfirmuar
                  legjitimitetin e biznesit tuaj. Ky proces zakonisht zgjat
                  24-48 orë. Verifikimi është thelbësor për të fituar besimin e
                  përdoruesve.
                </li>
                <li>
                  <strong>Zgjidhni një Plan:</strong> Pasi të verifikoheni, mund
                  të zgjidhni një nga planet tona për biznese, të cilat ofrojnë
                  veçori shtesë si analitika të avancuara dhe vegla (widgets)
                  për faqen tuaj.
                </li>
              </ol>
            </>
          ),
        },
        {
          id: "cu-2",
          title: "Shtimi dhe menaxhimi i produkteve tuaja në platformë",
          views: 1560,
          featured: true,
          content: (
            <>
              <p className="lead">
                Produktet tuaja janë zemra e profilit tuaj. Ja si t'i menaxhoni
                ato nga paneli i kontrollit i biznesit tuaj:
              </p>
              <h4>Shtimi i një Produkti të Ri</h4>
              <ol>
                <li>Navigoni te seksioni "Produktet" në panelin tuaj.</li>
                <li>Klikoni butonin "Shto Produkt të Ri".</li>
                <li>
                  Plotësoni të gjitha fushat e kërkuara: emri i produktit, një
                  përshkrim i detajuar, kategori, çmimi, dhe ngarkoni foto me
                  cilësi të lartë.
                </li>
                <li>
                  Klikoni "Ruaj" për ta bërë produktin të dukshëm në profilin
                  tuaj.
                </li>
              </ol>
              <h4 className="mt-6 font-bold">Modifikimi ose Fshirja</h4>
              <p>
                Në listën e produkteve tuaja, do të gjeni opsione për të
                "Modifikuar" informacionin e një produkti ekzistues ose për ta
                "Fshirë" atë plotësisht nga platforma.
              </p>
            </>
          ),
        },
        {
          id: "cu-3",
          title: "Si t'i përgjigjeni një vlerësimi nga një klient",
          views: 1120,
          featured: true,
          content: (
            <>
              <p className="lead">
                Përgjigja ndaj vlerësimeve është një nga mjetet më të fuqishme
                për të menaxhuar reputacionin tuaj online. Ajo tregon se ju
                dëgjoni dhe vlerësoni feedback-un e klientëve.
              </p>
              <h4>Përgjigja ndaj një Vlerësimi Pozitiv</h4>
              <ul>
                <li>
                  <strong>Falënderoni Klientin:</strong> Një "faleminderit" i
                  thjeshtë bën një diferencë të madhe. Përmendni emrin e tyre
                  për një prekje personale.
                </li>
                <li>
                  <strong>Përmendni Diçka Specifike:</strong> Referojuni diçkaje
                  pozitive që ata përmendën në vlerësimin e tyre.
                </li>
              </ul>
              <h4 className="mt-6 font-bold">
                Përgjigja ndaj një Vlerësimi Negativ (Më e Rëndësishmja!)
              </h4>
              <ol>
                <li>
                  <strong>Përgjigjuni Shpejt dhe Publikisht:</strong> Mos e
                  injoroni. Një përgjigje publike tregon transparencë.
                </li>
                <li>
                  <strong>Kërkoni Falje dhe Tregoni Empati:</strong> Edhe nëse
                  nuk jeni dakord, kërkoni falje për përvojën e tyre negative.
                  P.sh., "Na vjen keq që dëgjojmë se nuk keni qenë i kënaqur."
                </li>
                <li>
                  <strong>Mos u Bëni Defensivë:</strong> Asnjëherë mos
                  argumentoni ose fajësoni klientin.
                </li>
                <li>
                  <strong>Ofroni një Zgjidhje:</strong> Ftojeni klientin të
                  diskutojë çështjen privatisht për të gjetur një zgjidhje.
                  P.sh., "Ju lutemi na kontaktoni në email@biznesi.com që ta
                  zgjidhim këtë problem."
                </li>
              </ol>
            </>
          ),
        },
        {
          id: "cu-4",
          title: "Përdorimi i panelit të analitikës për të rritur biznesin",
          views: 855,
          featured: false,
        },
      ],
    },
    {
      id: "faq",
      title: "Pyetje të Shpeshta (FAQ)",
      icon: faQuestionCircle,
      faqItems: [
        {
          id: "faq-1",
          question:
            "A është falas përdorimi i e-vlersoj për përdoruesit personalë?",
          answer:
            "Po, absolutisht. Krijimi i një llogarie, shfletimi i kompanive dhe produkteve, si dhe lënia e vlerësimeve është plotësisht falas për përdoruesit personalë.",
        },
        {
          id: "faq-2",
          question: 'Si vlerësohet "Shpejtësia" dhe "Çmimi"?',
          answer:
            'Kriteri "Shpejtësia" i referohet shpejtësisë së dërgesës, ndërsa "Çmimi" i referohet vlerës që keni marrë për paratë tuaja. Ju i vlerësoni këto bazuar në përvojën tuaj personale me produktin dhe shërbimin e ofruar.',
        },
        {
          id: "faq-3",
          question: "Unë jam biznes. A mund të fshij një vlerësim negativ?",
          answer:
            "Jo. Për të ruajtur transparencën, vlerësimet nuk mund të fshihen. Ne ju inkurajojmë fuqimisht t'i përgjigjeni publikisht vlerësimit për të treguar kujdesin ndaj klientit dhe për të adresuar problemin.",
        },
        {
          id: "faq-4",
          question: "Çfarë ndodh nëse një vlerësim shkel rregullat?",
          answer:
            "Të gjithë, si përdoruesit ashtu edhe bizneset, mund të raportojnë një vlerësim që besojnë se shkel rregullat tona (p.sh., gjuhë ofenduese, spam). Ekipi ynë do ta shqyrtojë atë me përparësi.",
        },
      ],
    },
  ];

  const popularArticles = categories
    .filter((c) => c.articles)
    .flatMap((category) =>
      category.articles.map((a) => ({ ...a, categoryTitle: category.title }))
    )
    .filter((article) => article.featured)
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);

  const filteredCategories = categories
    .map((category) => {
      if (category.id === "faq") {
        return {
          ...category,
          faqItems: category.faqItems?.filter(
            (faq) =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        };
      }
      return {
        ...category,
        articles: category.articles?.filter((article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      };
    })
    .filter(
      (category) =>
        category.articles?.length > 0 || category.faqItems?.length > 0
    );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
      <div className="bg-white dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              Qendra e Ndihmës e-vlersoj
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Gjeni përgjigje, udhëzues dhe zgjidhje për çdo pyetje rreth
              vlerësimit të produkteve dhe menaxhimit të biznesit tuaj.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-gray-400 dark:text-gray-500"
                />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#00B67A] focus:border-[#00B67A] dark:focus:ring-[#00e096] dark:focus:border-[#00e096] transition-all duration-300"
                placeholder="Kërko si 'si të vlerësosh' ose 'shto produkt'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-12">
        {selectedArticle ? (
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-sm text-[#00B67A] dark:text-[#00e096] mb-6 hover:underline flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Kthehu te Qendra e Ndihmës
            </button>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {selectedArticle.title}
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
              {selectedArticle.content ? (
                selectedArticle.content
              ) : (
                <p>Përmbajtja për këtë artikull po përgatitet.</p>
              )}
            </div>
          </div>
        ) : (
          <>
            {searchQuery === "" && (
              <section className="mb-16">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Artikujt Më Popullorë
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularArticles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-[#00B67A]/50 dark:hover:border-[#00e096]/50 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-medium text-[#00B67A] dark:text-[#00e096] bg-[#00B67A]/10 dark:bg-[#00B67A]/20 px-2 py-1 rounded-full">
                          {article.categoryTitle}
                        </span>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {article.views.toLocaleString()} shikime
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        {article.title}
                      </h3>
                      <span className="text-gray-600 dark:text-gray-300 group-hover:text-[#00B67A] dark:group-hover:text-[#00e096] font-medium inline-flex items-center transition-colors duration-300">
                        Lexo më shumë{" "}
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="ml-2 text-sm transform group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SEKSIONI I RIVENDOSUR: Shfletimi i Kategorive */}
            <section className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                {searchQuery
                  ? "Rezultatet e Kërkimit"
                  : "Shfleto sipas Kategorisë"}
              </h2>
              <div className="space-y-4">
                {filteredCategories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300 hover:border-[#00B67A]/50 dark:hover:border-[#00e096]/50"
                  >
                    <button
                      className="w-full flex items-center justify-between p-6 text-left"
                      onClick={() =>
                        setActiveCategory(
                          activeCategory === category.id ? null : category.id
                        )
                      }
                    >
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={category.icon}
                          className="text-[#00B67A] dark:text-[#00e096] mr-4 text-xl w-6 text-center"
                        />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                          {category.title}
                        </h3>
                      </div>
                      <FontAwesomeIcon
                        icon={
                          activeCategory === category.id
                            ? faChevronUp
                            : faChevronDown
                        }
                        className="text-gray-500 dark:text-gray-400 transition-transform duration-300"
                      />
                    </button>
                    <div
                      className={`transition-all duration-500 ease-in-out ${
                        activeCategory === category.id
                          ? "max-h-[1500px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
                        {category.id === "faq" ? (
                          <ul className="space-y-2">
                            {category.faqItems.map((faq) => (
                              <li
                                key={faq.id}
                                className="border-b border-gray-200 dark:border-gray-700 last:border-0"
                              >
                                <button
                                  className="w-full flex justify-between items-center text-left py-3"
                                  onClick={() =>
                                    setActiveFaq(
                                      activeFaq === faq.id ? null : faq.id
                                    )
                                  }
                                >
                                  <span className="font-medium text-gray-700 dark:text-gray-200">
                                    {faq.question}
                                  </span>
                                  <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className={`text-gray-400 transition-transform duration-300 ${
                                      activeFaq === faq.id
                                        ? "transform rotate-180"
                                        : ""
                                    }`}
                                  />
                                </button>
                                <div
                                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    activeFaq === faq.id
                                      ? "max-h-96"
                                      : "max-h-0"
                                  }`}
                                >
                                  <p className="pt-1 pb-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {faq.answer}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="space-y-3">
                            {category.articles.map((article) => (
                              <li key={article.id}>
                                <button
                                  onClick={() => setSelectedArticle(article)}
                                  className="w-full text-left flex justify-between items-center py-2 text-gray-700 dark:text-gray-300 hover:text-[#00B67A] dark:hover:text-[#00e096] transition-colors duration-300 group"
                                >
                                  <span className="flex items-center">
                                    <FontAwesomeIcon
                                      icon={faFileAlt}
                                      className="mr-3 text-gray-400 dark:text-gray-500"
                                    />
                                    {article.title}
                                  </span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SEKSIONI I RIVENDOSUR: "Nuk e gjetët përgjigjen?" */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
                Nuk e gjetët përgjigjen?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:border-[#00B67A]/50 dark:hover:border-[#00e096]/50 hover:-translate-y-1 transition-all duration-300">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#00B67A]/10 text-[#00B67A] dark:bg-[#00B67A]/20 dark:text-[#00e096] mb-4">
                    <FontAwesomeIcon icon={faComments} className="text-xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Kontakto Mbështetjen
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    Ekipi ynë është i gatshëm t'ju ndihmojë.
                  </p>
                  <a
                    href="/contact"
                    className="inline-block bg-[#00B67A] text-white font-semibold px-5 py-2 rounded-lg hover:bg-[#008a5c] dark:hover:bg-[#00a36e] transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Na Kontaktoni
                  </a>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:border-[#00B67A]/50 dark:hover:border-[#00e096]/50 hover:-translate-y-1 transition-all duration-300">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#00B67A]/10 text-[#00B67A] dark:bg-[#00B67A]/20 dark:text-[#00e096] mb-4">
                    <FontAwesomeIcon icon={faBuilding} className="text-xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Jeni Biznes?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    Zbuloni planet dhe veglat tona për biznesin tuaj.
                  </p>
                  <a
                    href="/business"
                    className="inline-block bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold px-5 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Plani Për Biznese
                  </a>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default HelpCenterAL;
