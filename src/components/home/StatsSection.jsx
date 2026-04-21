import { motion } from "framer-motion";

const logos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Nobel_Biocare_logo.svg/2560px-Nobel_Biocare_logo.svg.png",
    alt: "Nobel Biocare",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/MegaGen_logo.svg/2560px-MegaGen_logo.svg.png",
    alt: "MegaGen",
  },
  {
    src: "https://www.implantswiss.com/wp-content/themes/implantswiss/assets/images/logo.svg",
    alt: "Implantswiss",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Dentsply_Sirona_logo.svg/2560px-Dentsply_Sirona_logo.svg.png",
    alt: "Dentsply Sirona",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/ISO_3166-1_alpha-3_logo.svg/1200px-ISO_3166-1_alpha-3_logo.svg.png",
    alt: "ISO",
  },
  {
    src: "https://www.kulturturizm.gov.tr/Eklenti/91834,logo.png",
    alt: "Kültür ve Turizm Bakanlığı",
  },
  {
    src: "https://www.turkpatent.gov.tr/TURKPATENT/resources/temp/5BA38B7C-9D0C-42D1-A40B-3AEB28E3E52B.png",
    alt: "Türk Patent",
  },
  {
    src: "https://www.saglik.gov.tr/TR/belge/2-7/logo.png",
    alt: "Sağlık Bakanlığı",
  },
];

export default function StatsSection() {
  return (
    <section className="py-14 bg-[#8B6840] font-inter overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center">
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
                className="max-h-14 max-w-[130px] object-contain"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}