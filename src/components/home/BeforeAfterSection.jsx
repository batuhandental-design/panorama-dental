import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const BASE = "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/";

const allCases = [
  { id: 1,  img: BASE + "ed946f566_1.png",  treatment: "Hollywood Smile",    label: "Kompozit Laminate" },
  { id: 2,  img: BASE + "0f68dc5f0_2.png",  treatment: "Hollywood Smile",    label: "Seramik Kaplama" },
  { id: 3,  img: BASE + "3165b21b7_3.png",  treatment: "Zirkonyum Kaplama",  label: "Zirconium Crown" },
  { id: 4,  img: BASE + "a2631b18a_4.png",  treatment: "Diş İmplantı",       label: "All-on-6 Restorasyon" },
  { id: 5,  img: BASE + "81e694748_5.png",  treatment: "Diş Beyazlatma",     label: "Laser Beyazlatma" },
  { id: 6,  img: BASE + "5254cb7ca_6.png",  treatment: "Zirkonyum Kaplama",  label: "Tam Gülüş Tasarımı" },
  { id: 7,  img: BASE + "598e6993d_7.png",  treatment: "Diş İmplantı",       label: "All-on-4 İmplant" },
  { id: 8,  img: BASE + "bac2fca14_8.png",  treatment: "Hollywood Smile",    label: "Porselen Laminate" },
  { id: 9,  img: BASE + "985a49a67_9.png",  treatment: "Zirkonyum Kaplama",  label: "Zirkonyum Kaplama" },
  { id: 10, img: BASE + "59a94a24f_10.png", treatment: "Diş İmplantı",       label: "Tam Çene Restorasyon" },
  { id: 11, img: BASE + "732eb19d1_11.png", treatment: "Hollywood Smile",    label: "Smile Design" },
  { id: 12, img: BASE + "cdeedde90_12.png", treatment: "Hollywood Smile",    label: "Estetik Kaplama" },
  { id: 13, img: BASE + "19d222a60_13.png", treatment: "Diş Beyazlatma",     label: "Profesyonel Beyazlatma" },
  { id: 14, img: BASE + "3cdb29ca5_14.png", treatment: "Hollywood Smile",    label: "Laminate Veneer" },
  { id: 15, img: BASE + "554eaa8e7_15.png", treatment: "Zirkonyum Kaplama",  label: "Zirkonyum Restorasyon" },
  { id: 16, img: BASE + "beca0a937_16.png", treatment: "Diş İmplantı",       label: "İmplant & Kaplama" },
  { id: 17, img: BASE + "375c2e708_17.png", treatment: "Hollywood Smile",    label: "Hollywood Smile" },
  { id: 18, img: BASE + "6bb7d8582_18.png", treatment: "Hollywood Smile",    label: "Seramik Veneer" },
  { id: 19, img: BASE + "191827427_19.png", treatment: "Zirkonyum Kaplama",  label: "Zirkonyum Smile" },
  { id: 20, img: BASE + "e6c786236_20.png", treatment: "Diş İmplantı",       label: "Full Mouth Rehab" },
];

const FILTERS = ["Tümü", "Hollywood Smile", "Diş İmplantı", "Zirkonyum Kaplama", "Diş Beyazlatma"];
const PER_PAGE = 6;

export default function BeforeAfterSection() {
  const [activeFilter, setActiveFilter] = useState("Tümü");
  const [page, setPage] = useState(0);

  const filtered = activeFilter === "Tümü" ? allCases : allCases.filter(c => c.treatment === activeFilter);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const handleFilter = (f) => {
    setActiveFilter(f);
    setPage(0);
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
          className="text-center mb-12"
        >
          <span className="inline-block bg-[#8B6840]/10 text-[#8B6840] text-xs font-semibold uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-5">
            Gerçek Hasta Sonuçları
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#2d2419] font-playfair leading-tight mb-4">
            Before & After <span className="text-[#8B6840]">Results</span>
          </h2>
          <p className="text-[#6b5e52] max-w-xl mx-auto leading-relaxed text-[15px]">
            Panorama Dental'den gerçek hasta dönüşümleri. Her vaka, ekibimizin mükemmellik standardını yansıtır.
          </p>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {[
            { val: "5.000+", label: "Mutlu Hasta" },
            { val: "98%", label: "Memnuniyet" },
            { val: "12+", label: "Yıl Deneyim" },
            { val: "50+", label: "Ülkeden Hasta" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2.5 bg-white rounded-2xl px-5 py-2.5 shadow-sm border border-[#e8e0d6]">
              <span className="text-lg font-bold text-[#8B6840] font-playfair">{s.val}</span>
              <span className="text-[#6b5e52] text-xs font-medium uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === f
                  ? "bg-[#8B6840] text-white shadow-lg shadow-[#8B6840]/30"
                  : "bg-white text-[#6b5e52] border border-[#d4c9bc] hover:border-[#8B6840] hover:text-[#8B6840]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${page}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          >
            {visible.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-[#e8e0d6]"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.label}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2c2419]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <a
                      href="#contact"
                      className="w-full text-center py-2.5 bg-[#8B6840] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#7a5c38] transition-colors"
                    >
                      Ücretsiz Konsültasyon →
                    </a>
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-[#8B6840] text-[10px] font-bold uppercase tracking-[0.2em]">{item.treatment}</p>
                    <p className="text-[#2d2419] font-semibold text-sm mt-0.5">{item.label}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-yellow-400 text-xs">★</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mb-14">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-10 h-10 rounded-full bg-white border border-[#d4c9bc] flex items-center justify-center text-[#4a3728] hover:bg-[#8B6840] hover:text-white hover:border-[#8B6840] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === page ? "bg-[#8B6840] w-8" : "bg-[#c9bfb4] hover:bg-[#8B6840]/50"
                }`}
              />
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-10 h-10 rounded-full bg-white border border-[#d4c9bc] flex items-center justify-center text-[#4a3728] hover:bg-[#8B6840] hover:text-white hover:border-[#8B6840] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
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