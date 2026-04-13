import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const cases = [
  {
    before: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80",
    after: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80",
    name: "Ayşe K.",
    treatment: "Hollywood Smile + Zirkonyum",
  },
  {
    before: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80",
    after: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80",
    name: "Mehmet Y.",
    treatment: "Diş İmplantı + Beyazlatma",
  },
  {
    before: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80",
    after: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80",
    name: "Fatma D.",
    treatment: "Porselen Laminate",
  },
];

function SliderCard({ item }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updateSlider = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = (e) => { if (dragging.current) updateSlider(e.clientX); };
  const onMouseUp = () => { dragging.current = false; };
  const onTouchMove = (e) => { updateSlider(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl cursor-col-resize select-none shadow-xl"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {/* AFTER (base) */}
      <img src={item.after} alt="After" className="absolute inset-0 w-full h-full object-cover" />

      {/* BEFORE (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img src={item.before} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ width: containerRef.current?.offsetWidth + 'px' }} />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-[#8B6840] absolute -left-0.5" />
          <ChevronRight className="w-4 h-4 text-[#8B6840] absolute -right-0.5" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider">ÖNCE</div>
      <div className="absolute top-3 right-3 bg-[#8B6840] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider">SONRA</div>

      {/* Patient info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
        <p className="text-white font-semibold text-sm">{item.name}</p>
        <p className="text-[#c9a87c] text-xs">{item.treatment}</p>
      </div>
    </div>
  );
}

export default function BeforeAfterSection() {
  return (
    <section className="py-24 bg-[#f7f3ef] font-inter" id="before-after">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">Gerçek Sonuçlar</p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#2d2419] font-playfair mb-5">
            Hollywood Gülüşü{" "}
            <span className="text-[#8B6840]">Öncesi & Sonrası</span>
          </h2>
          <p className="text-[#6b5e52] max-w-2xl mx-auto leading-relaxed text-base">
            Binlerce hastamızın hayatını değiştiren dönüşümleri. Kaydırıcıyı sürükleyerek farkı kendi gözlerinizle görün.
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            {["8.000+ Başarılı Vaka", "5 Yıldız Değerlendirme", "%98 Memnuniyet"].map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[#8B6840]">
                <Star className="w-4 h-4 fill-[#8B6840]" />
                <span className="text-sm font-semibold text-[#2d2419]">{badge}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {cases.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
            >
              <SliderCard item={item} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center bg-gradient-to-br from-[#2c2419] to-[#3d3028] rounded-2xl px-10 py-8 shadow-2xl">
            <div className="text-left">
              <p className="text-white font-bold text-lg font-playfair">Siz de bu dönüşümü yaşayın</p>
              <p className="text-[#b0a090] text-sm">Ücretsiz konsültasyon ile ilk adımı atın</p>
            </div>
            <a
              href="#contact"
              className="whitespace-nowrap px-8 py-3.5 bg-[#8B6840] text-white font-bold rounded-xl hover:bg-[#7a5c38] transition-all shadow-lg shadow-[#8B6840]/30 text-sm uppercase tracking-widest hover:scale-105 transform duration-200"
            >
              Ücretsiz Konsültasyon
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}