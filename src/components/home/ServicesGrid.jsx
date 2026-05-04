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

// Her kart için farklı dalga animasyon gecikmesi
const waveDelays = [0, 0.5, 1.0, 1.5, 0.8, 0.3];

// Her kart için hafif farklı deniz renk tonu
const seaColors = [
  { sky1: "#a8d8ea", sky2: "#7ec8e3", sea1: "#2e86ab", sea2: "#1b6b8a", sea3: "#0d4f6b" },
  { sky1: "#b8e0f0", sky2: "#8ecfe8", sea1: "#3494b8", sea2: "#1f7a99", sea3: "#0f5a7a" },
  { sky1: "#9ecfe0", sky2: "#6abfd8", sea1: "#267a9e", sea2: "#155f80", sea3: "#094665" },
  { sky1: "#acdcea", sky2: "#7dcde4", sea1: "#2d84a8", sea2: "#1a698a", sea3: "#0c4f6a" },
  { sky1: "#b4dff0", sky2: "#85ccdf", sea1: "#318db5", sea2: "#1c7295", sea3: "#0e5576" },
  { sky1: "#a2d5e8", sky2: "#74c5dc", sea1: "#2b80a5", sea2: "#186685", sea3: "#0b4c68" },
];

function WaveBackground({ index }) {
  const d = waveDelays[index] || 0;
  const c = seaColors[index] || seaColors[0];
  const waveId = `wave-grad-${index}`;

  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`sky-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c.sky1} />
            <stop offset="100%" stopColor={c.sky2} />
          </linearGradient>
          <linearGradient id={`sea-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c.sea1} />
            <stop offset="60%" stopColor={c.sea2} />
            <stop offset="100%" stopColor={c.sea3} />
          </linearGradient>
          <linearGradient id={`sand-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8c98a" />
            <stop offset="40%" stopColor="#d4a85a" />
            <stop offset="100%" stopColor="#b8903a" />
          </linearGradient>
        </defs>

        {/* Gökyüzü */}
        <rect width="400" height="300" fill={`url(#sky-${index})`} />

        {/* Ufuk çizgisi - hafif parlak */}
        <rect x="0" y="112" width="400" height="3" fill="rgba(255,255,255,0.25)" />

        {/* Deniz katmanı */}
        <rect x="0" y="115" width="400" height="115" fill={`url(#sea-${index})`} />

        {/* Güneş yansıması */}
        <ellipse cx="200" cy="115" rx="60" ry="6" fill="rgba(255,255,200,0.18)" />

        {/* Dalga 1 - derin arka plan */}
        <path
          fill="rgba(255,255,255,0.08)"
          style={{ animation: `waveSurf 3s ease-in-out infinite`, animationDelay: `${d}s` }}
          d="M0,135 C50,120 100,148 150,133 C200,118 260,150 320,132 C360,120 385,140 400,132 L400,115 L0,115 Z"
        />

        {/* Dalga 2 */}
        <path
          fill="rgba(255,255,255,0.12)"
          style={{ animation: `waveSurf 3s ease-in-out infinite`, animationDelay: `${d + 0.3}s` }}
          d="M0,150 C40,136 90,162 140,148 C190,134 240,158 300,144 C345,133 375,152 400,145 L400,228 L0,228 Z"
        />

        {/* Dalga 3 - kumla buluşan ana dalga */}
        <path
          fill="rgba(120,200,230,0.55)"
          style={{ animation: `waveSurf 3s ease-in-out infinite`, animationDelay: `${d + 0.6}s` }}
          d="M0,200 C55,184 110,214 165,200 C220,186 275,212 330,198 C363,190 385,205 400,200 L400,230 L0,230 Z"
        />

        {/* Köpük şeridi - deniz-kum sınırı */}
        <path
          fill="rgba(255,255,255,0.75)"
          style={{ animation: `waveSurf 3s ease-in-out infinite`, animationDelay: `${d + 0.9}s` }}
          d="M0,222 C45,214 95,230 145,222 C195,214 250,228 305,220 C345,214 375,224 400,220 L400,232 L0,232 Z"
        />

        {/* İnce köpük damlacıkları */}
        <path
          fill="rgba(255,255,255,0.45)"
          style={{ animation: `waveSurf 3s ease-in-out infinite`, animationDelay: `${d + 1.2}s` }}
          d="M0,228 C30,222 70,234 110,228 C150,222 195,233 235,227 C275,221 325,232 370,226 C385,224 395,229 400,227 L400,235 L0,235 Z"
        />

        {/* Kum */}
        <rect x="0" y="232" width="400" height="68" fill={`url(#sand-${index})`} />

        {/* Kum dokusu - ışık gölge */}
        <ellipse cx="80" cy="255" rx="55" ry="8" fill="rgba(255,220,150,0.25)" />
        <ellipse cx="280" cy="262" rx="70" ry="7" fill="rgba(255,220,150,0.20)" />
        <ellipse cx="160" cy="278" rx="45" ry="6" fill="rgba(180,130,60,0.20)" />

        {/* Kum üzerinde su izi */}
        <path
          fill="rgba(120,200,230,0.22)"
          style={{ animation: `waveSurf 3s ease-in-out infinite`, animationDelay: `${d + 1.5}s` }}
          d="M0,236 C60,230 130,242 200,236 C270,230 340,240 400,235 L400,248 L0,248 Z"
        />

        {/* Hafif ışık yansıması denizde */}
        <path
          fill="rgba(255,255,255,0.06)"
          style={{ animation: `shimmer 3s ease-in-out infinite`, animationDelay: `${d + 0.2}s` }}
          d="M50,130 L80,125 L85,132 L55,137 Z"
        />
        <path
          fill="rgba(255,255,255,0.06)"
          style={{ animation: `shimmer 3s ease-in-out infinite`, animationDelay: `${d + 1.1}s` }}
          d="M200,155 L240,148 L244,157 L204,164 Z"
        />
        <path
          fill="rgba(255,255,255,0.06)"
          style={{ animation: `shimmer 3s ease-in-out infinite`, animationDelay: `${d + 0.7}s` }}
          d="M310,140 L345,134 L349,142 L314,148 Z"
        />
      </svg>

      {/* Üst kısım için hafif beyaz overlay - metin okunabilirliği */}
      <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.0) 100%)" }} />
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
        className="w-28 h-28 object-contain"
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
          25%  { transform: translateX(-6%) scaleY(1.12); }
          50%  { transform: translateX(5%) scaleY(0.92); }
          75%  { transform: translateX(-3%) scaleY(1.08); }
          100% { transform: translateX(0) scaleY(1); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
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