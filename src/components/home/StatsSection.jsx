import { motion } from "framer-motion";

const logos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Nobel_Biocare_logo.svg/320px-Nobel_Biocare_logo.svg.png",
    alt: "Nobel Biocare",
  },
  {
    src: "https://imegagen.com/wp-content/themes/megagen/images/logo.png",
    alt: "MegaGen",
  },
  {
    src: "https://www.implantswiss.com/wp-content/themes/implantswiss/images/logo-implantswiss.svg",
    alt: "Implantswiss",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Dentsply_sirona_logo.svg/320px-Dentsply_sirona_logo.svg.png",
    alt: "Dentsply Sirona",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/ISO_logo_%28Red_square%29.svg/240px-ISO_logo_%28Red_square%29.svg.png",
    alt: "ISO",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/T.C._K%C3%BClt%C3%BCr_ve_Turizm_Bakanl%C4%B1%C4%9F%C4%B1_logo.svg/240px-T.C._K%C3%BClt%C3%BCr_ve_Turizm_Bakanl%C4%B1%C4%9F%C4%B1_logo.svg.png",
    alt: "Kültür ve Turizm Bakanlığı",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/T%C3%BCrk_Patent_ve_Marka_Kurumu_logo.svg/320px-T%C3%BCrk_Patent_ve_Marka_Kurumu_logo.svg.png",
    alt: "Türk Patent",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/T.C._Sa%C4%9Fl%C4%B1k_Bakanl%C4%B1%C4%9F%C4%B1_logo.svg/240px-T.C._Sa%C4%9Fl%C4%B1k_Bakanl%C4%B1%C4%9F%C4%B1_logo.svg.png",
    alt: "Sağlık Bakanlığı",
  },
];

export default function StatsSection() {
  return (
    <section className="py-14 bg-[#8B6840] font-inter overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 items-center justify-items-center">
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-14 max-w-[140px] w-full object-contain"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.92 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}