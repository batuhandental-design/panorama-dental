import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <div id="hero" className="font-inter">
      {/* Main Hero Section with static background */}
      <section
        className="relative py-32 px-4 text-center text-white overflow-hidden"
        style={{ minHeight: "92vh" }}
      >
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1800&q=90"
            alt="Dental clinic"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(28,20,10,0.62)" }} />
          {/* Subtle gold gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 60% 40%, rgba(139,104,64,0.18) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center" style={{ minHeight: "70vh" }}>
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
            <a
              href="https://wa.me/905491240103"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:border-[#c9a87c] hover:text-[#c9a87c] transition-all text-sm uppercase tracking-wider"
            >
              WhatsApp
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-16"
          >
            {[
              { val: "5.000+", label: t.trustBar?.[0] || "Hasta" },
              { val: "98%", label: t.trustBar?.[1] || "Memnuniyet" },
              { val: "12+", label: t.trustBar?.[2] || "Yıl" },
              { val: "50+", label: t.trustBar?.[3] || "Ülke" },
            ].map((s, i) => (
              <div key={i} className="text-center px-4">
                <p className="text-2xl font-bold text-[#c9a87c] font-playfair">{s.val}</p>
                <p className="text-xs text-white/60 uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-[#8B6840]/90 py-3 overflow-hidden">
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
    </div>
  );
}