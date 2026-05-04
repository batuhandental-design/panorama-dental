import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const reviews = [
  { initial: "S", text: "Çok ilgili tatlı dilli güler yüzlü. İşinde başarılı. Tedaviler süresinde hiç sorun yaşamadım." },
  { initial: "Ç", text: "Dr Zeynep hanım işinde olsun insanlara yaklaşımı olsun çok iyi bir doktor. Teşekkür ediyorum." },
  { initial: "A", text: "Deneyimi anlatmaya gerek yok, yıllardır Zeynep Hoca'yı tercih ediyorum." },
  { initial: "C", text: "Zeynep Hanım çok iyi bir doktor. Kendisine çok teşekkür ediyorum." },
  { initial: "S", text: "Zeynep ve tüm ekip çok harikalar. Hiç sorun yaşamadım, gönül rahatlığıyla tercih edebilir herkes." },
  { initial: "Ç", text: "Daha önceden de işlemler yaptırıp çok memnun kaldığım işin ehli bir doktor." },
  { initial: "Z", text: "Zeynep hocamdan çok memnun oldum. Diğer çalışanlardan da memnun kaldım, hepinizin ellerine sağlık." },
  { initial: "K", text: "Doktor hanım önce güler yüzü insanı rahatlatıyor, sonra yaptığı iş çok iyi, eli hafif. Çok teşekkür ederim." },
  { initial: "M", text: "Çok sevdiğim, evimizden biri gibi tatlı dilli çok samimi bir doktor. Dişçiden korkardım ama şimdi severek gidiyorum." },
  { initial: "F", text: "Bana göre iyi bir hekim. Diş rahatsızlığı olanlara tavsiye ederim." },
  { initial: "Z", text: "Zeynep hocadan çok memnun kaldım, eşi benzeri bulunmaz, hastasıyla çok iyi ilgileniyor." },
  { initial: "Ö", text: "Zeynep hanım gayet ilgili, işinde profesyonel ve sabırlı bir doktor, kendisine çok teşekkür ederim." },
  { initial: "M", text: "İlgi, alaka ve samimi bir ortam. Tedavi sürecinde detaylı açıklamaları ve ilgisinden dolayı teşekkürler." },
  { initial: "N", text: "İmplant süreci sorunsuz devam ediyor, hocama çok teşekkürler. Dişlerimle ilgili tüm sıkıntılar için geldiğim bir yer, çok memnunum." },
  { initial: "M", text: "Zeynep hocam gerçekten bu işin vakkosu, eli çok hafif, ağrısız bir süreç. Tavsiye üzerine geldim, çok teşekkür ederim." },
  { initial: "H", text: "Hocamız gayet işinin ehli ve çok güzel çalışıyor. Kesinlikle tavsiye ederim, teşekkürler." },
  { initial: "A", text: "Güler yüz ve samimiyetten dolayı teşekkür ederim. Saygılarımla." },
  { initial: "G", text: "İşinde çok başarılı. Şiddetle tavsiye ederim, çalışanlar çok ilgili." },
  { initial: "M", text: "İlgisinden memnun kaldım. Alanında uzman bir doktor." },
  { initial: "D", text: "Mükemmel bir doktor. Eli çok hafif, işini çok iyi yapan, severek yapan bir doktor." },
];

const STEP = 3; // 3 kart aynı anda

const sectionTitles = {
  tr: { badge: "Hasta Yorumları", title: "Hastalarımız Ne Diyor?", sub: "244 değerlendirme · 5.0 ★", source: "doktorsitesi.com'dan gerçek yorumlar" },
  en: { badge: "Patient Reviews", title: "What Our Patients Say?", sub: "244 reviews · 5.0 ★", source: "Real reviews from doktorsitesi.com" },
  de: { badge: "Patientenbewertungen", title: "Was sagen unsere Patienten?", sub: "244 Bewertungen · 5.0 ★", source: "Echte Bewertungen von doktorsitesi.com" },
  ar: { badge: "تقييمات المرضى", title: "ماذا يقول مرضانا؟", sub: "244 تقييم · 5.0 ★", source: "تقييمات حقيقية من doktorsitesi.com" },
  es: { badge: "Opiniones de Pacientes", title: "¿Qué dicen nuestros pacientes?", sub: "244 reseñas · 5.0 ★", source: "Reseñas reales de doktorsitesi.com" },
  it: { badge: "Recensioni Pazienti", title: "Cosa dicono i nostri pazienti?", sub: "244 recensioni · 5.0 ★", source: "Recensioni reali da doktorsitesi.com" },
  fr: { badge: "Avis Patients", title: "Que disent nos patients?", sub: "244 avis · 5.0 ★", source: "Avis réels de doktorsitesi.com" },
  ru: { badge: "Отзывы пациентов", title: "Что говорят наши пациенты?", sub: "244 отзыва · 5.0 ★", source: "Реальные отзывы с doktorsitesi.com" },
};

export default function PatientReviews() {
  const { lang } = useLanguage();
  const txt = sectionTitles[lang] || sectionTitles.tr;
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const autoRef = useRef(null);
  const totalPages = Math.ceil(reviews.length / STEP);

  const go = (d) => {
    setDir(d);
    setPage((p) => (p + d + totalPages) % totalPages);
  };

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => { setDir(1); setPage((p) => (p + 1) % totalPages); }, 4500);
  };

  useEffect(() => {
    autoRef.current = setInterval(() => { setDir(1); setPage((p) => (p + 1) % totalPages); }, 4500);
    return () => clearInterval(autoRef.current);
  }, [totalPages]);

  const current = reviews.slice(page * STEP, page * STEP + STEP);

  const variants = {
    enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className="py-20 font-inter overflow-hidden" style={{ background: "#f7f3ef" }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-10 h-0.5 bg-[#c9a87c] mx-auto mb-5" />
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">{txt.badge}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2419] font-playfair mb-3">{txt.title}</h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <p className="text-[#8B6840] font-semibold text-sm">{txt.sub}</p>
          <p className="text-[#9c8e84] text-xs mt-1">{txt.source}</p>
        </div>

        {/* Cards */}
        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={page}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid md:grid-cols-3 gap-6"
            >
              {current.map((r, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-[#e0d8d0] shadow-sm flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#8B6840] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {r.initial}
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#4a3728] text-sm leading-relaxed flex-grow">"{r.text}"</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > page ? 1 : -1); setPage(i); resetAuto(); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === page ? 20 : 8,
                height: 8,
                background: i === page ? "#8B6840" : "rgba(139,104,64,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}