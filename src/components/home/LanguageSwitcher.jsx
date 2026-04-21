import { useLanguage } from "@/lib/LanguageContext";

const languages = [
  { code: "tr", img: "https://flagcdn.com/w80/tr.png", label: "Türkçe" },
  { code: "en", img: "https://flagcdn.com/w80/gb.png", label: "English" },
  { code: "de", img: "https://flagcdn.com/w80/de.png", label: "Deutsch" },
  { code: "ar", img: "https://flagcdn.com/w80/sa.png", label: "العربية" },
  { code: "es", img: "https://flagcdn.com/w80/es.png", label: "Español" },
  { code: "it", img: "https://flagcdn.com/w80/it.png", label: "Italiano" },
  { code: "fr", img: "https://flagcdn.com/w80/fr.png", label: "Français" },
  { code: "ru", img: "https://flagcdn.com/w80/ru.png", label: "Русский" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="w-full bg-[#1e1a14] py-6">
      <div className="flex flex-col items-center gap-4">
        {languages.map((l, i) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            title={l.label}
            className={`w-14 h-14 rounded-full border-2 overflow-hidden transition-all duration-200 hover:scale-110 flex-shrink-0 ${
              lang === l.code
                ? "border-[#c9a87c] scale-110 shadow-lg shadow-[#c9a87c]/40"
                : "border-white/25 hover:border-white/60"
            }`}
            style={{
              animation: `flag-wave 2.5s ease-in-out infinite`,
              animationDelay: `${i * 0.18}s`,
            }}
          >
            <img
              src={l.img}
              alt={l.label}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <style>{`
        @keyframes flag-wave {
          0%, 100% { transform: translateX(0px); }
          25%       { transform: translateX(6px); }
          75%       { transform: translateX(-6px); }
        }
      `}</style>
    </div>
  );
}