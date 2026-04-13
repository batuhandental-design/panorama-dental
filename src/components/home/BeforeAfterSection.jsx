import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

const BASE = "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/";

const cases = [
  { id: 1, file: "ed946f566_1.png",  label: "Hollywood Smile" },
  { id: 2, file: "0f68dc5f0_2.png",  label: "Hollywood Smile" },
  { id: 3, file: "3165b21b7_3.png",  label: "Zirkonyum Kaplama" },
  { id: 4, file: "a2631b18a_4.png",  label: "Diş İmplantı" },
  { id: 5, file: "81e694748_5.png",  label: "Diş Beyazlatma" },
  { id: 6, file: "5254cb7ca_6.png",  label: "Zirkonyum Kaplama" },
  { id: 7, file: "598e6993d_7.png",  label: "Diş İmplantı" },
  { id: 8, file: "bac2fca14_8.png",  label: "Diş İmplantı" },
  { id: 9, file: "985a49a67_9.png",  label: "Zirkonyum Kaplama" },
  { id: 10, file: "59a94a24f_10.png", label: "Hollywood Smile" },
  { id: 11, file: "732eb19d1_11.png", label: "Diş İmplantı" },
  { id: 12, file: "cdeedde90_12.png", label: "Zirkonyum Kaplama" },
  { id: 13, file: "19d222a60_13.png", label: "Hollywood Smile" },
  { id: 14, file: "3cdb29ca5_14.png", label: "Zirkonyum Kaplama" },
  { id: 15, file: "554eaa8e7_15.png", label: "Diş İmplantı" },
  { id: 16, file: "beca0a937_16.png", label: "Zirkonyum Kaplama" },
  { id: 17, file: "375c2e708_17.png", label: "Hollywood Smile" },
  { id: 18, file: "6bb7d8582_18.png", label: "Diş Beyazlatma" },
  { id: 19, file: "191827427_19.png", label: "Zirkonyum Kaplama" },
  { id: 20, file: "e6c786236_20.png", label: "Hollywood Smile" },
];

const LABELS_COLOR = {
  "Hollywood Smile": "bg-[#8B6840] text-white",
  "Zirkonyum Kaplama": "bg-[#1a7a8a] text-white",
  "Diş İmplantı": "bg-[#2d4a6e] text-white",
  "Diş Beyazlatma": "bg-[#5a8a5a] text-white",
};

export default function BeforeAfterSection() {
  const [lightbox, setLightbox] = useState(null);
  const [page, setPage] = useState(0);
  const PER_PAGE = 9;
  const totalPages = Math.ceil(cases.length / PER_PAGE);
  const visible = cases.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const openLightbox = (idx) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prevLight = () => setLightbox((l) => (l - 1 + cases.length) % cases.length);
  const nextLight = () => setLightbox((l) => (l + 1) % cases.length);

  return (
    <section className="py-24 bg-gradient-to-b from-[#f0ece5] to-[#e8e0d5] font-inter" id="before-after">
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
            Gerçek Hasta Sonuçları
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#2d2419] font-playfair leading-tight mb-4">
            Before & After <span className="text-[#8B6840]">Dönüşümler</span>
          </h2>
          <p className="text-[#6b5e52] max-w-xl mx-auto leading-relaxed text-[15px]">
            Panorama Dental'de tedavi gören gerçek hastalarımızın inanılmaz dönüşümlerini keşfedin.
            Her görsel, ekibimizin mükemmellik taahhüdünü yansıtmaktadır.
          </p>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { val: "5.000+", label: "Mutlu Hasta" },
            { val: "98%", label: "Memnuniyet" },
            { val: "12+", label: "Yıl Deneyim" },
            { val: "50+", label: "Ülkeden Hasta" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2 bg-white rounded-2xl px-5 py-2.5 shadow-sm border border-[#e4dcd2]">
              <span className="text-lg font-bold text-[#8B6840] font-playfair">{s.val}</span>
              <span className="text-[#6b5e52] text-xs font-medium uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          <AnimatePresence mode="wait">
            {visible.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-[#e4dcd2] cursor-pointer"
                onClick={() => openLightbox(page * PER_PAGE + index)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={BASE + item.file}
                    alt={item.label}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-400 flex items-center justify-center">
                    <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                  </div>
                </div>
                {/* Label */}
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md ${LABELS_COLOR[item.label] || "bg-[#8B6840] text-white"}`}>
                    {item.label}
                  </span>
                </div>
                {/* Vaka number */}
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-[#2d2419] text-[10px] font-bold px-2.5 py-1 rounded-full">
                  Vaka {item.id}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mb-12">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-10 h-10 rounded-full border border-[#d4c9bc] flex items-center justify-center text-[#4a3728] hover:bg-[#8B6840] hover:text-white hover:border-[#8B6840] disabled:opacity-40 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-10 h-10 rounded-full font-bold text-sm transition-all border ${
                  i === page
                    ? "bg-[#8B6840] text-white border-[#8B6840] shadow-md"
                    : "border-[#d4c9bc] text-[#4a3728] hover:border-[#8B6840]"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-10 h-10 rounded-full border border-[#d4c9bc] flex items-center justify-center text-[#4a3728] hover:bg-[#8B6840] hover:text-white hover:border-[#8B6840] disabled:opacity-40 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* CTA Banner */}
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
              <p className="text-[#c9a87c] text-[11px] uppercase tracking-[0.3em] font-bold mb-2">Hayalinizdeki Gülüş</p>
              <h3 className="text-white text-2xl md:text-3xl font-bold font-playfair mb-2">Siz de bu dönüşümü yaşayın</h3>
              <p className="text-[#b0a090] text-sm max-w-md leading-relaxed">
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
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.849L.057 23.882l6.204-1.448A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.876 9.876 0 01-5.034-1.376l-.361-.214-3.741.873.937-3.63-.235-.374A9.851 9.851 0 012.106 12C2.106 6.525 6.525 2.106 12 2.106c5.476 0 9.894 4.419 9.894 9.894 0 5.476-4.418 9.894-9.894 9.894z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition"
              onClick={closeLightbox}
            >
              <X className="w-5 h-5" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition"
              onClick={(e) => { e.stopPropagation(); prevLight(); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              src={BASE + cases[lightbox].file}
              alt={cases[lightbox].label}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition"
              onClick={(e) => { e.stopPropagation(); nextLight(); }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full">
              {cases[lightbox].label} — Vaka {cases[lightbox].id} / {cases.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}