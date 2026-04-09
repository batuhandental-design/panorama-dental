import { motion } from "framer-motion";

const stats = [
  { value: "12+", label: "Yıllık Deneyim" },
  { value: "5000+", label: "Mutlu Hasta" },
  { value: "50+", label: "Uzman Doktor" },
  { value: "10K+", label: "Başarılı Operasyon" },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-primary font-inter">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-white mb-2 font-playfair">{stat.value}</p>
              <p className="text-white/80 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}