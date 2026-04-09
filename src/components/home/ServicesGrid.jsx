import { motion } from "framer-motion";
import { Syringe, SmilePlus, Scissors } from "lucide-react";

const services = [
  {
    icon: Syringe,
    title: "İstanbul'daki en iyi plastik cerrahi merkezi",
    link: "#",
    color: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    icon: SmilePlus,
    title: "Diş implantları ve Hollywood gülümsemesi",
    link: "#",
    color: "from-teal-500/20 to-teal-600/5",
  },
  {
    icon: Scissors,
    title: "Saç ekimi için en iyi merkez",
    link: "#",
    color: "from-cyan-500/20 to-cyan-600/5",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-[#111827] font-inter" id="services">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-3 font-medium">Hizmetlerimiz</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair">
            Uzman Tedavi Alanlarımız
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group"
            >
              <div className={`bg-gradient-to-br ${service.color} border border-white/5 rounded-2xl p-8 text-center hover:border-primary/30 transition-all duration-300 h-full flex flex-col`}>
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 font-playfair leading-snug flex-grow">
                  {service.title}
                </h3>
                <a
                  href={service.link}
                  className="inline-block px-6 py-2.5 bg-primary/10 text-primary rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-primary hover:text-white transition-all"
                >
                  Devamını Oku
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}