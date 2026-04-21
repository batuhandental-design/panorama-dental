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

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="w-full bg-[#1e1a14] py-8">
      <div className="max-w-6xl mx-auto px-4 flex items-end justify-center gap-8 flex-wrap">
        {languages.map((l, i) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            title={l.label}
            className="flex flex-col items-start focus:outline-none group"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            {/* Direk */}
            <div
              style={{
                width: 4,
                height: 80,
                background: "linear-gradient(to bottom, #c9a87c, #8B6840)",
                borderRadius: 2,
                marginLeft: 1,
                flexShrink: 0,
              }}
            />
            {/* Bayrak */}
            <div
              style={{
                marginTop: -78,
                marginLeft: 5,
                width: 72,
                height: 48,
                overflow: "hidden",
                borderRadius: 2,
                transformOrigin: "left center",
                animation: `wave-flag 2s ease-in-out infinite`,
                animationDelay: `${i * 0.22}s`,
                boxShadow: lang === l.code
                  ? "0 0 0 2px #c9a87c, 0 4px 16px rgba(201,168,124,0.5)"
                  : "0 2px 8px rgba(0,0,0,0.4)",
                transition: "box-shadow 0.2s",
              }}
            >
              <img
                src={l.img}
                alt={l.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes wave-flag {
          0%   { transform: skewY(0deg) scaleX(1); }
          20%  { transform: skewY(2deg) scaleX(0.97); }
          40%  { transform: skewY(-1.5deg) scaleX(1.02); }
          60%  { transform: skewY(2.5deg) scaleX(0.96); }
          80%  { transform: skewY(-1deg) scaleX(1.01); }
          100% { transform: skewY(0deg) scaleX(1); }
        }
      `}</style>
    </div>
  );
}