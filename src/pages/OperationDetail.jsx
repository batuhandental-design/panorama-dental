import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import WhatsAppButton from "../components/home/WhatsAppButton";
import TopBar from "../components/home/TopBar";
import { useLanguage } from "@/lib/LanguageContext";
import { operationsTranslations } from "@/lib/operationsTranslations";
import { operationDetails } from "@/lib/operationDetails";

const getTranslationKey = (key, lang, defaultLang = 'tr') => {
  const translations = {
    "Tedavi Hakkında": { tr: "Tedavi Hakkında", en: "About the Treatment", de: "Über die Behandlung", ar: "عن العلاج", es: "Sobre el Tratamiento", it: "Sul Trattamento", fr: "À propos du Traitement", ru: "О лечении" },
    "Avantajlar": { tr: "Avantajlar", en: "Benefits", de: "Vorteile", ar: "الفوائد", es: "Beneficios", it: "Vantaggi", fr: "Avantages", ru: "Преимущества" },
    "Ücretsiz Değerlendirme": { tr: "Ücretsiz Değerlendirme", en: "Free Evaluation", de: "Kostenlose Bewertung", ar: "تقييم مجاني", es: "Evaluación Gratuita", it: "Valutazione Gratuita", fr: "Évaluation Gratuite", ru: "Бесплатная оценка" },
    "Uzman ekibimiz sizi ücretsiz olarak değerlendirsin ve kişisel tedavi planınızı oluştursun.": { tr: "Uzman ekibimiz sizi ücretsiz olarak değerlendirsin ve kişisel tedavi planınızı oluştursun.", en: "Let our expert team evaluate you for free and create your personal treatment plan.", de: "Lassen Sie unser Expertenteam Sie kostenlos bewerten und Ihren persönlichen Behandlungsplan erstellen.", ar: "دع فريقنا المتخصص يقيمك مجاناً وينشئ خطة علاجك الشخصية.", es: "Deje que nuestro equipo de expertos lo evalúe de forma gratuita y cree su plan de tratamiento personalizado.", it: "Lascia che il nostro team di esperti ti valuti gratuitamente e crei il tuo piano di trattamento personalizzato.", fr: "Laissez notre équipe d'experts vous évaluer gratuitement et créer votre plan de traitement personnel.", ru: "Позвольте нашей команде экспертов бесплатно оценить вас и создать ваш личный план лечения." },
    "WhatsApp ile Yaz": { tr: "WhatsApp ile Yaz", en: "Write on WhatsApp", de: "Auf WhatsApp schreiben", ar: "اكتب على WhatsApp", es: "Escribir en WhatsApp", it: "Scrivi su WhatsApp", fr: "Écrire sur WhatsApp", ru: "Написать в WhatsApp" },
    "Hemen Ara": { tr: "Hemen Ara", en: "Call Now", de: "Jetzt anrufen", ar: "اتصل الآن", es: "Llamar Ahora", it: "Chiama Ora", fr: "Appelez Maintenant", ru: "Позвоните Сейчас" },
    "Ana Sayfaya Dön": { tr: "Ana Sayfaya Dön", en: "Back to Home", de: "Zurück zur Startseite", ar: "العودة إلى الرئيسية", es: "Volver a Inicio", it: "Torna a Casa", fr: "Retour à l'Accueil", ru: "Вернуться на главную" },
    "Operasyon bulunamadı": { tr: "Operasyon bulunamadı", en: "Operation not found", de: "Operation nicht gefunden", ar: "لم يتم العثور على العملية", es: "Operación no encontrada", it: "Operazione non trovata", fr: "Opération introuvable", ru: "Операция не найдена" }
  };
  return (translations[key]?.[lang] || translations[key]?.[defaultLang] || key);
};

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#e0d8d0] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-[#f7f3ef] transition-colors"
      >
        <span className="text-[#2d2419] font-semibold text-sm">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-[#8B6840] flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#8B6840] flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 py-4 bg-[#faf7f4] border-t border-[#e0d8d0]">
          <p className="text-[#6b5e52] text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function OperationDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  
  // Get translations for current language
  const translations = operationsTranslations[lang] || operationsTranslations.tr;
  const operation = translations[slug];

  // Get detailed content (preop, postop, faq, intro)
  const detailLang = operationDetails[lang] || operationDetails.tr;
  const detail = detailLang?.[slug] || null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!operation) {
    return (
      <div className="min-h-screen bg-[#f7f3ef] flex flex-col">
        <TopBar />
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl mb-4">🏥</p>
            <h2 className="text-2xl font-bold text-[#2d2419] mb-4">{getTranslationKey("Operasyon bulunamadı", lang)}</h2>
            <Link to="/" className="text-[#8B6840] underline">{getTranslationKey("Ana Sayfaya Dön", lang)}</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f3ef] font-inter">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <div
        className="relative py-24 flex flex-col items-center justify-center text-center px-4"
        style={{ background: "linear-gradient(135deg, #2c2419 0%, #4a3728 50%, #3d3028 100%)" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#c9a87c] text-sm uppercase tracking-[0.3em] mb-3 font-medium"
        >
          {operation.category}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white font-playfair mb-6"
        >
          {operation.title}
        </motion.h1>
        <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-[#c9a87c] transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          {getTranslationKey("Ana Sayfaya Dön", lang)}
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-[#e0d8d0] rounded-2xl p-8 shadow-sm mb-8"
        >
          <h2 className="text-2xl font-bold text-[#2d2419] font-playfair mb-4">{getTranslationKey("Tedavi Hakkında", lang)}</h2>
          <p className="text-[#6b5e52] leading-relaxed text-[15px]">{operation.description}</p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white border border-[#e0d8d0] rounded-2xl p-8 shadow-sm mb-8"
        >
          <h2 className="text-2xl font-bold text-[#2d2419] font-playfair mb-6">{getTranslationKey("Avantajlar", lang)}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {operation.benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#f7f3ef] rounded-xl">
                <div className="w-2 h-2 rounded-full bg-[#8B6840] flex-shrink-0" />
                <span className="text-[#4a3728] text-sm font-medium">{b}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Intro (detailed) */}
        {detail?.intro && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-[#2c2419] border border-[#3d3028] rounded-2xl p-8 shadow-sm mb-8"
          >
            <p className="text-[#c9bfb4] leading-relaxed text-[15px]">{detail.intro}</p>
          </motion.div>
        )}

        {/* Pre-Op */}
        {detail?.preop && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white border border-[#e0d8d0] rounded-2xl p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-bold text-[#2d2419] font-playfair mb-6">
              {detail.preop.title}
            </h2>
            <div className="space-y-4">
              {detail.preop.items.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-[#f7f3ef] rounded-xl">
                  <div className="w-7 h-7 rounded-full bg-[#8B6840] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-[#2d2419] font-semibold text-sm mb-1">{item.heading}</p>
                    <p className="text-[#6b5e52] text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Post-Op */}
        {detail?.postop && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="bg-white border border-[#e0d8d0] rounded-2xl p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-bold text-[#2d2419] font-playfair mb-6">
              {detail.postop.title}
            </h2>
            <div className="space-y-4">
              {detail.postop.items.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-[#f7f3ef] rounded-xl">
                  <div className="w-7 h-7 rounded-full border-2 border-[#8B6840] text-[#8B6840] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-[#2d2419] font-semibold text-sm mb-1">{item.heading}</p>
                    <p className="text-[#6b5e52] text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* FAQ */}
        {detail?.faq && detail.faq.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-[#2d2419] font-playfair mb-6">
              {lang === "tr" ? "Sık Sorulan Sorular" :
               lang === "de" ? "Häufig gestellte Fragen" :
               lang === "ar" ? "الأسئلة الشائعة" :
               lang === "ru" ? "Часто задаваемые вопросы" :
               "Frequently Asked Questions"}
            </h2>
            <div className="space-y-3">
              {detail.faq.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl text-center px-8 py-14"
          style={{ background: "linear-gradient(135deg, #2c2419 0%, #4a3728 50%, #3d3028 100%)" }}
        >
          <p className="text-[#c9a87c] text-xs uppercase tracking-[0.25em] mb-3 font-semibold">{getTranslationKey("Ücretsiz Değerlendirme", lang)}</p>
          <h3 className="text-white text-2xl font-bold font-playfair mb-3">{operation.title}</h3>
          <p className="text-[#b0a090] text-sm mb-8 max-w-lg mx-auto">
            {getTranslationKey("Uzman ekibimiz sizi ücretsiz olarak değerlendirsin ve kişisel tedavi planınızı oluştursun.", lang)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/905551896062"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bb5a] transition-all shadow-lg text-sm uppercase tracking-wider"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.849L.057 23.882l6.204-1.448A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.876 9.876 0 01-5.034-1.376l-.361-.214-3.741.873.937-3.63-.235-.374A9.851 9.851 0 012.106 12C2.106 6.525 6.525 2.106 12 2.106c5.476 0 9.894 4.419 9.894 9.894 0 5.476-4.418 9.894-9.894 9.894z"/>
              </svg>
              {getTranslationKey("WhatsApp ile Yaz", lang)}
            </a>
            <a
              href="tel:+905551896062"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#c9a87c] hover:text-[#c9a87c] transition-all text-sm uppercase tracking-wider"
            >
              <Phone className="w-4 h-4" />
              {getTranslationKey("Hemen Ara", lang)}
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}