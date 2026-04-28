import { useState, useRef, useEffect } from "react";
import { Clock, Phone, MapPin, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const languages = [
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
];

export default function TopBar() {
  const { t, lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, []);

  return (
    <div className="text-white font-inter" style={{ background: "#3d3028" }}>
      {/* Dil seçici şeridi */}
      <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-end border-b border-white/10">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center justify-center gap-2 px-3 py-2 hover:bg-white/10 transition-colors text-white active:bg-white/20"
          >
            <span className="text-2xl">{currentLang.flag}</span>
            <span className="text-sm">{currentLang.label}</span>
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-0 bg-[#2c2419] border border-white/10 rounded-b-lg shadow-2xl z-[9999] overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-3">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setOpen(false); }}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded transition-colors ${lang === l.code ? "bg-white/20" : "bg-white/5 hover:bg-white/10"}`}
                  >
                    <span className="text-xl">{l.flag}</span>
                    <span className="text-xs text-white">{l.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alt bilgi şeridi - sadece desktop */}
      <div
        className="max-w-7xl mx-auto px-4 flex items-center justify-between py-2 text-sm hidden md:flex"
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-400">{t.topBarAvail}</p>
              <p className="text-xs font-medium">{t.topBarClosed}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-400">{t.topBarCall}</p>
              <a href="tel:+905551896062" className="text-xs font-medium hover:text-primary transition-colors">+90 555 189 60 62</a>
            </div>
          </div>
          <a href="#contact" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
            <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-400">İstanbul / Turkey</p>
              <p className="text-xs font-medium">Haliç ve Pendik</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}