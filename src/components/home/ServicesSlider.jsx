import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    emoji: "😊",
    slug: "hollywood-gulusu",
    category: "Diş Tedavileri",
    title: "Hollywood Gülüşü",
  },
  {
    emoji: "🦷",
    slug: "dis-implanti",
    category: "Diş Tedavileri",
    title: "Diş İmplantı",
  },
  {
    emoji: "🪥",
    slug: "dis-beyazlatma",
    category: "Diş Tedavileri",
    title: "Diş Beyazlatma",
  },
  {
    emoji: "💎",
    slug: "zirkonyum-kaplama",
    category: "Diş Tedavileri",
    title: "Zirkonyum Kaplama",
  },
  {
    emoji: "🦴",
    slug: "kemik-grefti",
    category: "Diş Tedavileri",
    title: "Kemik Grefti",
  },
  {
    emoji: "😁",
    slug: "dis-teli-ortodonti",
    category: "Diş Tedavileri",
    title: "Diş Teli & Ortodonti",
  },
];

export default function ServicesSlider() {
  return (
    <section className="py-20 bg-[#2c2419] font-inter" id="operations">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link
                to={`/tedavi/${service.slug}`}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                {/* Circle Icon */}
                <div className="w-20 h-20 rounded-full bg-[#8B6840] flex items-center justify-center mb-4 group-hover:bg-[#c9a87c] transition-colors duration-300 shadow-lg shadow-[#8B6840]/30">
                  <span className="text-3xl">{service.emoji}</span>
                </div>
                {/* Category */}
                <p className="text-[#9c8e84] text-xs uppercase tracking-wider mb-1 font-medium">
                  {service.category}
                </p>
                {/* Title */}
                <h3 className="text-white font-bold text-base leading-tight group-hover:text-[#c9a87c] transition-colors duration-300">
                  {service.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}