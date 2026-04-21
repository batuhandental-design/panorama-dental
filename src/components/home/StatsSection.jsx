import { motion } from "framer-motion";

const logos = [
  {
    src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/nobel_biocare.png",
    alt: "Nobel Biocare",
    fallback: "Nobel Biocare",
  },
  {
    src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/megagen.png",
    alt: "MegaGen",
    fallback: "MegaGen",
  },
  {
    src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/implantswiss.png",
    alt: "Implantswiss",
    fallback: "Implantswiss",
  },
  {
    src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/dentsply_sirona.png",
    alt: "Dentsply Sirona",
    fallback: "Dentsply Sirona",
  },
  {
    src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/iso.png",
    alt: "ISO",
    fallback: "ISO",
  },
  {
    src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/kultur_turizm.png",
    alt: "Kültür ve Turizm Bakanlığı",
    fallback: "Kültür Turizm",
  },
  {
    src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/turk_patent.png",
    alt: "Türk Patent",
    fallback: "Türk Patent",
  },
  {
    src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/saglik_bakanligi.png",
    alt: "Sağlık Bakanlığı",
    fallback: "Sağlık Bakanlığı",
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
                className="max-h-14 max-w-[140px] object-contain"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.92 }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              <span
                className="text-white/80 text-sm font-semibold text-center"
                style={{ display: "none" }}
              >
                {logo.fallback}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}