import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";

const slugs = [
  "dis-implanti",
  "dis-beyazlatma",
  "hollywood-gulusu",
  "zirkonyum-kaplama",
  "kemik-grefti",
  "dis-teli-ortodonti",
];

const serviceImages = [
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/b04473af0_generated_image.png",
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/3be0433ed_generated_image.png",
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/ec0f435c4_generated_image.png",
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/810aaf5da_generated_image.png",
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/09ce4742f_generated_image.png",
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/699e33211_generated_image.png",
];

const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function ServicesGrid() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-[#f7f3ef] font-inter" id="services">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">{t.servicesLabel}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2419] font-playfair">
            {t.servicesTitle}
          </h2>
          <p className="text-[#6b5e52] mt-4 max-w-xl mx-auto">
            {t.servicesDesc}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <Link
                to={`/tedavi/${slugs[i]}`}
                className="bg-gradient-to-br from-[#f7f3ef] to-[#ede8e0] border border-[#d4c9bc] rounded-2xl p-8 text-center hover:border-[#8B6840]/40 hover:shadow-md transition-all duration-300 h-full flex flex-col cursor-pointer block"
              >
                <h3 className="text-xl font-bold text-[#2d2419] mb-3 font-playfair">{service.title}</h3>
                {/* 3D floating image */}
                <div className="flex items-center justify-center mb-5 h-24 overflow-visible">
                  <motion.img
                    src={serviceImages[i]}
                    alt={service.title}
                    variants={floatVariants}
                    animate="animate"
                    transition={{ delay: i * 0.5 }}
                    className="w-20 h-20 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
                <p className="text-[#6b5e52] text-sm leading-relaxed flex-grow mb-5">{service.desc}</p>
                <span className="inline-block px-5 py-2 bg-[#8B6840]/10 text-[#8B6840] rounded-lg font-semibold text-sm uppercase tracking-wider group-hover:bg-[#8B6840] group-hover:text-white transition-all">
                  {t.exploreBtn}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}