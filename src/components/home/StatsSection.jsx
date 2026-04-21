import { motion } from "framer-motion";

const logos = [
  {
    src: "https://oneclinic.co/wp-content/uploads/2025/08/cert-3.png",
    alt: "Sertifika 3",
  },
  {
    src: "https://oneclinic.co/wp-content/uploads/2025/08/iso1.png",
    alt: "ISO",
  },
  {
    src: "https://oneclinic.co/wp-content/uploads/2025/08/cert-4-1.png",
    alt: "Sertifika 4",
  },
  {
    src: "https://oneclinic.co/wp-content/uploads/2025/08/cert-2.png",
    alt: "Sertifika 2",
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 font-inter overflow-hidden" style={{ backgroundColor: "#f0ece6" }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center justify-items-center">
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-40 max-w-[220px] w-full object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}