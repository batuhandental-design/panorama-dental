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
  null,
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
    >
      <div 
        className="border border-[#d4c9bc] rounded-2xl p-5 text-center hover:border-[#8B6840]/30 transition-all flex flex-col"
        style={{
          backgroundImage: photo ? `url(${photo})` : 'none',
          backgroundColor: '#ede8e0',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-16 h-16 mx-auto bg-[#8B6840]/10 rounded-full flex items-center justify-center mb-3 text-2xl">🦷</div>
        <h3 className="text-sm font-bold text-[#2d2419] mb-1 leading-tight">{name}</h3>
        <p className="text-[#8B6840] text-xs font-medium mb-1 leading-tight">{doc.specialty}</p>
        <p className="text-[#9c8e84] text-xs mb-3">{doc.exp}</p>
        <div className="flex items-center justify-center gap-0.5 mb-4">
          {[...Array(5)].map((_, j) => (
            <Star key={j} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          ))}
        </div>
        <a
          href="#contact"
          className="inline-block px-4 py-2 bg-[#8B6840] text-white rounded-lg font-semibold text-xs uppercase tracking-wider hover:bg-[#7a5c38] transition-all mb-3"
        >
          {appointmentBtn}
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center gap-1 text-xs text-[#8B6840] hover:text-[#7a5c38] transition-colors mx-auto"
        >
          <span>{open ? hideBio : showBio}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="mt-3 pt-3 border-t border-[#d4c9bc]">
            <p className="text-[#4a3728] text-xs leading-relaxed text-left">{bio}</p>
          </div>
        )}
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