import { useLanguage } from "@/lib/LanguageContext";

const languages = [
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
    <div className="w-full bg-[#1e1a14] py-5">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-5 flex-wrap">
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            title={l.label}
            className={`w-14 h-14 rounded-full border-2 overflow-hidden transition-all duration-200 hover:scale-110 flex-shrink-0 ${
              lang === l.code
                ? "border-[#c9a87c] scale-110 shadow-lg shadow-[#c9a87c]/40"
                : "border-white/25 hover:border-white/60"
            }`}
          >
            <img
              src={l.img}
              alt={l.label}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}