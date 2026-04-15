import { useLanguage } from "@/lib/LanguageContext";

const languages = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "ar", flag: "🇸🇦", label: "العربية" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "ru", flag: "🇷🇺", label: "Русский" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="w-full bg-[#1e1a14] py-4">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            title={l.label}
            className={`w-12 h-12 rounded-full border-2 text-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              lang === l.code
                ? "border-[#c9a87c] scale-110 shadow-lg shadow-[#c9a87c]/30"
                : "border-white/20 hover:border-white/50"
            }`}
          >
            {l.flag}
          </button>
        ))}
      </div>
    </div>
  );
}