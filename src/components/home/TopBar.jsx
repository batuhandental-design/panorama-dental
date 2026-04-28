import { useState, useRef, useEffect } from "react";
import { Clock, Phone, MapPin, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

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
      {/* Dil seçici şeridi - her zaman göster */}
      <div
        className="max-w-7xl mx-auto px-4 flex items-center justify-end py-1.5 border-b border-white/10"
      >
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-1.5 md:py-1 rounded-lg hover:bg-white/10 transition-colors text-xs md:text-xs font-medium touch-none active:bg-white/20"
          >
            <img src={currentLang.img} alt={currentLang.label} className="w-5 h-3.5 object-cover rounded-sm" />
            <span className="hidden sm:inline">{currentLang.label}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div className="fixed md:absolute md:right-0 md:top-full md:mt-1 left-0 right-0 md:left-auto bottom-0 md:bottom-auto bg-[#2c2419] border md:border-white/10 rounded-t-xl md:rounded-xl shadow-2xl z-[9999] overflow-y-auto md:overflow-hidden md:min-w-[140px]">
              <div className="grid grid-cols-4 md:flex md:flex-col gap-0 md:gap-0 p-2 md:p-0">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setOpen(false); }}
                    className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-3 md:py-2.5 text-xs hover:bg-white/10 transition-colors text-center md:text-left rounded-lg md:rounded-none ${lang === l.code ? "bg-white/10 text-[#c9a87c]" : "text-white"}`}
                  >
                    <img src={l.img} alt={l.label} className="w-6 h-4 object-cover rounded-sm flex-shrink-0" />
                    <span className="text-xs">{l.label}</span>
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