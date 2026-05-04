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
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { t, lang, setLang } = useLanguage();
  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLangToggle = () => setLangOpen((v) => !v);
  const getHref = (hash) => isHome ? hash : `/${hash}`;

  const handleContactClick = (e) => {
    if (isHome) {
      e.preventDefault();
      const el = document.querySelector("#contact-form");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="text-white font-inter"
      style={{
        zIndex: 60,
        background: scrolled ? "rgba(20,15,10,0.55)" : "#2c2419",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.35)" : "0 2px 12px rgba(0,0,0,0.3)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "background 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-1 text-2xl font-bold tracking-tight">
          <div style={{ backgroundColor: "#8a8780", borderRadius: "6px", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <img
              src="https://media.base44.com/images/public/69d79ff6631966558dbdfca2/861dea12d_image.png"
              alt="dental logo"
              style={{ width: 52, height: 52, objectFit: "contain" }}
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-primary">PANORAMA</span>
            <span className="text-white text-xl">DENTAL</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {t.nav.map((label, i) => (
            <a
              key={i}
              href={getHref(hashes[i])}
              className="mx-1 px-2 md:px-3 lg:px-5 py-2 text-xs md:text-xs lg:text-sm font-medium uppercase tracking-wide hover:text-primary transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href={getHref("#contact")}
            onClick={handleContactClick}
            className="ml-1 relative flex items-center gap-1 px-3 md:px-4 lg:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 group"
            style={{ background: "#c9a87c", color: "#2c2419" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#e2c48e";
              e.currentTarget.style.boxShadow = "0 0 24px rgba(201,168,124,0.8), 0 4px 16px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#c9a87c";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span
              className="absolute inset-0 rounded-full bg-[#c9a87c] opacity-50 animate-ping pointer-events-none"
              style={{ animationDuration: "2s" }}
            />
            <Phone className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">{t.freeConsult}</span>
          </a>

          {/* Dil Seçici */}
          <div className="relative ml-2" ref={dropdownRef}>
            <button
              onClick={handleLangToggle}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-xs font-medium"
            >
              <img src={currentLang.img} alt={currentLang.label} className="w-5 h-3.5 object-cover rounded-sm" />
              <span className="hidden lg:inline">{currentLang.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-[#2c2419] border border-white/10 rounded-xl shadow-2xl z-[9999] overflow-hidden min-w-[160px]">
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

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#2c2419] border-t border-white/10">
          <div className="px-4 pb-4">
            {t.nav.map((label, i) => (
              <a
                key={i}
                href={getHref(hashes[i])}
                className="block py-3 text-sm font-medium uppercase tracking-wide hover:text-primary transition-colors border-b border-white/5"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="border-t border-white/10 py-4">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}