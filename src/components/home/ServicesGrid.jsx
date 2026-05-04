import { motion } from "framer-motion";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";

const slugs = [
  "dis-implanti",
  "hollywood-gulusu",
  "dis-beyazlatma",
  "zirkonyum-kaplama",
  "kemik-grefti",
  "dis-teli-ortodonti",
];

const serviceImages = [
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/b04473af0_generated_image.png",
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/ec0f435c4_generated_image.png",
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/3be0433ed_generated_image.png",
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/810aaf5da_generated_image.png",
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/09ce4742f_generated_image.png",
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/699e33211_generated_image.png",
];

// Her kart için dalga renk tonu varyasyonları (kumsal teması)
const waveColors = [
  { base: "rgba(201,168,124,0.18)", foam: "rgba(255,248,235,0.55)" },
  { base: "rgba(180,140,90,0.15)",  foam: "rgba(255,245,225,0.50)" },
  { base: "rgba(210,175,130,0.20)", foam: "rgba(255,250,240,0.60)" },
  { base: "rgba(165,128,80,0.17)",  foam: "rgba(255,246,228,0.52)" },
  { base: "rgba(195,160,110,0.19)", foam: "rgba(255,249,235,0.55)" },
  { base: "rgba(185,150,100,0.16)", foam: "rgba(255,247,230,0.50)" },
];

function WaveBackground({ index }) {
  const delay = index * 0.5; // her kart farklı offset
  const { base, foam } = waveColors[index] || waveColors[0];
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
      {/* Kum zemini */}
      <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(201,168,124,0.08) 100%)" }} />
      {/* Dalga 1 - ana */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        style={{ animationDelay: `${delay}s` }}
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        height="60"
      >
        <path
          fill={base}
          style={{
            animation: `waveSurf 3s ease-in-out infinite`,
            animationDelay: `${delay}s`,
            transformOrigin: "center bottom",
          }}
          d="M0,30 C50,10 100,50 150,30 C200,10 250,50 300,30 C350,10 380,45 400,30 L400,60 L0,60 Z"
        />
      </svg>
      {/* Dalga 2 - köpük */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 400 40"
        preserveAspectRatio="none"
        height="40"
      >
        <path
          fill={foam}
          style={{
            animation: `waveSurf 3s ease-in-out infinite`,
            animationDelay: `${delay + 0.4}s`,
            transformOrigin: "center bottom",
          }}
          d="M0,20 C60,5 120,35 180,18 C240,2 300,38 360,20 C375,15 390,25 400,20 L400,40 L0,40 Z"
        />
      </svg>
      {/* Küçük köpük kabarcıkları */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 400 20"
        preserveAspectRatio="none"
        height="20"
      >
        <path
          fill="rgba(255,255,255,0.35)"
          style={{
            animation: `waveSurf 3s ease-in-out infinite`,
            animationDelay: `${delay + 0.8}s`,
            transformOrigin: "center bottom",
          }}
          d="M0,10 C40,2 80,18 120,10 C160,2 200,18 240,10 C280,2 320,18 360,10 C375,6 390,14 400,10 L400,20 L0,20 Z"
        />
      </svg>
    </div>
  );
}

const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

function TiltImage({ src, alt, delay }) {
  const ref = React.useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 25;
    const rotateY = (x / rect.width) * 25;
    el.style.transform = `perspective(400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.18)`;
    el.style.filter = `drop-shadow(0 8px 24px rgba(139,104,64,0.55)) brightness(1.12)`;
  };

  const handleMouseLeave = (e) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(400px) rotateX(0deg) rotateY(0deg) scale(1)`;
    el.style.filter = `drop-shadow(0 4px 12px rgba(0,0,0,0.15))`;
  };

  return (
    <div className="flex items-center justify-center mb-5 h-24 overflow-visible" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.img
        ref={ref}
        src={src}
        alt={alt}
        variants={floatVariants}
        animate="animate"
        transition={{ delay }}
        className="w-20 h-20 object-contain"
        style={{
          mixBlendMode: "multiply",
          transition: "transform 0.15s ease, filter 0.15s ease",
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
          willChange: "transform",
        }}
      />
    </div>
  );
}

export default function ServicesGrid() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-[#f7f3ef] font-inter" id="services">
      <style>{`
        @keyframes waveSurf {
          0%   { transform: translateX(0) scaleY(1); }
          25%  { transform: translateX(-8%) scaleY(1.15); }
          50%  { transform: translateX(6%) scaleY(0.9); }
          75%  { transform: translateX(-4%) scaleY(1.1); }
          100% { transform: translateX(0) scaleY(1); }
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">{t.servicesLabel}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2419] font-playfair">
            {t.servicesTitle}
          </h2>
          <p className="text-[#6b5e52] mt-4 max-w-xl mx-auto">
            {t.servicesDesc}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <Link
                to={`/tedavi/${slugs[i]}`}
                className="relative bg-gradient-to-br from-[#f7f3ef] to-[#ede8e0] border border-[#d4c9bc] rounded-2xl p-8 text-center hover:border-[#8B6840]/40 hover:shadow-md transition-all duration-300 h-full flex flex-col cursor-pointer block overflow-hidden"
              >
                <WaveBackground index={i} />
                <h3 className="relative z-10 text-xl font-bold text-[#2d2419] mb-3 font-playfair">{service.title}</h3>
                {/* 3D tilt image */}
                <TiltImage src={serviceImages[i]} alt={service.title} delay={i * 0.5} />
                <p className="relative z-10 text-[#6b5e52] text-sm leading-relaxed flex-grow mb-5">{service.desc}</p>
                <span className="relative z-10 inline-block px-5 py-2 bg-[#8B6840]/10 text-[#8B6840] rounded-lg font-semibold text-sm uppercase tracking-wider group-hover:bg-[#8B6840] group-hover:text-white transition-all">
                  {t.exploreBtn}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}