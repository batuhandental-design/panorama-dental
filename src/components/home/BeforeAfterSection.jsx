import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const BASE = "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/";

const cases = [
  { id: 1,  file: "ed946f566_1.png",  labelKey: 0 },
  { id: 2,  file: "0f68dc5f0_2.png",  labelKey: 0 },
  { id: 3,  file: "3165b21b7_3.png",  labelKey: 1 },
  { id: 4,  file: "a2631b18a_4.png",  labelKey: 2 },
  { id: 5,  file: "81e694748_5.png",  labelKey: 3 },
  { id: 6,  file: "5254cb7ca_6.png",  labelKey: 1 },
  { id: 7,  file: "598e6993d_7.png",  labelKey: 2 },
  { id: 8,  file: "bac2fca14_8.png",  labelKey: 2 },
  { id: 9,  file: "985a49a67_9.png",  labelKey: 1 },
  { id: 10, file: "59a94a24f_10.png", labelKey: 0 },
  { id: 11, file: "732eb19d1_11.png", labelKey: 2 },
  { id: 12, file: "cdeedde90_12.png", labelKey: 1 },
  { id: 13, file: "19d222a60_13.png", labelKey: 0 },
  { id: 14, file: "3cdb29ca5_14.png", labelKey: 1 },
  { id: 15, file: "554eaa8e7_15.png", labelKey: 2 },
  { id: 16, file: "beca0a937_16.png", labelKey: 1 },
  { id: 17, file: "375c2e708_17.png", labelKey: 0 },
  { id: 18, file: "6bb7d8582_18.png", labelKey: 3 },
  { id: 19, file: "191827427_19.png", labelKey: 1 },
  { id: 20, file: "e6c786236_20.png", labelKey: 0 },
];

const LABEL_COLORS = [
  "bg-[#8B6840] text-white",
  "bg-[#1a7a8a] text-white",
  "bg-[#2d4a6e] text-white",
  "bg-[#5a8a5a] text-white",
];

export default function BeforeAfterSection() {
  const { t } = useLanguage();
  const scrollRef = useRef(null);
  const autoRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const total = cases.length;

  const getLabel = (labelKey) => {
    const map = [
      t.services[1]?.title,
      t.services[3]?.title,
      t.services[0]?.title,
      t.services[2]?.title,
    ];
    return map[labelKey] || "";
  };

  // Scroll to a card index smoothly
  const scrollToIndex = useCallback((idx) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[idx];
    if (!card) return;
    const containerWidth = container.offsetWidth;
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const scrollLeft = cardLeft - (containerWidth - cardWidth) / 2;
    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, []);

  const go = useCallback((dir) => {
    setCurrent((c) => {
      const next = (c + dir + total) % total;
      scrollToIndex(next);
      return next;
    });
  }, [total, scrollToIndex]);

  const resetAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => go(1), 4000);
  }, [go]);

  useEffect(() => {
    autoRef.current = setInterval(() => go(1), 4000);
    return () => clearInterval(autoRef.current);
  }, [go]);

  // Detect which card is centered after manual scroll
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const center = container.scrollLeft + container.offsetWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    Array.from(container.children).forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft + child.offsetWidth / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setCurrent(closest);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    // Scroll to first on mount
    setTimeout(() => scrollToIndex(0), 100);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll, scrollToIndex]);

  return (
    <section className="py-24 bg-gradient-to-b from-[#f0ece5] to-[#e8e0d5] font-inter overflow-hidden" id="before-after">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="inline-block bg-[#8B6840]/10 text-[#8B6840] text-xs font-bold uppercase tracking-[0.25em] px-5 py-2 rounded-full mb-5 border border-[#8B6840]/20">
            {t.beforeAfterBadge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#2d2419] font-playfair leading-tight mb-4">
            {t.beforeAfterTitle} <span className="text-[#8B6840]">{t.beforeAfterHighlight}</span>
          </h2>
          <p className="text-[#6b5e52] max-w-xl mx-auto leading-relaxed text-[15px]">{t.beforeAfterDesc}</p>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[{ val: "5.000+" }, { val: "98%" }, { val: "12+" }, { val: "50+" }].map((s, i) => (
            <div key={i} className="flex items-center gap-2 bg-white rounded-2xl px-5 py-2.5 shadow-sm border border-[#e4dcd2]">
              <span className="text-lg font-bold text-[#8B6840] font-playfair">{s.val}</span>
              <span className="text-[#6b5e52] text-xs font-medium uppercase tracking-wider">{t.trustBar[i]}</span>
            </div>
          ))}
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Prev button */}
          <button
            onClick={() => { go(-1); resetAuto(); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-5 z-20 w-11 h-11 rounded-full bg-white shadow-xl border border-[#e4dcd2] flex items-center justify-center text-[#4a3728] hover:bg-[#8B6840] hover:text-white hover:border-[#8B6840] transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto py-6 px-4 md:px-8 scroll-smooth select-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              scrollSnapType: "x mandatory",
              cursor: "grab",
            }}
            onMouseDown={(e) => {
              const el = scrollRef.current;
              if (!el) return;
              el.style.cursor = "grabbing";
              el.style.scrollBehavior = "auto";
              const startX = e.pageX - el.offsetLeft;
              const startScroll = el.scrollLeft;
              clearInterval(autoRef.current);
              const onMove = (ev) => {
                const x = ev.pageX - el.offsetLeft;
                el.scrollLeft = startScroll - (x - startX);
              };
              const onUp = () => {
                el.style.cursor = "grab";
                el.style.scrollBehavior = "smooth";
                resetAuto();
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
              };
              window.addEventListener("mousemove", onMove);
              window.addEventListener("mouseup", onUp);
            }}
          >
            {cases.map((item, i) => (
              <div
                key={item.id}
                onClick={() => { setCurrent(i); scrollToIndex(i); resetAuto(); }}
                className="flex-shrink-0 w-[75vw] sm:w-[48%] md:w-[31%] lg:w-[30%]"
                style={{ scrollSnapAlign: "center" }}
              >
                <div
                  className="group bg-white rounded-3xl overflow-hidden border border-[#e4dcd2] shadow-md transition-all duration-500"
                  style={{
                    transform: i === current ? "scale(1)" : "scale(0.95)",
                    opacity: i === current ? 1 : 0.75,
                    transition: "transform 0.4s ease, opacity 0.4s ease, box-shadow 0.4s ease",
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={BASE + item.file}
                      alt={getLabel(item.labelKey)}
                      loading="lazy"
                      draggable={false}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md ${LABEL_COLORS[item.labelKey]}`}>
                        {getLabel(item.labelKey)}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-[#2d2419] text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {t.caseLabel} {item.id}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={() => { go(1); resetAuto(); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-5 z-20 w-11 h-11 rounded-full bg-white shadow-xl border border-[#e4dcd2] flex items-center justify-center text-[#4a3728] hover:bg-[#8B6840] hover:text-white hover:border-[#8B6840] transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-4 mb-10 flex-wrap">
          {cases.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); scrollToIndex(i); resetAuto(); }}
              className={`rounded-full transition-all duration-300 ${i === current ? "bg-[#8B6840] w-7 h-2.5" : "bg-[#c9bfb4] w-2.5 h-2.5 hover:bg-[#8B6840]/50"}`}
            />
          ))}
        </div>

        <p className="text-center text-[#9c8e84] text-sm mb-12">
          <span className="font-bold text-[#8B6840]">{current + 1}</span> / {total} {t.caseLabel}
        </p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #2c2419 0%, #4a3728 60%, #3d3028 100%)" }}
        >
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#8B6840]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#c9a87c]/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-8 md:px-14 py-12">
            <div className="text-center md:text-left">
              <p className="text-[#c9a87c] text-[11px] uppercase tracking-[0.3em] font-bold mb-2">{t.ctaBadge}</p>
              <h3 className="text-white text-2xl md:text-3xl font-bold font-playfair mb-2">{t.ctaTitle}</h3>
              <p className="text-[#b0a090] text-sm max-w-md leading-relaxed">{t.ctaDesc}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#8B6840] text-white font-bold rounded-xl hover:bg-[#7a5c38] transition-all shadow-lg shadow-[#8B6840]/40 text-sm uppercase tracking-wider whitespace-nowrap">
                {t.ctaBtn} <ArrowRight className="w-4 h-4" />
              </a>
              <a href="https://wa.me/905491240103" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#25D366] hover:text-[#25D366] transition-all text-sm uppercase tracking-wider whitespace-nowrap">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.849L.057 23.882l6.204-1.448A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.876 9.876 0 01-5.034-1.376l-.361-.214-3.741.873.937-3.63-.235-.374A9.851 9.851 0 012.106 12C2.106 6.525 6.525 2.106 12 2.106c5.476 0 9.894 4.419 9.894 9.894 0 5.476-4.418 9.894-9.894 9.894z"/>
                </svg>
                {t.whatsappBtn}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}