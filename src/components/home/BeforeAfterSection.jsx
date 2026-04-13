import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, ArrowRight, ChevronLeft, ChevronRight, ImagePlus } from "lucide-react";

function UploadZone({ label, image, onUpload, color }) {
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    onUpload(url);
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="flex-1 relative group">
      {image ? (
        <div className="relative h-56 md:h-64 rounded-2xl overflow-hidden cursor-pointer" onClick={() => inputRef.current?.click()}>
          <img src={image} alt={label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-semibold bg-black/50 px-3 py-1.5 rounded-full">Değiştir</span>
          </div>
          <div className={`absolute top-3 left-3 text-white text-[11px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase ${color}`}>
            {label}
          </div>
        </div>
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="h-56 md:h-64 rounded-2xl border-2 border-dashed border-[#d4c9bc] bg-[#faf8f5] hover:border-[#8B6840] hover:bg-[#f7f3ef] transition-all duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#8B6840]/10 flex items-center justify-center group-hover:bg-[#8B6840]/20 transition-colors">
            <ImagePlus className="w-7 h-7 text-[#8B6840]" />
          </div>
          <div className="text-center">
            <p className="text-[#2d2419] font-semibold text-sm">{label} Fotoğrafı</p>
            <p className="text-[#9c8e84] text-xs mt-0.5">Yüklemek için tıklayın</p>
          </div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}

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
      className="relative w-full h-56 md:h-64 rounded-2xl overflow-hidden cursor-col-resize select-none"
      onMouseDown={() => { dragging.current = true; }}
      onMouseMove={(e) => { if (dragging.current) updateSlider(e.clientX); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={() => { dragging.current = true; }}
      onTouchMove={(e) => updateSlider(e.touches[0].clientX)}
      onTouchEnd={() => { dragging.current = false; }}
    >
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
        <img
          src={before}
          alt="Before"
          className="absolute inset-0 h-full object-cover"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%" }}
          draggable={false}
        />
      </div>
      <div className="absolute top-0 bottom-0 w-[2px] bg-white/90 shadow-[0_0_10px_rgba(0,0,0,0.3)]" style={{ left: `${sliderPos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-[#c9a87c]">
          <ChevronLeft className="w-3 h-3 text-[#8B6840]" />
          <ChevronRight className="w-3 h-3 text-[#8B6840]" />
        </div>
      </div>
      <div className="absolute top-3 left-3">
        <span className="bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase">Önce</span>
      </div>
      <div className="absolute top-3 right-3">
        <span className="bg-[#8B6840] text-white text-[11px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase shadow-lg">Sonra</span>
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm text-white text-[10px] px-3 py-1 rounded-full whitespace-nowrap pointer-events-none">
        ← Kaydırarak karşılaştırın →
      </div>
    </div>
  );
}

const initialCases = [
  { id: 1, before: null, after: null, name: "Vaka 1", treatment: "Hollywood Smile" },
  { id: 2, before: null, after: null, name: "Vaka 2", treatment: "Diş İmplantı" },
  { id: 3, before: null, after: null, name: "Vaka 3", treatment: "Zirkonyum Kaplama" },
];

export default function BeforeAfterSection() {
  const [cases, setCases] = useState(initialCases);

  const updateImage = (id, side, url) => {
    setCases((prev) => prev.map((c) => c.id === id ? { ...c, [side]: url } : c));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#f7f3ef] to-[#ede8e0] font-inter" id="before-after">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-[#8B6840]/10 text-[#8B6840] text-xs font-semibold uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-4">
            Gerçek Sonuçlar
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#2d2419] font-playfair leading-tight mb-4">
            Before & After Results
          </h2>
          <p className="text-[#6b5e52] max-w-xl mx-auto leading-relaxed text-[15px]">
            Her vaka için "Önce" ve "Sonra" fotoğraflarını yükleyin. Kaydırıcıyı sürükleyerek dönüşümü interaktif olarak görün.
          </p>
        </motion.div>

        {/* Cases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {cases.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-400 border border-[#e8e0d6] p-5">
                <p className="text-[#8B6840] text-xs font-semibold uppercase tracking-[0.2em] mb-1">{item.treatment}</p>
                <p className="text-[#2d2419] font-bold text-sm mb-4">{item.name}</p>

                {/* Show slider if both images uploaded, else show upload zones */}
                {item.before && item.after ? (
                  <SliderComparison before={item.before} after={item.after} />
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <UploadZone
                      label="Önce"
                      image={item.before}
                      onUpload={(url) => updateImage(item.id, "before", url)}
                      color="bg-black/60 backdrop-blur-sm"
                    />
                    <UploadZone
                      label="Sonra"
                      image={item.after}
                      onUpload={(url) => updateImage(item.id, "after", url)}
                      color="bg-[#8B6840]"
                    />
                  </div>
                )}

                {/* Reset button if images uploaded */}
                {(item.before || item.after) && (
                  <button
                    onClick={() => setCases((prev) => prev.map((c) => c.id === item.id ? { ...c, before: null, after: null } : c))}
                    className="mt-3 text-[10px] text-[#9c8e84] hover:text-[#8B6840] transition-colors underline underline-offset-2"
                  >
                    Fotoğrafları sıfırla
                  </button>
                )}
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
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#8B6840]/20 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#c9a87c]/10 blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-8 md:px-14 py-10">
            <div className="text-center md:text-left">
              <p className="text-[#c9a87c] text-xs uppercase tracking-[0.25em] font-semibold mb-2">Hayalinizdeki Gülüş</p>
              <h3 className="text-white text-2xl md:text-3xl font-bold font-playfair mb-2">Siz de bu dönüşümü yaşayın</h3>
              <p className="text-[#b0a090] text-sm max-w-md">Ücretsiz konsültasyon randevunuzu alın, uzmanlarımız sizin için en uygun tedaviyi belirlesin.</p>
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