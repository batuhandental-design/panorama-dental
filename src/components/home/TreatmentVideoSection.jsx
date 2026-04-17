import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const implantSteps = [
  { step: "01", title: "Muayene & Planlama", desc: "3D tomografi ile kapsamlı ağız analizi", icon: "🔬" },
  { step: "02", title: "İmplant Yerleştirme", desc: "Lokal anestezi altında titanyum implant uygulaması", icon: "🦷" },
  { step: "03", title: "İyileşme Süreci", desc: "2–4 aylık osseointegrasyon süreci", icon: "⏳" },
  { step: "04", title: "Kusursuz Gülüş", desc: "Zirkonyum kron ile tedavi tamamlandı", icon: "✨" },
];

export default function TreatmentVideoSection({ steps, title }) {
  const displaySteps = steps || implantSteps;
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % displaySteps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [playing, displaySteps.length]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden mb-16" style={{ minHeight: 340 }}>
      {/* X-ray background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://media.base44.com/images/public/69d79ff6631966558dbdfca2/36900db8f_image.png)`,
          filter: "grayscale(100%) brightness(0.35) contrast(1.2)",
        }}
      />

      {/* Scan line animation */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,200,0.03) 3px, rgba(0,255,200,0.03) 4px)",
        }}
      />
      <div
        className="absolute left-0 right-0 h-1 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,255,180,0.4), transparent)",
          animation: "scanline 3s linear infinite",
        }}
      />

      {/* Green glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2a1a]/60 via-transparent to-[#0a2a1a]/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-14">
        <p className="text-[#4fffb0] text-[10px] uppercase tracking-[0.35em] font-bold mb-3">
          ◉ &nbsp; SİMÜLASYON — TEDAVİ SÜRECİ
        </p>
        <h3 className="text-white text-xl md:text-2xl font-bold font-playfair mb-10 text-center">
          {title || "Diş İmplantı Tedavi Süreci"}
        </h3>

        {/* Steps */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-3xl">
          {displaySteps.map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center relative">
              {/* Connector line */}
              {i < displaySteps.length - 1 && (
                <div className="hidden sm:block absolute top-6 left-1/2 w-full h-0.5 bg-white/10 z-0">
                  <div
                    className="h-full bg-[#4fffb0] transition-all duration-500"
                    style={{ width: current > i ? "100%" : "0%" }}
                  />
                </div>
              )}

              <motion.div
                animate={{
                  scale: current === i ? 1.12 : 0.92,
                  opacity: current === i ? 1 : 0.45,
                }}
                transition={{ duration: 0.4 }}
                className="relative z-10 flex flex-col items-center"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 border-2 transition-all duration-500"
                  style={{
                    background: current === i ? "rgba(79,255,176,0.15)" : "rgba(255,255,255,0.05)",
                    borderColor: current === i ? "#4fffb0" : "rgba(255,255,255,0.15)",
                    boxShadow: current === i ? "0 0 20px rgba(79,255,176,0.5)" : "none",
                  }}
                >
                  {s.icon || s.step}
                </div>
                <AnimatePresence mode="wait">
                  {current === i && (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                      className="text-center"
                    >
                      <p className="text-[#4fffb0] text-xs font-bold uppercase tracking-wider mb-1">{s.title}</p>
                      <p className="text-white/70 text-[11px] max-w-[130px] leading-relaxed">{s.desc}</p>
                    </motion.div>
                  )}
                  {current !== i && (
                    <motion.p
                      key={`idle-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-white/40 text-[11px] font-medium text-center max-w-[110px]"
                    >
                      {s.title}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-10 w-full max-w-xs h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#4fffb0] rounded-full"
            animate={{ width: `${((current + 1) / displaySteps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Dots + play/pause */}
        <div className="flex items-center gap-3 mt-4">
          {displaySteps.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setPlaying(false); }}
              className={`rounded-full transition-all duration-300 ${i === current ? "bg-[#4fffb0] w-5 h-2" : "bg-white/30 w-2 h-2 hover:bg-white/60"}`}
            />
          ))}
          <button
            onClick={() => setPlaying((p) => !p)}
            className="ml-2 text-[#4fffb0] text-xs border border-[#4fffb0]/40 rounded-full px-3 py-1 hover:bg-[#4fffb0]/10 transition-all"
          >
            {playing ? "⏸" : "▶"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          0% { top: -2px; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}