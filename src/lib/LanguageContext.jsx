import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const translations = {
  tr: {
    servicesLabel: "Tedavilerimiz",
    servicesTitle: "Diş Tedavi Hizmetlerimiz",
    servicesDesc: "Kapsamlı diş sağlığı hizmetlerimizle ağız sağlığınızı ve estetik gülüşünüzü güvence altına alın.",
    exploreBtn: "Detaylı İncele →",
    services: [
      { title: "Diş İmplantı", desc: "Eksik dişleriniz için All-on-4 ve All-on-6 sistemleriyle kalıcı çözümler." },
      { title: "Hollywood Gülüşü", desc: "Porselen laminate ve zirkonyum kaplama ile kusursuz diş tasarımı." },
      { title: "Diş Beyazlatma", desc: "Laser beyazlatma ile profesyonel ve hızlı sonuçlar." },
      { title: "Zirkonyum Kaplama", desc: "Estetik ve dayanıklı zirkonyum kaplama ile doğal görünüm." },
      { title: "Kemik Grefti", desc: "Diş implantı için kemik yenileme ve sinus lifting işlemleri." },
      { title: "Diş Teli & Ortodonti", desc: "Şeffaf plak ve metal tel ile estetik diş hizalama tedavileri." },
    ],
  },
  en: {
    servicesLabel: "Our Treatments",
    servicesTitle: "Dental Treatment Services",
    servicesDesc: "Ensure your oral health and aesthetic smile with our comprehensive dental health services.",
    exploreBtn: "Explore →",
    services: [
      { title: "Dental Implant", desc: "Permanent solutions for missing teeth with All-on-4 and All-on-6 systems." },
      { title: "Hollywood Smile", desc: "Perfect smile design with porcelain laminates and zirconia crowns." },
      { title: "Teeth Whitening", desc: "Professional and fast results with laser whitening." },
      { title: "Zirconia Crown", desc: "Natural appearance with aesthetic and durable zirconia crowns." },
      { title: "Bone Graft", desc: "Bone regeneration and sinus lifting procedures for dental implants." },
      { title: "Braces & Orthodontics", desc: "Aesthetic teeth alignment with clear aligners and metal braces." },
    ],
  },
  de: {
    servicesLabel: "Unsere Behandlungen",
    servicesTitle: "Zahnmedizinische Leistungen",
    servicesDesc: "Sichern Sie Ihre Mundgesundheit und Ihr ästhetisches Lächeln mit unseren umfassenden Dienstleistungen.",
    exploreBtn: "Mehr erfahren →",
    services: [
      { title: "Zahnimplantat", desc: "Dauerhafte Lösungen für fehlende Zähne mit All-on-4 und All-on-6 Systemen." },
      { title: "Hollywood-Lächeln", desc: "Perfektes Lächeln-Design mit Porzellanschalen und Zirkonkronen." },
      { title: "Zahnaufhellung", desc: "Professionelle und schnelle Ergebnisse mit Laser-Bleaching." },
      { title: "Zirkonkrone", desc: "Natürliches Aussehen mit ästhetischen und haltbaren Zirkonkronen." },
      { title: "Knochentransplantat", desc: "Knochenregeneration und Sinuslift für Zahnimplantate." },
      { title: "Zahnspange & Kieferorthopädie", desc: "Ästhetische Zahnkorrektur mit transparenten und Metallspangen." },
    ],
  },
  ar: {
    servicesLabel: "علاجاتنا",
    servicesTitle: "خدمات علاج الأسنان",
    servicesDesc: "حافظ على صحة فمك وابتسامتك الجمالية من خلال خدماتنا الشاملة لصحة الأسنان.",
    exploreBtn: "استكشف →",
    services: [
      { title: "زراعة الأسنان", desc: "حلول دائمة للأسنان المفقودة بأنظمة All-on-4 وAll-on-6." },
      { title: "ابتسامة هوليوود", desc: "تصميم ابتسامة مثالية بالقشور الخزفية وتيجان الزركونيا." },
      { title: "تبييض الأسنان", desc: "نتائج احترافية وسريعة بتبييض الليزر." },
      { title: "تاج الزركونيا", desc: "مظهر طبيعي بتيجان الزركونيا الجمالية والمتينة." },
      { title: "زراعة العظام", desc: "تجديد العظام ورفع الجيب الأنفي لزراعة الأسنان." },
      { title: "تقويم الأسنان", desc: "محاذاة الأسنان الجمالية بمحاذيات شفافة وتقويم معدني." },
    ],
  },
  es: {
    servicesLabel: "Nuestros Tratamientos",
    servicesTitle: "Servicios de Tratamiento Dental",
    servicesDesc: "Asegure su salud bucal y sonrisa estética con nuestros servicios integrales de salud dental.",
    exploreBtn: "Explorar →",
    services: [
      { title: "Implante Dental", desc: "Soluciones permanentes para dientes perdidos con sistemas All-on-4 y All-on-6." },
      { title: "Sonrisa Hollywood", desc: "Diseño de sonrisa perfecto con carillas de porcelana y coronas de zirconio." },
      { title: "Blanqueamiento Dental", desc: "Resultados profesionales y rápidos con blanqueamiento láser." },
      { title: "Corona de Zirconio", desc: "Apariencia natural con coronas de zirconio estéticas y duraderas." },
      { title: "Injerto Óseo", desc: "Regeneración ósea y elevación de seno para implantes dentales." },
      { title: "Ortodoncia", desc: "Alineación dental estética con alineadores transparentes y brackets metálicos." },
    ],
  },
  it: {
    servicesLabel: "I Nostri Trattamenti",
    servicesTitle: "Servizi di Cura Dentale",
    servicesDesc: "Garantisci la tua salute orale e il tuo sorriso estetico con i nostri servizi dentali completi.",
    exploreBtn: "Scopri →",
    services: [
      { title: "Impianto Dentale", desc: "Soluzioni permanenti per denti mancanti con sistemi All-on-4 e All-on-6." },
      { title: "Sorriso Hollywood", desc: "Design del sorriso perfetto con faccette in porcellana e corone in zirconio." },
      { title: "Sbiancamento Dentale", desc: "Risultati professionali e veloci con sbiancamento laser." },
      { title: "Corona in Zirconio", desc: "Aspetto naturale con corone in zirconio estetiche e durature." },
      { title: "Innesto Osseo", desc: "Rigenerazione ossea e rialzo del seno per impianti dentali." },
      { title: "Ortodonzia", desc: "Allineamento dentale estetico con allineatori trasparenti e apparecchi fissi." },
    ],
  },
  fr: {
    servicesLabel: "Nos Traitements",
    servicesTitle: "Services de Soins Dentaires",
    servicesDesc: "Assurez votre santé bucco-dentaire et votre sourire esthétique avec nos services dentaires complets.",
    exploreBtn: "Explorer →",
    services: [
      { title: "Implant Dentaire", desc: "Solutions permanentes pour les dents manquantes avec les systèmes All-on-4 et All-on-6." },
      { title: "Sourire Hollywood", desc: "Design parfait du sourire avec des facettes en porcelaine et des couronnes en zircone." },
      { title: "Blanchiment Dentaire", desc: "Résultats professionnels et rapides avec le blanchiment au laser." },
      { title: "Couronne en Zircone", desc: "Aspect naturel avec des couronnes en zircone esthétiques et durables." },
      { title: "Greffe Osseuse", desc: "Régénération osseuse et élévation du sinus pour les implants dentaires." },
      { title: "Orthodontie", desc: "Alignement dentaire esthétique avec des aligneurs transparents et des appareils métalliques." },
    ],
  },
  ru: {
    servicesLabel: "Наши Услуги",
    servicesTitle: "Стоматологические Услуги",
    servicesDesc: "Обеспечьте здоровье полости рта и эстетическую улыбку с нашими комплексными стоматологическими услугами.",
    exploreBtn: "Подробнее →",
    services: [
      { title: "Зубной имплант", desc: "Постоянные решения для отсутствующих зубов с системами All-on-4 и All-on-6." },
      { title: "Голливудская улыбка", desc: "Идеальный дизайн улыбки с фарфоровыми винирами и циркониевыми коронками." },
      { title: "Отбеливание зубов", desc: "Профессиональные и быстрые результаты с лазерным отбеливанием." },
      { title: "Циркониевая коронка", desc: "Естественный вид с эстетичными и прочными циркониевыми коронками." },
      { title: "Костная пластика", desc: "Регенерация кости и синус-лифтинг для зубных имплантов." },
      { title: "Ортодонтия", desc: "Эстетическое выравнивание зубов с прозрачными элайнерами и брекетами." },
    ],
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("tr");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}