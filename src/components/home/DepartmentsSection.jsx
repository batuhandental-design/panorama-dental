import { motion } from "framer-motion";

const departments = [
  "Diş Tedavileri",
  "Estetik Cerrahi",
  "Saç Ekimi",
  "Obezite Cerrahisi",
  "Diyabet Cerrahisi",
  "Göz Tedavisi",
];

export default function DepartmentsSection() {
  return (
    <section className="py-20 bg-[#f7f3ef] font-inter">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">Bölümlerimiz</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2419] font-playfair mb-4">
            Tedavi Alanlarımız
          </h2>
          <p className="text-[#6b5e52] max-w-2xl mx-auto leading-relaxed">
            Panorama Dental uluslararası sağlık turizmi yetki belgesine sahiptir.
            Türkiye İstanbul'daki en iyi sağlık hizmetini almak için Panorama Dental'i ziyaret edin.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {departments.map((dept, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-gradient-to-br from-[#ede8e0] to-[#e4dcd2] border border-[#d4c9bc] rounded-xl p-6 text-center hover:border-primary/30 transition-all group"
            >
              <h3 className="text-[#2d2419] font-semibold group-hover:text-[#8B6840] transition-colors">{dept}</h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}