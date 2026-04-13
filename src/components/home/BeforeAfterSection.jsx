import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const cases = [
  {
    before: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=700&q=85",
    after: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=700&q=85",
    name: "Elif T.",
    treatment: "Hollywood Smile + Zirkonyum",
    duration: "3 Gün",
  },
  {
    before: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=700&q=85",
    after: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=700&q=85",
    name: "Burak A.",
    treatment: "Diş İmplantı + Beyazlatma",
    duration: "5 Gün",
  },
  {
    before: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700&q=85",
    after: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=700&q=85",
    name: "Selin K.",
    treatment: "Porselen Laminate Veneer",
    duration: "4 Gün",
  },
];

function ComparisonCard({ item, index }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updateSlider = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(95, Math.max(5, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-[#e8e0d6]">
        {/* Slider area */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[4/3] overflow-hidden cursor-col-resize select-none"
          onMouseDown={() => { dragging.current = true; }}
          onMouseMove={(e) => { if (dragging.current) updateSlider(e.clientX); }}
          onMouseUp={() => { dragging.current = false; }}
          onMouseLeave={() => { dragging.current = false; }}
          onTouchStart={() => { dragging.current = true; }}
          onTouchMove={(e) => updateSlider(e.touches[0].clientX)}
          onTouchEnd={() => { dragging.current = false; }}
        >
          {/* AFTER image (base) */}
          <img
            src={item.after}
            alt="After"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />

          {/* BEFORE image (clipped left side) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={item.before}
              alt="Before"
              className="absolute inset-0 h-full object-cover"
              style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%" }}
              draggable={false}
            />
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white/90 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-[#c9a87c]">
              <ChevronLeft className="w-3.5 h-3.5 text-[#8B6840]" />
              <ChevronRight className="w-3.5 h-3.5 text-[#8B6840]" />
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4">
            <span className="bg-black/65 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase">
              Önce
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="bg-[#8B6840] text-white text-[11px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase shadow-lg">
              Sonra
            </span>
          </div>

          {/* Hint on first card */}
          {index === 0 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-[10px] px-3 py-1 rounded-full whitespace-nowrap pointer-events-none">
              ← Kaydırarak karşılaştırın →
            </div>
          )}
        </div>

        {/* Card footer */}
        <div className="px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-[#2d2419] font-bold text-sm">{item.name}</p>
            <p className="text-[#8B6840] text-xs font-medium">{item.treatment}</p>
          </div>
          <div className="text-right">
            <p className="text-[#9c8e84] text-[10px] uppercase tracking-wider">Süre</p>
            <p className="text-[#2d2419] text-sm font-bold">{item.duration}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BeforeAfterSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#f7f3ef] to-[#ede8e0] font-inter overflow-hidden" id="before-after">
      <div className="max-w-6xl mx-auto px-4">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <span className="inline-block bg-[#8B6840]/10 text-[#8B6840] text-xs font-semibold uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-4">
            Gerçek Sonuçlar
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#2d2419] font-playfair leading-tight mb-4">
            Hollywood Gülüşü<br />
            <span className="text-[#8B6840]">Öncesi & Sonrası</span>
          </h2>
          <p className="text-[#6b5e52] max-w-xl mx-auto leading-relaxed text-[15px]">
            Kaydırıcıyı sürükleyerek dönüşümü kendi gözlerinizle görün. Her gülüş, uzman ekibimizin özenle yarattığı bir sanat eseridir.
          </p>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-14"
        >
          {[
            { value: "8.000+", label: "Mutlu Hasta" },
            { value: "5.000+", label: "Hollywood Gülüşü" },
            { value: "%98", label: "Memnuniyet" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 text-[#c9a87c] fill-[#c9a87c]" />
                ))}
              </div>
              <span className="text-[#2d2419] font-bold text-sm">{stat.value}</span>
              <span className="text-[#9c8e84] text-sm">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {cases.map((item, i) => (
            <ComparisonCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #2c2419 0%, #4a3728 50%, #3d3028 100%)" }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#8B6840]/20 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#c9a87c]/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-8 md:px-14 py-10">
            <div className="text-center md:text-left">
              <p className="text-[#c9a87c] text-xs uppercase tracking-[0.25em] font-semibold mb-2">Hayalinizdeki Gülüş</p>
              <h3 className="text-white text-2xl md:text-3xl font-bold font-playfair mb-2">
                Siz de bu dönüşümü yaşayın
              </h3>
              <p className="text-[#b0a090] text-sm max-w-md">
                Ücretsiz konsültasyon randevunuzu alın, uzmanlarımız sizin için en uygun tedaviyi belirlesin.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#8B6840] text-white font-bold rounded-xl hover:bg-[#7a5c38] transition-all shadow-lg shadow-[#8B6840]/40 text-sm uppercase tracking-wider hover:scale-105 transform duration-200 whitespace-nowrap"
              >
                Ücretsiz Konsültasyon
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/905315898089"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#c9a87c] hover:text-[#c9a87c] transition-all text-sm uppercase tracking-wider whitespace-nowrap"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}