import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const cases = [
  {
    id: 1,
    treatment: "Hollywood Smile",
    name: "Porselen Laminate",
    before: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=85",
    after: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=85",
  },
  {
    id: 2,
    treatment: "Diş İmplantı",
    name: "All-on-6 Restorasyon",
    before: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=85",
    after: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=85",
  },
  {
    id: 3,
    treatment: "Zirkonyum Kaplama",
    name: "Tam Gülüş Tasarımı",
    before: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=85",
    after: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=85",
  },
];

function SliderComparison({ before, after }) {
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
    <div
      ref={containerRef}
      className="relative w-full h-64 rounded-2xl overflow-hidden cursor-col-resize select-none shadow-lg"
      onMouseDown={() => { dragging.current = true; }}
      onMouseMove={(e) => { if (dragging.current) updateSlider(e.clientX); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={() => { dragging.current = true; }}
      onTouchMove={(e) => updateSlider(e.touches[0].clientX)}
      onTouchEnd={() => { dragging.current = false; }}
    >
      {/* After image (full) */}
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" draggable={false} />

      {/* Before image (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
        <img
          src={before}
          alt="Before"
          className="absolute inset-0 h-full object-cover"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%" }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-2xl flex items-center justify-center border-2 border-[#c9a87c] gap-0.5">
          <ChevronLeft className="w-3 h-3 text-[#8B6840]" />
          <ChevronRight className="w-3 h-3 text-[#8B6840]" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3">
        <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase">Önce</span>
      </div>
      <div className="absolute top-3 right-3">
        <span className="bg-[#8B6840] text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase shadow-lg">Sonra</span>
      </div>

      {/* Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm text-white text-[9px] px-3 py-1 rounded-full whitespace-nowrap pointer-events-none">
        ← Kaydırarak karşılaştırın →
      </div>
    </div>
  );
}

export default function BeforeAfterSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#f7f3ef] to-[#ede8e0] font-inter" id="before-after">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#8B6840]/10 text-[#8B6840] text-xs font-semibold uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-5">
            Gerçek Hasta Sonuçları
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#2d2419] font-playfair leading-tight mb-5">
            Before & After <span className="text-[#8B6840]">Transformations</span>
          </h2>
          <p className="text-[#6b5e52] max-w-xl mx-auto leading-relaxed text-[15px]">
            Kaydırıcıyı sürükleyerek tedavi öncesi ve sonrasını kıyaslayın. Her vaka, ekibimizin mükemmellik standardını yansıtır.
          </p>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-6 mb-14"
        >
          {[
            { val: "5.000+", label: "Mutlu Hasta" },
            { val: "98%", label: "Memnuniyet" },
            { val: "12+", label: "Yıl Deneyim" },
            { val: "50+", label: "Ülkeden Hasta" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-sm border border-[#e8e0d6]">
              <span className="text-xl font-bold text-[#8B6840] font-playfair">{s.val}</span>
              <span className="text-[#6b5e52] text-xs font-medium uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-14">
          {cases.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-[#e8e0d6] group"
            >
              <div className="p-5 pb-0">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-[#8B6840] text-[11px] font-bold uppercase tracking-[0.2em]">{item.treatment}</p>
                    <p className="text-[#2d2419] font-semibold text-sm mt-0.5">{item.name}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-yellow-400 text-xs">★</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5">
                <SliderComparison before={item.before} after={item.after} />
              </div>
            </motion.div>
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
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-[#8B6840]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-[#c9a87c]/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-8 md:px-14 py-12">
            <div className="text-center md:text-left">
              <p className="text-[#c9a87c] text-[11px] uppercase tracking-[0.3em] font-bold mb-2">Hayalinizdeki Gülüş</p>
              <h3 className="text-white text-2xl md:text-3xl font-bold font-playfair mb-2">Siz de bu dönüşümü yaşayın</h3>
              <p className="text-[#b0a090] text-sm max-w-md">
                Ücretsiz konsültasyon randevunuzu alın, uzmanlarımız sizin için en uygun tedaviyi belirlesin.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#8B6840] text-white font-bold rounded-xl hover:bg-[#7a5c38] transition-all shadow-lg shadow-[#8B6840]/40 text-sm uppercase tracking-wider whitespace-nowrap"
              >
                Ücretsiz Konsültasyon <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/905315898089"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#25D366] hover:text-[#25D366] transition-all text-sm uppercase tracking-wider whitespace-nowrap"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.849L.057 23.882l6.204-1.448A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.876 9.876 0 01-5.034-1.376l-.361-.214-3.741.873.937-3.63-.235-.374A9.851 9.851 0 012.106 12C2.106 6.525 6.525 2.106 12 2.106c5.476 0 9.894 4.419 9.894 9.894 0 5.476-4.418 9.894-9.894 9.894z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}