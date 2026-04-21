import { motion } from "framer-motion";

const logos = [
  {
    src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/f8451ed8e_generated_image.png",
    alt: "Nobel Biocare",
  },
  {
    src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/80bfb2e96_generated_image.png",
    alt: "MegaGen",
  },
  {
    src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/5448b9ac9_generated_image.png",
    alt: "Implantswiss",
  },
  {
    src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/8d346a7ef_generated_image.png",
    alt: "Dentsply Sirona",
  },
  {
    src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/486dfa3b0_generated_image.png",
    alt: "ISO",
  },
  {
    src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/da0c69839_generated_image.png",
    alt: "Kültür ve Turizm Bakanlığı",
  },
  {
    src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/53f8c5c2d_generated_image.png",
    alt: "Türk Patent",
  },
  {
    src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/1d037142f_generated_image.png",
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
                className="max-h-16 max-w-[150px] w-full object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}