import { motion } from "framer-motion";

const departments = [
  "Diş İmplantı",
  "Hollywood Gülüşü",
  "Zirkonyum Kaplama",
  "Diş Beyazlatma",
  "Porselen Laminate",
  "Diş Teli & Ortodonti",
  "Kanal Tedavisi",
  "Diş Eti Tedavisi",
  "Kemik Grefti",
  "All-on-4 / All-on-6",
  "Çocuk Diş Hekimliği",
  "Ağız & Diş Bakımı",
];

export default function DepartmentsSection() {
  return (
    <section className="py-20 bg-[#f7f3ef] font-inter">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">Bölümlerimiz</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2419] font-playfair mb-4">
            Tüm Diş Tedavi Alanlarımız
          </h2>
          <p className="text-[#6b5e52] max-w-2xl mx-auto leading-relaxed">
            Panorama Dental, ağız ve diş sağlığının tüm alanlarında uzman kadrosuyla kapsamlı hizmet sunmaktadır.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {departments.map((dept, i) => (
            <motion.a
              key={i}
              href="#contact"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-gradient-to-br from-[#ede8e0] to-[#e4dcd2] border border-[#d4c9bc] rounded-xl p-5 text-center hover:border-[#8B6840]/40 hover:shadow-sm transition-all group"
            >
              <h3 className="text-[#2d2419] font-semibold text-sm group-hover:text-[#8B6840] transition-colors">{dept}</h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}