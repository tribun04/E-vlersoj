import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

// --- Komponenti #2: Footer (Fundi i Faqes) - Dizajn Kompakt & Premium (Version i Korrigjuar) ---
// Me të gjitha lidhjet ligjore të rivendosura saktë.

const Footer = () => {
  return (
    <footer className="relative bg-[#1a1a1a] text-white pt-20 pb-10 overflow-hidden">
      {/* Stili për efektet vizuale është ruajtur */}
      <style>{`
        @keyframes flow {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        .line {
          position: absolute; width: 200%; height: 1px;
          background: rgba(16, 185, 129, 0.1);
          animation: flow 8s linear infinite;
          left: 0; pointer-events: none; z-index: 0;
        }
        @keyframes subtle-glow-move {
            0% { transform: translate(0, 0); }
            25% { transform: translate(15px, -20px); }
            50% { transform: translate(-10px, 20px); }
            75% { transform: translate(10px, -15px); }
            100% { transform: translate(0, 0); }
        }
        .aurora-glow {
            animation: subtle-glow-move 20s ease-in-out infinite;
        }
      `}</style>

      {/* EFEKTI: Aurora Glow (Drita e Smeraldit) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none z-0 aurora-glow"></div>

      {/* Kontejneri i linjave të animuara */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="line"
            style={{ top: `${i * 5}%`, animationDelay: `${i * 0.25}s` }}
          />
        ))}
      </div>

      {/* Përmbajtja kryesore e Footer-it (e unifikuar) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Rrjeta kryesore me 4 kolona (Logo + Lidhjet) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {/* Kolona 1: Info mbi Kompaninë */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="/"
              className="text-2xl font-extrabold text-white tracking-tight hover:opacity-90 transition-opacity duration-300"
            >
              Platforma e Vlerësimit
            </a>
            <p className="text-gray-400 mt-4 text-base">
              Ndërtimi i besimit përmes vlerësimeve transparente dhe autentike.
            </p>
          </div>

          {/* Kolona 2: Eksploro */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-emerald-400 uppercase tracking-wider">
              Eksploro
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "Rreth Nesh" },
                { href: "/HelpCenter", label: "Qendra e Ndihmës" },
                { href: "/blog", label: "Të Rejat" },
                { href: "/contact", label: "Kontakti" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 block w-fit"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolona 3: Ligjore (ME LIDHJEN E RIVENDOSUR) */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-emerald-400 uppercase tracking-wider">
              Ligjore
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/terms", label: "Kushtet e Shërbimit" },
                { href: "/privacy", label: "Politika e Privatësisë" },
                { href: "/cookies", label: "Politika e Cookies" },
                { href: "/brand", label: "Brendi jonë" },
                { href: "/refund", label: "Politika e Rimbursimit" }, // <--- KËTU ËSHTË RIVENDOSUR
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 block w-fit"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolona 4: Na Gjeni */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-emerald-400 uppercase tracking-wider">
              Na Gjeni
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt
                  className="text-emerald-400 mt-1 flex-shrink-0"
                  size={16}
                />
                <p className="text-gray-300 text-sm">
                  Rr. "Dëshmorët e Kombit",
                  <br />
                  1001, Tiranë
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope
                  className="text-emerald-400 mt-1 flex-shrink-0"
                  size={16}
                />
                <a
                  href="mailto:info@shigjeta.com"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  info@shigjeta.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Fundi i Footer-it: Copyright & Rrjetet Sociale */}
        <div className="mt-16 pt-8 border-t border-gray-800/70 flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Shigjeta LLC. Të gjitha të drejtat e
            rezervuara.
          </p>
          <div className="flex space-x-3">
            {[
              { label: "Facebook", icon: FaFacebookF, href: "#" },
              { label: "Twitter", icon: FaTwitter, href: "#" },
              { label: "Instagram", icon: FaInstagram, href: "#" },
              { label: "LinkedIn", icon: FaLinkedinIn, href: "#" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-gray-400 bg-gray-900/60 hover:text-white hover:bg-emerald-500 transition-all duration-300 w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 hover:-translate-y-1"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
