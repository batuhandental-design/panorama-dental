import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const languages = [
  { code: "tr", img: "https://flagcdn.com/w160/tr.png", label: "Türkçe" },
  { code: "en", img: "https://flagcdn.com/w160/gb.png", label: "English" },
  { code: "de", img: "https://flagcdn.com/w160/de.png", label: "Deutsch" },
  { code: "ar", img: "https://flagcdn.com/w160/sa.png", label: "العربية" },
  { code: "es", img: "https://flagcdn.com/w160/es.png", label: "Español" },
  { code: "it", img: "https://flagcdn.com/w160/it.png", label: "Italiano" },
  { code: "fr", img: "https://flagcdn.com/w160/fr.png", label: "Français" },
  { code: "ru", img: "https://flagcdn.com/w160/ru.png", label: "Русский" },
];

const hashes = ["#hero", "#about", "#services", "#departments", "#contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { t, lang, setLang } = useLanguage();
  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLangToggle = () => {
    if (!langOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + window.scrollY + 4, right: window.innerWidth - rect.right });
    }
    setLangOpen((v) => !v);
  };

  useEffect(() => {
    if (!langOpen) return;
    const handleScroll = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setMenuPos({ top: rect.bottom + window.scrollY + 4, right: window.innerWidth - rect.right });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [langOpen]);

  const getHref = (hash) => isHome ? hash : `/${hash}`;

  return (
    <nav
      className="text-white z-50 font-inter sticky top-0"
      style={{
        background: "#2c2419",
        boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-1 text-2xl font-bold tracking-tight">
          <img
            src="https://media.base44.com/images/public/69d79ff6631966558dbdfca2/861dea12d_image.png"
            alt="dental logo"
            className="w-14 h-14 object-contain flex-shrink-0"
            style={{ mixBlendMode: 'screen' }}
          />
          <div className="flex flex-col leading-tight">
            <span className="text-primary">PANORAMA</span>
            <span className="text-white text-xl">DENTAL</span>
          </div>
        </a>

        <div
          className="hidden md:flex items-center gap-1"
        >
          {t.nav.map((label, i) =>
            <a
              key={i}
              href={getHref(hashes[i])}
              className="mx-2 px-5 py-2 text-sm font-medium uppercase tracking-wide hover:text-primary transition-colors">
              {label}
            </a>
          )}
          <a
            href={getHref("#contact")}
            className="ml-4 relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 overflow-hidden group"
            style={{ border: '1.5px solid rgba(201,168,124,0.7)', color: '#c9a87c', background: 'rgba(139,104,64,0.12)', backdropFilter: 'blur(8px)', boxShadow: '0 0 12px rgba(201,168,124,0.2), inset 0 1px 0 rgba(255,255,255,0.08)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(139,104,64,0.28)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(201,168,124,0.45), 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = '#c9a87c'; e.currentTarget.style.color = '#e2c48e'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(139,104,64,0.12)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(201,168,124,0.2), inset 0 1px 0 rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(201,168,124,0.7)'; e.currentTarget.style.color = '#c9a87c'; }}>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(201,168,124,0.18) 50%, transparent 60%)' }} />
            <span className="absolute inset-0 rounded-xl animate-ping pointer-events-none" style={{ border: '1px solid rgba(201,168,124,0.3)', animationDuration: '2.2s' }} />
            <Phone className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">{t.freeConsult}</span>
          </a>

          {/* Dil Seçici */}
          <div className="relative ml-2" ref={dropdownRef}>
            <button
              ref={buttonRef}
              onClick={handleLangToggle}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-xs font-medium"
            >
              <img src={currentLang.img} alt={currentLang.label} className="w-5 h-3.5 object-cover rounded-sm" />
              <span className="hidden lg:inline">{currentLang.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div
                className="fixed bg-[#2c2419] border border-white/10 rounded-xl shadow-2xl z-[9999] overflow-hidden min-w-[160px]"
                style={{ top: menuPos.top, right: menuPos.right }}
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs hover:bg-white/10 transition-colors text-left ${lang === l.code ? "bg-white/10 text-[#c9a87c]" : "text-white"}`}
                  >
                    <img src={l.img} alt={l.label} className="w-6 h-4 object-cover rounded-sm flex-shrink-0" />
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open &&
        <div className="md:hidden bg-[#2c2419] border-t border-white/10">
          <div className="px-4 pb-4">
            {t.nav.map((label, i) =>
              <a
                key={i}
                href={getHref(hashes[i])}
                className="block py-3 text-sm font-medium uppercase tracking-wide hover:text-primary transition-colors border-b border-white/5"
                onClick={() => setOpen(false)}>
                {label}
              </a>
            )}
          </div>
          <div className="border-t border-white/10 py-4">
            <LanguageSwitcher />
          </div>
        </div>
      }
    </nav>
  );
}