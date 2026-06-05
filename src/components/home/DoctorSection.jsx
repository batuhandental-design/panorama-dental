import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const names = [
  "Dr. Zeynep Umur",
  "Dr. Ömer Karayakalı",
  "Dr. Elif Gizem Boyalı",
  "Dr. Süleyman Karataş",
  "Dr. Arzu Dilan Yıldırım",
];

const photos = [
  null,
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/be39d9a74_3.png",
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/7c6ef9e67_1.png",
  null,
  null,
];

const bios = [
  "Dr. Zeynep Umur, İstanbul Üniversitesi Diş Hekimliği Fakültesi mezunudur. 10 yılı aşkın klinik deneyimiyle estetik diş hekimliği ve implantoloji alanında uzmanlaşmış olup Hollywood Gülüşü ve zirkonyum kaplama tedavilerinde binlerce başarılı vakaya imza atmıştır. Uluslararası konferanslarda sunum yapan Dr. Umur, hasta odaklı yaklaşımıyla tanınmaktadır.",
  "Dr. Ömer Karayakalı, Hacettepe Üniversitesi'nde ortodonti uzmanlık eğitimini tamamlamıştır. Şeffaf plak (clear aligner) tedavileri ve metal/seramik tel uygulamalarında 8 yılı aşkın deneyime sahiptir. Yurt dışından gelen hastalara online konsültasyon sağlayarak kişiselleştirilmiş tedavi planları hazırlamaktadır.",
  "Dr. Elif Gizem Boyalı, Girne Üniversitesi Diş Hekimliği Fakültesi'nden mezun olmuştur. 8 yıldır aktif olarak diş hekimi olarak çalışmakta olup; kanal tedavisi, dolgu uygulamaları, protez tedavileri ve diş eti hastalıklarının teşhis ve tedavisi alanlarında hizmet vermektedir. Hastalarına konforlu, güvenilir ve güncel tedavi yaklaşımları sunmayı hedeflemektedir.",
  "Dr. Süleyman Karataş, Ankara Üniversitesi Ağız, Diş ve Çene Cerrahisi uzmanıdır. İmplant cerrahisi, sinüs lifting ve karmaşık çene cerrahisi operasyonlarında 9 yılı aşkın deneyimiyle tanınan Dr. Karataş, 3D tomografi rehberliğinde hassas cerrahi protokoller uygulamaktadır.",
  "Dr. Arzu Dilan Yıldırım, İstanbul Üniversitesi-Cerrahpaşa Protetik Diş Hekimliği bölümü mezunudur. All-on-4, All-on-6 sistemleri ve tam protez uygulamalarında 7 yıllık deneyime sahip olan Dr. Yıldırım, her hastaya özel dijital gülüş tasarımı sunmaktadır.",
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
            <a
              href="#contact"
              className="inline-block w-full text-center px-4 py-2 bg-[#8B6840] text-white rounded-lg font-semibold text-xs uppercase tracking-wider hover:bg-[#c9a87c] transition-all mb-2"
            >
              {appointmentBtn}
            </a>
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
  const allDoctors = [extraDoctor, ...t.doctors].slice(0, names.length);

  return (
    <section className="py-20 bg-[#ede8e0] font-inter" id="doctors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">{t.doctorsLabel}</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#2d2419] font-playfair mb-4">{t.doctorsTitle}</h2>
          <p className="text-[#6b5e52] max-w-lg mx-auto">{t.doctorsDesc}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {allDoctors.map((doc, i) => (
            <DoctorCard
              key={i}
              index={i}
              doc={doc}
              name={names[i]}
              bio={bios[i]}
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