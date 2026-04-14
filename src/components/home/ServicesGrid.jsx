import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    emoji: "✨",
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
    emoji: "💎",
    slug: "zirkonyum-kaplama",
    category: "Diş Tedavileri",
    title: "Zirkonyum Kaplama",
  },
  {
    emoji: "🪥",
    slug: "dis-beyazlatma",
    category: "Diş Tedavileri",
    title: "Diş Beyazlatma",
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

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-[#2c2419] font-inter" id="services">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#c9a87c] text-sm uppercase tracking-[0.3em] mb-3 font-medium">Tedavilerimiz</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair">
            Diş Tedavi Hizmetlerimiz
          </h2>
          <p className="text-[#b0a090] mt-4 max-w-xl mx-auto">
            Kapsamlı diş sağlığı hizmetlerimizle ağız sağlığınızı ve estetik gülüşünüzü güvence altına alın.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <Link
                to={`/tedavi/${service.slug}`}
                className="group flex flex-col items-start gap-3 cursor-pointer"
              >
                {/* Icon circle */}
                <div className="w-16 h-16 rounded-full bg-[#8B6840]/25 border border-[#c9a87c]/30 flex items-center justify-center text-2xl group-hover:bg-[#8B6840]/50 group-hover:border-[#c9a87c]/60 transition-all duration-300">
                  {service.emoji}
                </div>

                {/* Category */}
                <p className="text-[#c9a87c] text-xs font-medium uppercase tracking-wider mt-1">
                  {service.category}
                </p>

                {/* Title */}
                <h3 className="text-white text-lg font-bold font-playfair leading-snug group-hover:text-[#c9a87c] transition-colors duration-300">
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