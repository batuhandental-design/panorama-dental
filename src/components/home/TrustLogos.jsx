import { motion } from "framer-motion";

const brandLogos = [
  {
    name: "Nobel Biocare",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Nobel_Biocare_logo.svg/320px-Nobel_Biocare_logo.svg.png",
  },
  {
    name: "MegaGen",
    url: "https://www.megagen.com/web/images/ci/megagen_logo.png",
  },
  {
    name: "implantswiss",
    url: "https://www.straumann.com/content/dam/internet/straumann_com/Resources/logos/straumann-logo.svg",
  },
  {
    name: "Dentsply Sirona",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Dentsply_Sirona_logo.svg/320px-Dentsply_Sirona_logo.svg.png",
  },
];

// Sertifika logoları - text tabanlı tasarım, yüklenemeyen görseller yerine
const certs = [
  {
    name: "T.C. Kültür ve Turizm Bakanlığı",
    emoji: "🏛️",
    color: "#c0392b",
    label: "T.C. Kültür ve Turizm Bakanlığı",
  },
  {
    name: "ISO",
    emoji: "🌐",
    color: "#1a5276",
    label: "ISO Sertifikalı",
    sub: "International Organization for Standardization",
  },
  {
    name: "Türk Patent",
    emoji: "®",
    color: "#1a1a1a",
    label: "TÜRK PATENT",
    sub: "Türk Patent ve Marka Kurumu",
  },
  {
    name: "T.C. Sağlık Bakanlığı",
    emoji: "⚕️",
    color: "#c0392b",
    label: "T.C. Sağlık Bakanlığı",
  },
];

export default function TrustLogos() {
  return (
    <section className="bg-[#f7f3ef] py-14 font-inter border-t border-[#e0d8d0]">
      <div className="max-w-5xl mx-auto px-4">

        {/* Brand Partners */}
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-[#9c8e84] font-semibold mb-8">
          Kullandığımız Markalar
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-10 md:gap-16 mb-12"
        >
          {/* Nobel Biocare */}
          <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
            <div className="w-5 h-5 rounded border-2 border-[#1a1a1a] flex items-center justify-center">
              <span className="text-[10px] font-black text-[#1a1a1a]">N</span>
            </div>
            <span className="text-[15px] font-bold text-[#1a1a1a]">Nobel Biocare</span>
            <span className="text-[8px] align-super">®</span>
          </div>

          {/* MegaGen */}
          <div className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
            <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
              <div className="bg-blue-500 rounded-sm"></div>
              <div className="bg-green-500 rounded-sm"></div>
              <div className="bg-orange-400 rounded-sm"></div>
              <div className="bg-red-500 rounded-sm"></div>
            </div>
            <span className="text-[15px] font-bold text-[#1a1a1a]">MEGAGEN</span>
          </div>

          {/* Implantswiss */}
          <div className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-[15px] font-light text-[#555]">implant</span>
            <span className="text-[15px] font-bold text-[#1a7c3e]">swiss</span>
          </div>

          {/* Dentsply Sirona */}
          <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <div className="w-5 h-5 rounded-full bg-[#003087] flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">D</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-bold text-[#1a1a1a]">Dentsply</span>
              <span className="text-[11px] font-light text-[#555]">Sirona</span>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-[#e0d8d0] mb-12" />

        {/* Certifications */}
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-[#9c8e84] font-semibold mb-8">
          Sertifikalar & Akreditasyonlar
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-start justify-center gap-10 md:gap-16"
        >
          {/* T.C. Kültür ve Turizm Bakanlığı */}
          <div className="flex flex-col items-center gap-2 text-center w-28">
            <div className="w-16 h-16 rounded-full border-2 border-[#c0392b] flex items-center justify-center bg-white">
              <span className="text-2xl">🏛️</span>
            </div>
            <span className="text-[10px] text-[#6b5e52] leading-tight font-medium">T.C. Kültür ve Turizm Bakanlığı</span>
          </div>

          {/* ISO */}
          <div className="flex flex-col items-center gap-2 text-center w-28">
            <div className="w-16 h-16 rounded-full border-2 border-[#1a5276] flex items-center justify-center bg-white">
              <div className="text-center">
                <div className="text-[8px] text-[#1a5276] leading-none">International</div>
                <div className="text-[13px] font-black text-[#1a5276]">ISO</div>
                <div className="text-[6px] text-[#1a5276] leading-none">Organization</div>
              </div>
            </div>
            <span className="text-[10px] text-[#6b5e52] leading-tight font-medium">ISO Sertifikalı</span>
          </div>

          {/* Türk Patent */}
          <div className="flex flex-col items-center gap-2 text-center w-28">
            <div className="w-16 h-16 border-2 border-[#1a1a1a] flex items-center justify-center bg-white">
              <div className="text-center px-1">
                <div className="text-[9px] font-black text-[#c0392b] leading-none">TÜRK</div>
                <div className="text-[9px] font-black text-[#c0392b] leading-none">[PATENT]</div>
              </div>
            </div>
            <span className="text-[10px] text-[#6b5e52] leading-tight font-medium">Türk Patent ve Marka Kurumu</span>
          </div>

          {/* T.C. Sağlık Bakanlığı */}
          <div className="flex flex-col items-center gap-2 text-center w-28">
            <div className="w-16 h-16 rounded-full border-2 border-[#c0392b] flex items-center justify-center bg-white">
              <span className="text-2xl">⚕️</span>
            </div>
            <span className="text-[10px] text-[#6b5e52] leading-tight font-medium">T.C. Sağlık Bakanlığı</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}