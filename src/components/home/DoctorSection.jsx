import { motion } from "framer-motion";
import { Star } from "lucide-react";

const doctors = [
{
  name: "Dr. Esranur Çelik",
  specialty: "Estetik Diş Hekimi & İmplantoloji Uzmanı",
  exp: "12 yıl deneyim"
},
{
  name: "Dr. Mehmet Yılmaz",
  specialty: "Ortodonti Uzmanı",
  exp: "8 yıl deneyim"
},
{
  name: "Dr. Ayşe Kaya",
  specialty: "Periodontoloji & Diş Eti Uzmanı",
  exp: "10 yıl deneyim"
}];


export default function DoctorSection() {
  return (
    <section className="py-20 bg-[#ede8e0] font-inter">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">Uzmanlarımız</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2419] font-playfair mb-4">
            Diş Hekimlerimizle Tanışın
          </h2>
          <p className="text-[#6b5e52] max-w-lg mx-auto">
            Tercih ettiğiniz doktoru seçin ve birkaç dakika içinde randevu alın.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {doctors.map((doc, i) =>
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}>
            
              <div className="bg-gradient-to-br from-[#f7f3ef] to-[#e4dcd2] border border-[#d4c9bc] rounded-2xl p-6 text-center hover:border-[#8B6840]/30 transition-all">
                <div className="w-20 h-20 mx-auto bg-[#8B6840]/10 rounded-full flex items-center justify-center mb-4 text-3xl">
                  🦷
                </div>
                <h3 className="text-lg font-bold text-[#2d2419] mb-1">{doc.name}</h3>
                <p className="text-[#8B6840] text-xs font-medium mb-1">{doc.specialty}</p>
                <p className="text-[#9c8e84] text-xs mb-3">{doc.exp}</p>
                <div className="flex items-center justify-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) =>
                <Star key={j} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                )}
                </div>
                <a
                href="#contact"
                className="inline-block px-5 py-2 bg-[#8B6840] text-white rounded-lg font-semibold text-xs uppercase tracking-wider hover:bg-[#7a5c38] transition-all">
                
                  Randevu Al
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}