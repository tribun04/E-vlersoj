import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// --- Komponenti #1: Hero Section (Seksioni Kryesor) ---
// I krijuar për të përputhur me dizajnin tuaj



// --- Komponenti #2: Footer (Fundi i Faqes) ---
// Kodi juaj i integruar dhe i përshtatur
const Footer = () => {
  return (
    <footer className="relative bg-[#1a1a1a] text-white py-12 overflow-hidden">
      {/* 
        Stili për linjat e animuara është vendosur direkt këtu.
        Kjo funksionon në çdo projekt React, pa pasur nevojë për Next.js.
      */}
      <style>{`
        @keyframes flow {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        .line {
          position: absolute;
          width: 200%;
          height: 1px;
          background: rgba(16, 185, 129, 0.1); /* Ndryshuar ngjyra për tu përshtatur me brendin */
          animation: flow 8s linear infinite;
          left: 0;
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      {/* Kontejneri i linjave të animuara */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="line"
            style={{
              top: `${i * 5}%`,
              animationDelay: `${i * 0.25}s`,
            }}
          />
        ))}
      </div>

      {/* Përmbajtja e Footer-it */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Info mbi Kompaninë */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-3xl font-extrabold text-white tracking-tight hover:opacity-90 transition flex items-center gap-2"
            >
              <span>e-vlersoj</span>
            </a>
            <p className="text-gray-400 mt-4">
              Ndërtimi i besimit përmes vlerësimeve transparente dhe autentike.
            </p>
          </div>

          {/* Lidhje të Shpejta */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Lidhje të Shpejta</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-white transition">Rreth Nesh</a></li>
              <li><a href="/HelpCenter" className="text-gray-300 hover:text-white transition">Qendra e Ndihmës</a></li>
              <li><a href="/for-business" className="text-gray-300 hover:text-white transition">Për Biznese</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-white transition">Të Rejat</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition">Kontakti</a></li>
            </ul>
          </div>

          {/* Lidhje Ligjore */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Ligjore</h3>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-gray-300 hover:text-white transition">Kushtet e Shërbimit</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-white transition">Politika e Privatësisë</a></li>
              <li><a href="/cookies" className="text-gray-300 hover:text-white transition">Politika e Cookies</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-white transition">Pyetjet e Shpeshta</a></li>
              <li><a href="/brand" className="text-gray-300 hover:text-white transition">Brendi jonë</a></li>
              <li><a href="/refund" className="text-gray-300 hover:text-white transition">refund</a></li>


            </ul>
          </div>

          {/* Rrjetet Sociale */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Na Ndiqni</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition"><FaFacebookF size={20} /></a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition"><FaTwitter size={20} /></a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition"><FaInstagram size={20} /></a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition"><FaLinkedinIn size={20} /></a>
            </div>
          </div>

        </div>

        {/* Fundi i Footer-it me Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Shigjeta LLC. Të gjitha të drejtat e rezervuara.
          </p>
        </div>
      </div>
    </footer>
  );
};




export default Footer;