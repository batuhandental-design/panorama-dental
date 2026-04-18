import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden font-inter">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/HoGvauXdLpY?autoplay=1&mute=1&loop=1&playlist=HoGvauXdLpY&controls=0&rel=0&modestbranding=1&playsinline=1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          sandbox="allow-scripts allow-same-origin allow-presentation allow-autoplay"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Hero Video"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "177.78vh",
            height: "100%",
            minWidth: "100%",
            minHeight: "56.25vw",
            border: "none",
            pointerEvents: "none",
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(44,36,25,0.82) 0%, rgba(44,36,25,0.6) 50%, rgba(74,55,40,0.75) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, rgba(44,36,25,0.9), transparent)' }} />
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#8B6840]/30 backdrop-blur-sm border border-[#c9a87c]/30 text-[#c9a87c] text-xs font-semibold uppercase tracking-[0.3em] px-5 py-2.5 rounded-full mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a87c] animate-pulse"></span>
          {t.heroBadge}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-playfair leading-tight mb-6"
        >
          {t.heroTitle1}{" "}
          <span className="text-[#c9a87c]">{t.heroTitleHighlight}</span>{" "}
          {t.heroTitle2}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.heroDesc}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#services"
            className="px-8 py-4 bg-[#8B6840] text-white font-semibold rounded-xl hover:bg-[#7a5c38] transition-all shadow-2xl shadow-[#8B6840]/40 text-sm uppercase tracking-wider"
          >
            {t.heroCta}
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-[#8B6840]/90 py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="text-white text-sm font-medium inline-flex gap-8">
              {t.marquee.map((item, j) => (
                <span key={j} className={j === t.marquee.length - 1 ? "mr-8" : ""}>{item}</span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}