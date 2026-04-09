import { motion } from "framer-motion";
import { UserCheck, Star } from "lucide-react";

export default function DoctorSection() {
  return (
    <section className="py-20 bg-[#ede8e0] font-inter">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">Doktorlarımız</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2419] font-playfair mb-4">
            Tercih ettiğiniz doktoru seçin
          </h2>
          <p className="text-[#6b5e52] max-w-lg mx-auto">
            Birkaç dakika içinde bir görüşme ayarlayın.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-gradient-to-br from-[#f7f3ef] to-[#e4dcd2] border border-[#d4c9bc] rounded-2xl p-8 text-center hover:border-[#8B6840]/30 transition-all">
            <div className="w-24 h-24 mx-auto bg-[#8B6840]/10 rounded-full flex items-center justify-center mb-6">
              <UserCheck className="w-12 h-12 text-[#8B6840]" />
            </div>
            <h3 className="text-xl font-bold text-[#2d2419] mb-1">Dr. Esranur Çelik</h3>
            <p className="text-[#8B6840] text-sm mb-4">Uzman Diş Hekimi</p>
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-[#8B6840] text-white rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-[#7a5c38] transition-all shadow-lg shadow-[#8B6840]/20"
            >
              Randevu Al
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}