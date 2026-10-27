import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const topPhotos = [
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/bc7b56a22_4.png",
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/7c6ef9e67_1.png",
];

const photos = [
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/be39d9a74_3.png",
  null,
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/91f5cd8c1_2.png",
  null,
];



function DoctorCard({ doc, name, bio, appointmentBtn, showBio, hideBio, index, photo }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.08 }}
      className="group"
    >
      <div className="relative rounded-2xl overflow-hidden cursor-pointer" style={{ aspectRatio: "3/4" }}>
        {/* Fotoğraf veya placeholder */}
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#ede8e0] flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-[#8B6840]/10 rounded-full flex items-center justify-center mb-3 text-4xl">🦷</div>
          </div>
        )}

        {/* Karanlık overlay — her zaman hafif, hover'da daha koyu */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300" />

        {/* Alt bilgi — her zaman görünür ama hover'da yukarı kayar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-[30%] group-hover:translate-y-0 transition-transform duration-400">
          <h3 className="text-white font-bold text-sm leading-tight mb-1">{name}</h3>
          <p className="text-[#c9a87c] text-xs font-medium leading-tight mb-1">{doc.specialty}</p>
          <p className="text-white/60 text-xs mb-3">{doc.exp}</p>

          {/* Hover'da görünen ekstra içerik */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <div className="flex items-center gap-0.5 mb-3">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-block w-full text-center px-4 py-2 bg-[#8B6840] text-white rounded-lg font-semibold text-xs uppercase tracking-wider hover:bg-[#c9a87c] transition-all mb-2"
            >
              {appointmentBtn}
            </button>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex items-center justify-center gap-1 text-xs text-white/70 hover:text-white transition-colors w-full"
            >
              <span>{open ? hideBio : showBio}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <div className="mt-2 pt-2 border-t border-white/20">
                <p className="text-white/80 text-xs leading-relaxed text-left">{bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DoctorSection() {
  const { t } = useLanguage();

  const extraDoctor = { specialty: t.extraDoctorSpecialty, exp: t.extraDoctorExp };
  const secondDoctor = { specialty: t.doctors[1]?.specialty, exp: t.doctors[1]?.exp };
  const topDocs = [extraDoctor, secondDoctor];
  const bottomDocs = [t.doctors[0], { specialty: t.consultantSpecialty, exp: t.consultantExp }, t.doctors[2], t.doctors[3]];

  return (
    <section className="py-20 bg-[#ede8e0] font-inter" id="doctors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">{t.doctorsLabel}</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#2d2419] font-playfair mb-4">{t.doctorsTitle}</h2>
          <p className="text-[#6b5e52] max-w-lg mx-auto">{t.doctorsDesc}</p>
        </div>

        {/* Üst sıra: Dr. Zeynep Umur & Dr. Elif Gizem Boyalı */}
        <div className="flex justify-center gap-5 mb-5">
          {topDocs.map((doc, i) => (
            <div key={i} className="w-full max-w-[280px]">
              <DoctorCard
                index={i}
                doc={doc}
                name={(t.doctorNames?.top || [])[i]}
                bio={(t.topDoctorBios || [])[i]}
                appointmentBtn={t.appointmentBtn}
                showBio={t.showBio}
                hideBio={t.hideBio}
                photo={topPhotos[i]}
              />
            </div>
          ))}
        </div>

        {/* Alt sıra: diğer doktorlar */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bottomDocs.map((doc, i) => (
            <DoctorCard
              key={i}
              index={i + 2}
              doc={doc}
              name={(t.doctorNames?.bottom || [])[i]}
              bio={(t.doctorBios || [])[i]}
              appointmentBtn={t.appointmentBtn}
              showBio={t.showBio}
              hideBio={t.hideBio}
              photo={photos[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}