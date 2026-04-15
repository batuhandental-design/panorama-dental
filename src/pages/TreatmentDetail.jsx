import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Phone } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { useLanguage } from "@/lib/LanguageContext";

const treatmentsByLang = {
  tr: {
    "dis-implanti": {
      title: "Diş İmplantı", subtitle: "Dental Implant", emoji: "🦷",
      hero: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80",
      description: "Diş implantı, kaybedilen dişlerin en kalıcı ve doğal görünümlü çözümüdür. Titanyum vida şeklindeki implant, çene kemiğine yerleştirilerek doğal diş köküne benzer bir temel oluşturur.",
      benefits: ["Doğal görünüm ve his", "20+ yıl dayanıklılık", "Çevre dişlere zarar vermez", "Kemik erimesini önler", "Yeme-içme rahatlığı", "Özgüven artışı"],
      steps: [
        { step: "1", title: "Muayene & Planlama", desc: "3D tomografi ile kapsamlı ağız analizi ve kişiselleştirilmiş tedavi planı." },
        { step: "2", title: "İmplant Yerleştirme", desc: "Lokal anestezi altında titanyum implantın çene kemiğine uygulanması." },
        { step: "3", title: "İyileşme Süreci", desc: "2–4 aylık osseointegrasyon (kemikle kaynaşma) süreci." },
        { step: "4", title: "Üst Yapı & Teslim", desc: "Zirkonyum veya porselen kron takılarak tamamlanan kusursuz gülüş." },
      ],
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    },
    "hollywood-gulusu": {
      title: "Hollywood Gülüşü", subtitle: "Hollywood Smile", emoji: "✨",
      hero: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
      description: "Hollywood Gülüşü, porselen laminate ve zirkonyum kaplamalar kullanılarak dişlerin şeklini, rengini ve konumunu mükemmelleştiren kapsamlı bir estetik diş tedavisidir.",
      benefits: ["Anında dönüşüm", "Doğal porselen görünümü", "Leke tutmaz yapı", "Minimum diş törpüleme", "10–15 yıl ömür", "Özgüven patlaması"],
      steps: [
        { step: "1", title: "Dijital Gülüş Tasarımı", desc: "Bilgisayar ortamında kişiselleştirilmiş gülüş simülasyonu." },
        { step: "2", title: "Mock-Up Uygulama", desc: "Geçici kaplama ile sonucu önce deneyin, onaylayın." },
        { step: "3", title: "Laminatların Yapıştırılması", desc: "0.3–0.5 mm ince porselen laminatlar dişlere yapıştırılır." },
        { step: "4", title: "Son Rötuşlar", desc: "Renk, şekil ve ısırış kontrolü. Hayalinizdeki gülüş teslim edilir." },
      ],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    },
    "dis-beyazlatma": {
      title: "Diş Beyazlatma", subtitle: "Teeth Whitening", emoji: "🪥",
      hero: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80",
      description: "Profesyonel laser diş beyazlatma ile dişlerinizi 8 tona kadar açın. Güvenli beyazlatma jeli ve LED/laser aktivasyonu ile hızlı ve kalıcı sonuçlar.",
      benefits: ["1 seansta 8 ton açılma", "Diş minesine zarar vermez", "Anında görünür sonuç", "Uzun ömürlü etki", "Ağrısız prosedür", "FDA onaylı ürünler"],
      steps: [
        { step: "1", title: "Diş Yüzeyi Temizliği", desc: "Tartar ve plak temizliği ile beyazlatma öncesi hazırlık." },
        { step: "2", title: "Diş Eti Koruması", desc: "Jel ve ışık bariyeri ile diş etleri korunur." },
        { step: "3", title: "Beyazlatma Jeli & Laser", desc: "Aktif karbojen peroksit jeli uygulanır, laser ile aktive edilir." },
        { step: "4", title: "Koruyucu Flor", desc: "Seans sonunda dişlere güçlendirici flor uygulanır." },
      ],
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    },
    "zirkonyum-kaplama": {
      title: "Zirkonyum Kaplama", subtitle: "Zirconia Crown", emoji: "💎",
      hero: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
      description: "Zirkonyum kaplamalar, metal altyapısız tam seramik yapısıyla en doğal görünümü sunan diş kaplamasıdır. Işık geçirgenliği sayesinde doğal dişten ayırt edilemez.",
      benefits: ["Metal içermez", "Işık geçirgen doğal görünüm", "Alerjik reaksiyon riski sıfır", "Yüksek kırılma direnci", "15+ yıl ömür", "Tam renk uyumu"],
      steps: [
        { step: "1", title: "Diş Hazırlığı", desc: "Minimum diş kesimi ile mükemmel altyapı hazırlanır." },
        { step: "2", title: "Ölçü & Tasarım", desc: "Dijital ağız ölçüsü alınır, CAD/CAM sistemiyle tasarlanır." },
        { step: "3", title: "Geçici Kaplama", desc: "Laboratuvar süreci boyunca geçici estetik kaplama takılır." },
        { step: "4", title: "Kalıcı Yapıştırma", desc: "Zirkonyum kronlar hassas adeziv ile kalıcı olarak yapıştırılır." },
      ],
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    },
    "kemik-grefti": {
      title: "Kemik Grefti", subtitle: "Bone Graft", emoji: "🦴",
      hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
      description: "Kemik grefti, diş kaybına bağlı kemik erimesi olan hastalarda implant uygulaması öncesi kemik hacmini yeniden kazandıran cerrahi bir prosedürdür.",
      benefits: ["İmplant öncesi zemin hazırlar", "Kemik erimesini durdurur", "Yüz konturlarını korur", "Başarı oranı %95+", "Minimal invazif teknikler", "Sinus lifting seçeneği"],
      steps: [
        { step: "1", title: "Kemik Analizi", desc: "3D CBCT tomografi ile kemik yoğunluğu ve hacmi ölçülür." },
        { step: "2", title: "Greft Materyali Seçimi", desc: "Otolog, allograft veya sentetik greft materyali planlanır." },
        { step: "3", title: "Cerrahi Uygulama", desc: "Lokal anestezi altında kemik grefti yerleştirilir." },
        { step: "4", title: "İyileşme & İmplant", desc: "3–6 ay iyileşme sonrası implant uygulamasına geçilir." },
      ],
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    },
    "dis-teli-ortodonti": {
      title: "Diş Teli & Ortodonti", subtitle: "Orthodontics", emoji: "😁",
      hero: "https://images.unsplash.com/photo-1583911546473-407bb47c6b79?w=1200&q=80",
      description: "Modern ortodonti tedavileriyle çarpık, sıkışık veya aralıklı dişlerinizi düzeltin. Şeffaf plaktan metal tele geniş seçenek yelpazesiyle her yaşa uygun çözümler.",
      benefits: ["Şeffaf plak seçeneği", "Görünmez tel teknolojisi", "Her yaşa uygun", "Ağız sağlığını iyileştirir", "Kalıcı sonuçlar", "Dijital simülasyon"],
      steps: [
        { step: "1", title: "Ortodontik Muayene", desc: "Diş modeli, röntgen ve fotoğraf analizi ile kapsamlı değerlendirme." },
        { step: "2", title: "Tedavi Planı", desc: "Kişiselleştirilmiş ortodontik tedavi planı ve süre tahmini." },
        { step: "3", title: "Aparey Uygulaması", desc: "Seçilen sistem (şeffaf plak, metal veya seramik tel) takılır." },
        { step: "4", title: "Retansiyon", desc: "Tedavi sonrası pekiştirici plak ile kalıcı sonuç korunur." },
      ],
      image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80",
    },
  },
  en: {
    "dis-implanti": {
      title: "Dental Implant", subtitle: "Dental Implant", emoji: "🦷",
      hero: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80",
      description: "A dental implant is the most permanent and natural-looking solution for missing teeth. The titanium screw implant is placed in the jawbone, creating a foundation similar to a natural tooth root.",
      benefits: ["Natural look and feel", "20+ year durability", "No damage to adjacent teeth", "Prevents bone loss", "Comfortable eating", "Confidence boost"],
      steps: [
        { step: "1", title: "Examination & Planning", desc: "Comprehensive oral analysis with 3D tomography and personalized treatment plan." },
        { step: "2", title: "Implant Placement", desc: "Placement of titanium implant in the jawbone under local anesthesia." },
        { step: "3", title: "Healing Process", desc: "2–4 months of osseointegration (fusion with bone) process." },
        { step: "4", title: "Crown & Delivery", desc: "Perfect smile completed with zirconia or porcelain crown." },
      ],
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    },
    "hollywood-gulusu": {
      title: "Hollywood Smile", subtitle: "Hollywood Smile", emoji: "✨",
      hero: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
      description: "Hollywood Smile is a comprehensive aesthetic dental treatment that perfects the shape, color and position of teeth using porcelain laminates and zirconia crowns.",
      benefits: ["Instant transformation", "Natural porcelain look", "Stain-resistant", "Minimal tooth shaving", "10–15 year lifespan", "Confidence boost"],
      steps: [
        { step: "1", title: "Digital Smile Design", desc: "Personalized smile simulation in a computer environment." },
        { step: "2", title: "Mock-Up Application", desc: "Try and approve the result first with a temporary veneer." },
        { step: "3", title: "Laminate Bonding", desc: "0.3–0.5 mm thin porcelain laminates are bonded to teeth." },
        { step: "4", title: "Final Touches", desc: "Color, shape and bite check. Your dream smile is delivered." },
      ],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    },
    "dis-beyazlatma": {
      title: "Teeth Whitening", subtitle: "Teeth Whitening", emoji: "🪥",
      hero: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80",
      description: "Brighten your teeth up to 8 shades with professional laser teeth whitening. Safe whitening gel and LED/laser activation for fast and lasting results.",
      benefits: ["8 shades lighter in 1 session", "No enamel damage", "Instant visible result", "Long-lasting effect", "Painless procedure", "FDA approved products"],
      steps: [
        { step: "1", title: "Tooth Surface Cleaning", desc: "Tartar and plaque removal as preparation before whitening." },
        { step: "2", title: "Gum Protection", desc: "Gums are protected with gel and light barrier." },
        { step: "3", title: "Whitening Gel & Laser", desc: "Active carbamide peroxide gel is applied and activated with laser." },
        { step: "4", title: "Protective Fluoride", desc: "Strengthening fluoride is applied to teeth after the session." },
      ],
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    },
    "zirkonyum-kaplama": {
      title: "Zirconia Crown", subtitle: "Zirconia Crown", emoji: "💎",
      hero: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
      description: "Zirconia crowns offer the most natural appearance with their all-ceramic structure without a metal substructure. They are indistinguishable from natural teeth thanks to their light transmittance.",
      benefits: ["Metal-free", "Light-transmitting natural look", "Zero allergic reaction risk", "High fracture resistance", "15+ year lifespan", "Perfect color match"],
      steps: [
        { step: "1", title: "Tooth Preparation", desc: "Perfect substructure prepared with minimal tooth reduction." },
        { step: "2", title: "Impression & Design", desc: "Digital oral impression taken, designed with CAD/CAM system." },
        { step: "3", title: "Temporary Crown", desc: "Temporary aesthetic crown is placed during the lab process." },
        { step: "4", title: "Permanent Bonding", desc: "Zirconia crowns are permanently bonded with precision adhesive." },
      ],
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    },
    "kemik-grefti": {
      title: "Bone Graft", subtitle: "Bone Graft", emoji: "🦴",
      hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
      description: "A bone graft is a surgical procedure that restores bone volume prior to implant placement in patients with bone loss due to tooth loss.",
      benefits: ["Prepares ground for implant", "Stops bone loss", "Preserves facial contours", "95%+ success rate", "Minimally invasive techniques", "Sinus lifting option"],
      steps: [
        { step: "1", title: "Bone Analysis", desc: "Bone density and volume measured with 3D CBCT tomography." },
        { step: "2", title: "Graft Material Selection", desc: "Autologous, allograft or synthetic graft material is planned." },
        { step: "3", title: "Surgical Application", desc: "Bone graft is placed under local anesthesia." },
        { step: "4", title: "Healing & Implant", desc: "Implant placement proceeds after 3–6 months of healing." },
      ],
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    },
    "dis-teli-ortodonti": {
      title: "Braces & Orthodontics", subtitle: "Orthodontics", emoji: "😁",
      hero: "https://images.unsplash.com/photo-1583911546473-407bb47c6b79?w=1200&q=80",
      description: "Correct crooked, crowded or spaced teeth with modern orthodontic treatments. Solutions suitable for all ages with a wide range from clear aligners to metal braces.",
      benefits: ["Clear aligner option", "Invisible braces technology", "Suitable for all ages", "Improves oral health", "Permanent results", "Digital simulation"],
      steps: [
        { step: "1", title: "Orthodontic Examination", desc: "Comprehensive evaluation with dental model, X-ray and photo analysis." },
        { step: "2", title: "Treatment Plan", desc: "Personalized orthodontic treatment plan and duration estimate." },
        { step: "3", title: "Appliance Placement", desc: "Selected system (clear aligner, metal or ceramic braces) is fitted." },
        { step: "4", title: "Retention", desc: "Permanent result preserved with retainer after treatment." },
      ],
      image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80",
    },
  },
  de: {
    "dis-implanti": {
      title: "Zahnimplantat", subtitle: "Dental Implant", emoji: "🦷",
      hero: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80",
      description: "Ein Zahnimplantat ist die dauerhafteste und natürlichste Lösung für fehlende Zähne. Das titanschraubenförmige Implantat wird in den Kieferknochen eingesetzt und bildet ein natürliches Fundament.",
      benefits: ["Natürliches Aussehen & Gefühl", "20+ Jahre Haltbarkeit", "Keine Beschädigung benachbarter Zähne", "Verhindert Knochenschwund", "Komfortables Essen", "Selbstvertrauen stärken"],
      steps: [
        { step: "1", title: "Untersuchung & Planung", desc: "Umfassende Mundanalyse mit 3D-Tomographie und individuellem Behandlungsplan." },
        { step: "2", title: "Implantation", desc: "Einsetzen des Titanimplantats in den Kieferknochen unter Lokalanästhesie." },
        { step: "3", title: "Heilungsprozess", desc: "2–4 Monate Osseointegration (Einwachsen in den Knochen)." },
        { step: "4", title: "Krone & Übergabe", desc: "Perfektes Lächeln mit Zirkon- oder Porzelankrone." },
      ],
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    },
    "hollywood-gulusu": {
      title: "Hollywood-Lächeln", subtitle: "Hollywood Smile", emoji: "✨",
      hero: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
      description: "Das Hollywood-Lächeln ist eine umfassende ästhetische Zahnbehandlung, die die Form, Farbe und Position der Zähne mit Porzellanfacetten und Zirkonkronen perfektioniert.",
      benefits: ["Sofortige Transformation", "Natürliches Porzellanaussehen", "Fleckenresistent", "Minimale Zahnpräparation", "10–15 Jahre Lebensdauer", "Selbstvertrauen stärken"],
      steps: [
        { step: "1", title: "Digitales Lächeln-Design", desc: "Individuelle Lächelnsimulation am Computer." },
        { step: "2", title: "Mock-Up", desc: "Ergebnis zuerst mit provisorischen Veneers testen und genehmigen." },
        { step: "3", title: "Facetten-Bonding", desc: "0,3–0,5 mm dünne Porzellanfacetten werden auf die Zähne geklebt." },
        { step: "4", title: "Letzte Korrekturen", desc: "Farb-, Form- und Bisskontrolle. Ihr Traumlächeln wird übergeben." },
      ],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    },
    "dis-beyazlatma": {
      title: "Zahnaufhellung", subtitle: "Teeth Whitening", emoji: "🪥",
      hero: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80",
      description: "Hellen Sie Ihre Zähne mit professioneller Laser-Zahnaufhellung um bis zu 8 Nuancen auf. Schnelle und dauerhafte Ergebnisse mit sicherem Aufhellungsgel und LED/Laser-Aktivierung.",
      benefits: ["8 Nuancen heller in 1 Sitzung", "Kein Schmelzschaden", "Sofort sichtbares Ergebnis", "Langanhaltende Wirkung", "Schmerzfreies Verfahren", "FDA-zugelassene Produkte"],
      steps: [
        { step: "1", title: "Zahnreinigung", desc: "Zahnstein- und Plaqueentfernung als Vorbereitung." },
        { step: "2", title: "Zahnfleischschutz", desc: "Zahnfleisch wird mit Gel und Lichtbarriere geschützt." },
        { step: "3", title: "Aufhellungsgel & Laser", desc: "Aktives Carbamidperoxid-Gel wird aufgetragen und mit Laser aktiviert." },
        { step: "4", title: "Schutzfluorid", desc: "Stärkendes Fluorid wird nach der Sitzung aufgetragen." },
      ],
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    },
    "zirkonyum-kaplama": {
      title: "Zirkonkrone", subtitle: "Zirconia Crown", emoji: "💎",
      hero: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
      description: "Zirkonkronen bieten mit ihrer vollkeramischen Struktur ohne Metallunterbau das natürlichste Aussehen. Dank ihrer Lichtdurchlässigkeit sind sie von natürlichen Zähnen nicht zu unterscheiden.",
      benefits: ["Metallfrei", "Lichtdurchlässiges natürliches Aussehen", "Kein Allergierisiko", "Hohe Bruchfestigkeit", "15+ Jahre Lebensdauer", "Perfekte Farbübereinstimmung"],
      steps: [
        { step: "1", title: "Zahnpräparation", desc: "Perfekter Unterbau mit minimaler Zahnreduktion." },
        { step: "2", title: "Abformung & Design", desc: "Digitaler Abdruck, Design mit CAD/CAM-System." },
        { step: "3", title: "Provisorische Krone", desc: "Provisorische Krone während des Laborprozesses." },
        { step: "4", title: "Dauerhafte Befestigung", desc: "Zirkonkronen werden mit Präzisionsadhäsiv dauerhaft befestigt." },
      ],
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    },
    "kemik-grefti": {
      title: "Knochentransplantat", subtitle: "Bone Graft", emoji: "🦴",
      hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
      description: "Ein Knochentransplantat ist ein chirurgisches Verfahren zur Wiederherstellung des Knochenvolumens vor der Implantatversorgung bei Patienten mit Knochenschwund.",
      benefits: ["Bereitet Boden für Implantat", "Stoppt Knochenschwund", "Erhält Gesichtskonturen", "95%+ Erfolgsrate", "Minimal-invasive Techniken", "Sinuslift-Option"],
      steps: [
        { step: "1", title: "Knochenanalyse", desc: "Knochendichte und -volumen mit 3D CBCT gemessen." },
        { step: "2", title: "Transplantatauswahl", desc: "Autologes, allogenes oder synthetisches Material geplant." },
        { step: "3", title: "Chirurgische Anwendung", desc: "Knochentransplantat unter Lokalanästhesie eingesetzt." },
        { step: "4", title: "Heilung & Implantat", desc: "Implantat nach 3–6 Monaten Heilung." },
      ],
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    },
    "dis-teli-ortodonti": {
      title: "Zahnspange & Kieferorthopädie", subtitle: "Orthodontics", emoji: "😁",
      hero: "https://images.unsplash.com/photo-1583911546473-407bb47c6b79?w=1200&q=80",
      description: "Korrigieren Sie schiefe, überfüllte oder lückenhafte Zähne mit modernen kieferorthopädischen Behandlungen. Lösungen für alle Altersgruppen.",
      benefits: ["Transparente Schienen", "Unsichtbare Bracket-Technologie", "Für alle Altersgruppen", "Verbessert Mundgesundheit", "Dauerhafte Ergebnisse", "Digitale Simulation"],
      steps: [
        { step: "1", title: "Kieferorthopädische Untersuchung", desc: "Umfassende Bewertung mit Zahnmodell, Röntgen und Fotos." },
        { step: "2", title: "Behandlungsplan", desc: "Individueller kieferorthopädischer Plan und Zeitschätzung." },
        { step: "3", title: "Apparatur", desc: "Gewähltes System (Schiene, Metall- oder Keramikspange) eingesetzt." },
        { step: "4", title: "Retention", desc: "Dauerhaftes Ergebnis mit Retainer nach der Behandlung." },
      ],
      image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80",
    },
  },
  ar: {
    "dis-implanti": {
      title: "زراعة الأسنان", subtitle: "زراعة الأسنان", emoji: "🦷",
      hero: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80",
      description: "زراعة الأسنان هي الحل الأكثر ديمومة وطبيعية لفقدان الأسنان. يُزرع المسمار التيتاني في عظم الفك ليشكل أساساً مشابهاً لجذر السن الطبيعي.",
      benefits: ["مظهر وإحساس طبيعي", "متانة أكثر من 20 عاماً", "لا يؤذي الأسنان المجاورة", "يمنع ضمور العظام", "راحة في الأكل والشرب", "تعزيز الثقة بالنفس"],
      steps: [
        { step: "1", title: "الفحص والتخطيط", desc: "تحليل شامل للفم بالتصوير ثلاثي الأبعاد وخطة علاج مخصصة." },
        { step: "2", title: "زراعة الغرسة", desc: "تركيب الغرسة التيتانية في عظم الفك تحت التخدير الموضعي." },
        { step: "3", title: "مرحلة الشفاء", desc: "عملية الاندماج مع العظم تستغرق 2-4 أشهر." },
        { step: "4", title: "التاج والتسليم", desc: "ابتسامة مثالية بتركيب تاج زركونيا أو بورسلين." },
      ],
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    },
    "hollywood-gulusu": {
      title: "ابتسامة هوليوود", subtitle: "ابتسامة هوليوود", emoji: "✨",
      hero: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
      description: "ابتسامة هوليوود علاج تجميلي شامل يُكمّل شكل ولون ووضع الأسنان باستخدام القشور الخزفية وتيجان الزركونيا.",
      benefits: ["تحول فوري", "مظهر بورسلين طبيعي", "مقاومة للبقع", "حد أدنى من تشذيب الأسنان", "عمر 10-15 سنة", "انفجار من الثقة"],
      steps: [
        { step: "1", title: "تصميم الابتسامة الرقمي", desc: "محاكاة ابتسامة مخصصة على الكمبيوتر." },
        { step: "2", title: "تطبيق النموذج", desc: "جرّب النتيجة أولاً بقشرة مؤقتة وافق عليها." },
        { step: "3", title: "لصق القشور", desc: "قشور بورسلين رفيعة 0.3-0.5 مم تُلصق على الأسنان." },
        { step: "4", title: "اللمسات الأخيرة", desc: "فحص اللون والشكل والعضة. تسليم ابتسامة أحلامك." },
      ],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    },
    "dis-beyazlatma": {
      title: "تبييض الأسنان", subtitle: "تبييض الأسنان", emoji: "🪥",
      hero: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80",
      description: "فتّح أسنانك حتى 8 درجات بتبييض الأسنان بالليزر المهني. نتائج سريعة ودائمة بجل تبييض آمن وتفعيل LED/ليزر.",
      benefits: ["8 درجات أفتح في جلسة واحدة", "لا يضر بالمينا", "نتيجة فورية مرئية", "تأثير طويل الأمد", "إجراء غير مؤلم", "منتجات معتمدة من FDA"],
      steps: [
        { step: "1", title: "تنظيف سطح الأسنان", desc: "إزالة الجير واللويحة كتحضير قبل التبييض." },
        { step: "2", title: "حماية اللثة", desc: "تُحمى اللثة بالجل وحاجز الضوء." },
        { step: "3", title: "جل التبييض والليزر", desc: "يُطبق جل بيروكسيد الكاربامايد ويُفعّل بالليزر." },
        { step: "4", title: "الفلوريد الواقي", desc: "يُطبق فلوريد معزز على الأسنان بعد الجلسة." },
      ],
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    },
    "zirkonyum-kaplama": {
      title: "تاج الزركونيا", subtitle: "تاج الزركونيا", emoji: "💎",
      hero: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
      description: "تيجان الزركونيا توفر أكثر مظهر طبيعي ببنيتها الخزفية الكاملة دون قاعدة معدنية. لا يمكن تمييزها عن الأسنان الطبيعية.",
      benefits: ["خالية من المعدن", "مظهر طبيعي شفاف للضوء", "صفر خطر رد فعل تحسسي", "مقاومة عالية للكسر", "عمر 15+ سنة", "تطابق كامل للألوان"],
      steps: [
        { step: "1", title: "تحضير الأسنان", desc: "تحضير قاعدة مثالية بحد أدنى من تشذيب الأسنان." },
        { step: "2", title: "البصمة والتصميم", desc: "بصمة رقمية للفم، تصميم بنظام CAD/CAM." },
        { step: "3", title: "تاج مؤقت", desc: "يُركب تاج جمالي مؤقت أثناء عملية المختبر." },
        { step: "4", title: "اللصق الدائم", desc: "تُلصق تيجان الزركونيا بصورة دائمة بلاصق دقيق." },
      ],
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    },
    "kemik-grefti": {
      title: "زراعة العظام", subtitle: "زراعة العظام", emoji: "🦴",
      hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
      description: "زراعة العظام إجراء جراحي يستعيد حجم العظم قبل زراعة الأسنان في المرضى الذين يعانون من ضمور العظام.",
      benefits: ["يهيئ الأرض للغرسة", "يوقف ضمور العظام", "يحافظ على ملامح الوجه", "نسبة نجاح 95%+", "تقنيات جراحية صغرى", "خيار رفع الجيب الأنفي"],
      steps: [
        { step: "1", title: "تحليل العظام", desc: "قياس كثافة وحجم العظام بتصوير CBCT ثلاثي الأبعاد." },
        { step: "2", title: "اختيار مادة الطعم", desc: "التخطيط لمادة طعم ذاتية أو خيفية أو اصطناعية." },
        { step: "3", title: "التطبيق الجراحي", desc: "يُزرع الطعم العظمي تحت التخدير الموضعي." },
        { step: "4", title: "الشفاء والزراعة", desc: "زراعة الأسنان بعد 3-6 أشهر من الشفاء." },
      ],
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    },
    "dis-teli-ortodonti": {
      title: "تقويم الأسنان", subtitle: "تقويم الأسنان", emoji: "😁",
      hero: "https://images.unsplash.com/photo-1583911546473-407bb47c6b79?w=1200&q=80",
      description: "صحّح أسنانك المعوجة أو المتراصة أو الفاصلة بعلاجات تقويم الأسنان الحديثة. حلول مناسبة لجميع الأعمار.",
      benefits: ["خيار المحاذيات الشفافة", "تقنية أسلاك غير مرئية", "مناسبة لجميع الأعمار", "تحسن صحة الفم", "نتائج دائمة", "محاكاة رقمية"],
      steps: [
        { step: "1", title: "الفحص التقويمي", desc: "تقييم شامل بنموذج الأسنان والأشعة والتصوير." },
        { step: "2", title: "خطة العلاج", desc: "خطة تقويم مخصصة وتقدير للمدة." },
        { step: "3", title: "تركيب الجهاز", desc: "يُركب النظام المختار (شفاف أو معدني أو خزفي)." },
        { step: "4", title: "الثبات", desc: "الحفاظ على النتيجة الدائمة بالمثبّت بعد العلاج." },
      ],
      image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80",
    },
  },
  es: {
    "dis-implanti": {
      title: "Implante Dental", subtitle: "Implante Dental", emoji: "🦷",
      hero: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80",
      description: "El implante dental es la solución más permanente y de aspecto más natural para los dientes perdidos. El implante de tornillo de titanio se coloca en el hueso de la mandíbula.",
      benefits: ["Aspecto y sensación natural", "Durabilidad de 20+ años", "Sin daño a dientes adyacentes", "Previene la pérdida ósea", "Comodidad al comer", "Mayor confianza"],
      steps: [
        { step: "1", title: "Examen y Planificación", desc: "Análisis oral completo con tomografía 3D y plan de tratamiento personalizado." },
        { step: "2", title: "Colocación del Implante", desc: "Colocación del implante de titanio en el hueso mandibular bajo anestesia local." },
        { step: "3", title: "Proceso de Curación", desc: "2–4 meses de oseointegración (fusión con el hueso)." },
        { step: "4", title: "Corona y Entrega", desc: "Sonrisa perfecta completada con corona de zirconio o porcelana." },
      ],
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    },
    "hollywood-gulusu": {
      title: "Sonrisa Hollywood", subtitle: "Sonrisa Hollywood", emoji: "✨",
      hero: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
      description: "La Sonrisa Hollywood es un tratamiento dental estético integral que perfecciona la forma, el color y la posición de los dientes con carillas de porcelana y coronas de zirconio.",
      benefits: ["Transformación instantánea", "Aspecto natural de porcelana", "Resistente a manchas", "Mínimo desgaste dental", "Vida útil 10–15 años", "Aumento de confianza"],
      steps: [
        { step: "1", title: "Diseño Digital de Sonrisa", desc: "Simulación de sonrisa personalizada en entorno informático." },
        { step: "2", title: "Mock-Up", desc: "Pruebe y apruebe el resultado con una carilla temporal." },
        { step: "3", title: "Cementado de Carillas", desc: "Carillas de porcelana de 0,3–0,5 mm se pegan a los dientes." },
        { step: "4", title: "Retoques Finales", desc: "Control de color, forma y mordida. Su sonrisa soñada es entregada." },
      ],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    },
    "dis-beyazlatma": {
      title: "Blanqueamiento Dental", subtitle: "Blanqueamiento Dental", emoji: "🪥",
      hero: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80",
      description: "Aclare sus dientes hasta 8 tonos con blanqueamiento dental láser profesional. Resultados rápidos y duraderos con gel blanqueador seguro y activación LED/láser.",
      benefits: ["8 tonos más claro en 1 sesión", "Sin daño al esmalte", "Resultado visible inmediato", "Efecto duradero", "Procedimiento indoloro", "Productos aprobados por FDA"],
      steps: [
        { step: "1", title: "Limpieza Dental", desc: "Eliminación de sarro y placa como preparación." },
        { step: "2", title: "Protección de Encías", desc: "Las encías se protegen con gel y barrera de luz." },
        { step: "3", title: "Gel Blanqueador y Láser", desc: "Se aplica gel de peróxido activo y se activa con láser." },
        { step: "4", title: "Flúor Protector", desc: "Se aplica flúor fortalecedor tras la sesión." },
      ],
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    },
    "zirkonyum-kaplama": {
      title: "Corona de Zirconio", subtitle: "Corona de Zirconio", emoji: "💎",
      hero: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
      description: "Las coronas de zirconio ofrecen el aspecto más natural con su estructura de cerámica integral sin subestructura metálica.",
      benefits: ["Sin metal", "Aspecto natural translúcido", "Cero riesgo alérgico", "Alta resistencia a la fractura", "Vida útil 15+ años", "Coincidencia perfecta de color"],
      steps: [
        { step: "1", title: "Preparación Dental", desc: "Subestructura perfecta con mínima reducción dental." },
        { step: "2", title: "Impresión y Diseño", desc: "Impresión oral digital, diseño con sistema CAD/CAM." },
        { step: "3", title: "Corona Provisional", desc: "Corona estética provisional durante el proceso de laboratorio." },
        { step: "4", title: "Cementado Permanente", desc: "Coronas de zirconio cementadas permanentemente con adhesivo de precisión." },
      ],
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    },
    "kemik-grefti": {
      title: "Injerto Óseo", subtitle: "Injerto Óseo", emoji: "🦴",
      hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
      description: "El injerto óseo es un procedimiento quirúrgico que restaura el volumen óseo antes de la colocación del implante en pacientes con pérdida ósea.",
      benefits: ["Prepara base para implante", "Detiene pérdida ósea", "Preserva contornos faciales", "Tasa de éxito 95%+", "Técnicas mínimamente invasivas", "Opción de elevación de seno"],
      steps: [
        { step: "1", title: "Análisis Óseo", desc: "Densidad y volumen óseo medidos con CBCT 3D." },
        { step: "2", title: "Selección de Material", desc: "Material de injerto autólogo, alogénico o sintético planificado." },
        { step: "3", title: "Aplicación Quirúrgica", desc: "Injerto óseo colocado bajo anestesia local." },
        { step: "4", title: "Curación e Implante", desc: "Implante tras 3–6 meses de curación." },
      ],
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    },
    "dis-teli-ortodonti": {
      title: "Ortodoncia", subtitle: "Ortodoncia", emoji: "😁",
      hero: "https://images.unsplash.com/photo-1583911546473-407bb47c6b79?w=1200&q=80",
      description: "Corrija dientes torcidos, apiñados o separados con tratamientos de ortodoncia modernos. Soluciones para todas las edades.",
      benefits: ["Opción de alineadores transparentes", "Tecnología de brackets invisibles", "Apto para todas las edades", "Mejora la salud bucal", "Resultados permanentes", "Simulación digital"],
      steps: [
        { step: "1", title: "Examen Ortodóncico", desc: "Evaluación completa con modelo dental, rayos X y fotos." },
        { step: "2", title: "Plan de Tratamiento", desc: "Plan ortodóncico personalizado y estimación de duración." },
        { step: "3", title: "Colocación del Aparato", desc: "Sistema elegido (alineador, metal o cerámica) colocado." },
        { step: "4", title: "Retención", desc: "Resultado permanente preservado con retenedor." },
      ],
      image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80",
    },
  },
  it: {
    "dis-implanti": {
      title: "Impianto Dentale", subtitle: "Impianto Dentale", emoji: "🦷",
      hero: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80",
      description: "L'impianto dentale è la soluzione più permanente e dall'aspetto più naturale per i denti mancanti. L'impianto a vite in titanio viene posizionato nell'osso mascellare.",
      benefits: ["Aspetto e sensazione naturali", "Durata 20+ anni", "Nessun danno ai denti adiacenti", "Previene la perdita ossea", "Comfort nel mangiare", "Aumento della fiducia"],
      steps: [
        { step: "1", title: "Esame e Pianificazione", desc: "Analisi orale completa con tomografia 3D e piano di trattamento personalizzato." },
        { step: "2", title: "Posizionamento Impianto", desc: "Posizionamento dell'impianto in titanio nell'osso mascellare in anestesia locale." },
        { step: "3", title: "Processo di Guarigione", desc: "2–4 mesi di osteointegrazione (fusione con l'osso)." },
        { step: "4", title: "Corona e Consegna", desc: "Sorriso perfetto con corona in zirconio o porcellana." },
      ],
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    },
    "hollywood-gulusu": {
      title: "Sorriso Hollywood", subtitle: "Sorriso Hollywood", emoji: "✨",
      hero: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
      description: "Il Sorriso Hollywood è un trattamento dentale estetico completo che perfeziona forma, colore e posizione dei denti con faccette in porcellana e corone in zirconio.",
      benefits: ["Trasformazione immediata", "Aspetto naturale in porcellana", "Resistente alle macchie", "Minima preparazione dentale", "Durata 10–15 anni", "Aumento della fiducia"],
      steps: [
        { step: "1", title: "Design Digitale del Sorriso", desc: "Simulazione del sorriso personalizzata al computer." },
        { step: "2", title: "Mock-Up", desc: "Prova e approva il risultato con una faccetta provvisoria." },
        { step: "3", title: "Incollaggio Faccette", desc: "Faccette in porcellana di 0,3–0,5 mm incollate ai denti." },
        { step: "4", title: "Ritocchi Finali", desc: "Controllo colore, forma e morso. Consegna del tuo sorriso." },
      ],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    },
    "dis-beyazlatma": {
      title: "Sbiancamento Dentale", subtitle: "Sbiancamento Dentale", emoji: "🪥",
      hero: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80",
      description: "Schiarisci i tuoi denti fino a 8 tonalità con lo sbiancamento laser professionale. Risultati rapidi e duraturi con gel sbiancante sicuro e attivazione LED/laser.",
      benefits: ["8 tonalità più chiaro in 1 seduta", "Nessun danno allo smalto", "Risultato visibile immediato", "Effetto duraturo", "Procedura indolore", "Prodotti approvati FDA"],
      steps: [
        { step: "1", title: "Pulizia Superficie Dentale", desc: "Rimozione tartaro e placca come preparazione." },
        { step: "2", title: "Protezione Gengive", desc: "Le gengive sono protette con gel e barriera di luce." },
        { step: "3", title: "Gel Sbiancante e Laser", desc: "Gel al perossido attivo applicato e attivato con laser." },
        { step: "4", title: "Fluoro Protettivo", desc: "Fluoro rinforzante applicato dopo la seduta." },
      ],
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    },
    "zirkonyum-kaplama": {
      title: "Corona in Zirconio", subtitle: "Corona in Zirconio", emoji: "💎",
      hero: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
      description: "Le corone in zirconio offrono l'aspetto più naturale con la loro struttura in ceramica integrale senza sottostruttura metallica.",
      benefits: ["Privo di metallo", "Aspetto naturale traslucido", "Zero rischio allergie", "Alta resistenza alla frattura", "Durata 15+ anni", "Perfetta corrispondenza cromatica"],
      steps: [
        { step: "1", title: "Preparazione Dentale", desc: "Sottostruttura perfetta con minima riduzione dentale." },
        { step: "2", title: "Impronta e Design", desc: "Impronta orale digitale, design con sistema CAD/CAM." },
        { step: "3", title: "Corona Provvisoria", desc: "Corona estetica provvisoria durante il processo di laboratorio." },
        { step: "4", title: "Cementazione Permanente", desc: "Corone in zirconio cementate permanentemente." },
      ],
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    },
    "kemik-grefti": {
      title: "Innesto Osseo", subtitle: "Innesto Osseo", emoji: "🦴",
      hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
      description: "L'innesto osseo è una procedura chirurgica che ripristina il volume osseo prima del posizionamento dell'impianto in pazienti con perdita ossea.",
      benefits: ["Prepara il terreno per l'impianto", "Ferma la perdita ossea", "Preserva i contorni del viso", "Tasso di successo 95%+", "Tecniche minimamente invasive", "Opzione rialzo del seno"],
      steps: [
        { step: "1", title: "Analisi Ossea", desc: "Densità e volume osseo misurati con CBCT 3D." },
        { step: "2", title: "Selezione Materiale", desc: "Materiale di innesto autologo, allogenico o sintetico pianificato." },
        { step: "3", title: "Applicazione Chirurgica", desc: "Innesto osseo posizionato in anestesia locale." },
        { step: "4", title: "Guarigione e Impianto", desc: "Impianto dopo 3–6 mesi di guarigione." },
      ],
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    },
    "dis-teli-ortodonti": {
      title: "Ortodonzia", subtitle: "Ortodonzia", emoji: "😁",
      hero: "https://images.unsplash.com/photo-1583911546473-407bb47c6b79?w=1200&q=80",
      description: "Correggi denti storti, affollati o distanziati con trattamenti ortodontici moderni. Soluzioni per tutte le età.",
      benefits: ["Opzione allineatori trasparenti", "Tecnologia bracket invisibili", "Adatto a tutte le età", "Migliora la salute orale", "Risultati permanenti", "Simulazione digitale"],
      steps: [
        { step: "1", title: "Visita Ortodontica", desc: "Valutazione completa con modello dentale, radiografie e foto." },
        { step: "2", title: "Piano di Trattamento", desc: "Piano ortodontico personalizzato e stima della durata." },
        { step: "3", title: "Posizionamento Apparecchio", desc: "Sistema scelto (allineatore, metallo o ceramica) posizionato." },
        { step: "4", title: "Contenzione", desc: "Risultato permanente preservato con il contenitore." },
      ],
      image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80",
    },
  },
  fr: {
    "dis-implanti": {
      title: "Implant Dentaire", subtitle: "Implant Dentaire", emoji: "🦷",
      hero: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80",
      description: "L'implant dentaire est la solution la plus permanente et la plus naturelle pour les dents manquantes. La vis en titane est placée dans l'os de la mâchoire.",
      benefits: ["Aspect et sensation naturels", "Durabilité 20+ ans", "Pas de dommages aux dents adjacentes", "Prévient la perte osseuse", "Confort alimentaire", "Gain de confiance"],
      steps: [
        { step: "1", title: "Examen et Planification", desc: "Analyse buccale complète avec tomographie 3D et plan de traitement personnalisé." },
        { step: "2", title: "Pose de l'Implant", desc: "Pose de l'implant en titane dans l'os de la mâchoire sous anesthésie locale." },
        { step: "3", title: "Processus de Guérison", desc: "2–4 mois d'ostéo-intégration (fusion avec l'os)." },
        { step: "4", title: "Couronne et Livraison", desc: "Sourire parfait avec couronne en zircone ou porcelaine." },
      ],
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    },
    "hollywood-gulusu": {
      title: "Sourire Hollywood", subtitle: "Sourire Hollywood", emoji: "✨",
      hero: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
      description: "Le Sourire Hollywood est un traitement dentaire esthétique complet qui perfectionne la forme, la couleur et la position des dents avec des facettes en porcelaine et des couronnes en zircone.",
      benefits: ["Transformation instantanée", "Aspect naturel en porcelaine", "Résistant aux taches", "Préparation minimale", "Durée de vie 10–15 ans", "Gain de confiance"],
      steps: [
        { step: "1", title: "Design Digital du Sourire", desc: "Simulation de sourire personnalisée sur ordinateur." },
        { step: "2", title: "Mock-Up", desc: "Essayez et approuvez d'abord le résultat avec une facette provisoire." },
        { step: "3", title: "Collage des Facettes", desc: "Facettes en porcelaine de 0,3–0,5 mm collées sur les dents." },
        { step: "4", title: "Retouches Finales", desc: "Contrôle couleur, forme et occlusion. Votre sourire est livré." },
      ],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    },
    "dis-beyazlatma": {
      title: "Blanchiment Dentaire", subtitle: "Blanchiment Dentaire", emoji: "🪥",
      hero: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80",
      description: "Éclaircissez vos dents jusqu'à 8 teintes avec le blanchiment dentaire laser professionnel. Résultats rapides et durables avec gel blanchissant sûr.",
      benefits: ["8 teintes plus clair en 1 séance", "Pas de dommage à l'émail", "Résultat visible immédiat", "Effet durable", "Procédure indolore", "Produits approuvés FDA"],
      steps: [
        { step: "1", title: "Nettoyage Dentaire", desc: "Détartrage et élimination de la plaque en préparation." },
        { step: "2", title: "Protection des Gencives", desc: "Les gencives sont protégées avec gel et barrière lumineuse." },
        { step: "3", title: "Gel Blanchissant et Laser", desc: "Gel au peroxyde actif appliqué et activé au laser." },
        { step: "4", title: "Fluor Protecteur", desc: "Fluor renforçant appliqué après la séance." },
      ],
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    },
    "zirkonyum-kaplama": {
      title: "Couronne en Zircone", subtitle: "Couronne en Zircone", emoji: "💎",
      hero: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
      description: "Les couronnes en zircone offrent l'aspect le plus naturel avec leur structure tout-céramique sans infrastructure métallique.",
      benefits: ["Sans métal", "Aspect naturel translucide", "Zéro risque allergique", "Haute résistance à la fracture", "Durée de vie 15+ ans", "Correspondance parfaite des couleurs"],
      steps: [
        { step: "1", title: "Préparation Dentaire", desc: "Infrastructure parfaite avec réduction minimale." },
        { step: "2", title: "Empreinte et Design", desc: "Empreinte orale numérique, design avec système CAD/CAM." },
        { step: "3", title: "Couronne Provisoire", desc: "Couronne esthétique provisoire pendant le processus de laboratoire." },
        { step: "4", title: "Scellement Permanent", desc: "Couronnes en zircone scellées définitivement avec adhésif de précision." },
      ],
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    },
    "kemik-grefti": {
      title: "Greffe Osseuse", subtitle: "Greffe Osseuse", emoji: "🦴",
      hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
      description: "La greffe osseuse est une procédure chirurgicale qui restaure le volume osseux avant la pose d'implant chez les patients souffrant de perte osseuse.",
      benefits: ["Prépare le terrain pour l'implant", "Arrête la perte osseuse", "Préserve les contours du visage", "Taux de succès 95%+", "Techniques mini-invasives", "Option élévation du sinus"],
      steps: [
        { step: "1", title: "Analyse Osseuse", desc: "Densité et volume osseux mesurés par CBCT 3D." },
        { step: "2", title: "Sélection du Matériau", desc: "Matériau de greffe autologue, allogénique ou synthétique planifié." },
        { step: "3", title: "Application Chirurgicale", desc: "Greffe osseuse posée sous anesthésie locale." },
        { step: "4", title: "Guérison et Implant", desc: "Implant après 3–6 mois de guérison." },
      ],
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    },
    "dis-teli-ortodonti": {
      title: "Orthodontie", subtitle: "Orthodontie", emoji: "😁",
      hero: "https://images.unsplash.com/photo-1583911546473-407bb47c6b79?w=1200&q=80",
      description: "Corrigez les dents tordues, serrées ou espacées avec des traitements orthodontiques modernes. Solutions pour tous les âges.",
      benefits: ["Option gouttières transparentes", "Technologie brackets invisibles", "Convient à tous les âges", "Améliore la santé bucco-dentaire", "Résultats permanents", "Simulation numérique"],
      steps: [
        { step: "1", title: "Examen Orthodontique", desc: "Évaluation complète avec modèle dentaire, radiographies et photos." },
        { step: "2", title: "Plan de Traitement", desc: "Plan orthodontique personnalisé et estimation de durée." },
        { step: "3", title: "Pose de l'Appareil", desc: "Système choisi (gouttière, métal ou céramique) posé." },
        { step: "4", title: "Contention", desc: "Résultat permanent préservé avec contention après traitement." },
      ],
      image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80",
    },
  },
  ru: {
    "dis-implanti": {
      title: "Зубной Имплант", subtitle: "Зубной Имплант", emoji: "🦷",
      hero: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80",
      description: "Зубной имплант — самое постоянное и натуральное решение для отсутствующих зубов. Титановый винтообразный имплант устанавливается в кость челюсти.",
      benefits: ["Естественный вид и ощущение", "Долговечность 20+ лет", "Не повреждает соседние зубы", "Предотвращает потерю кости", "Комфорт при еде", "Повышение уверенности"],
      steps: [
        { step: "1", title: "Осмотр и Планирование", desc: "Комплексный анализ полости рта с 3D-томографией и персональный план лечения." },
        { step: "2", title: "Установка Импланта", desc: "Установка титанового импланта в кость челюсти под местной анестезией." },
        { step: "3", title: "Процесс Заживления", desc: "2–4 месяца остеоинтеграции (сращивания с костью)." },
        { step: "4", title: "Коронка и Сдача", desc: "Идеальная улыбка с циркониевой или фарфоровой коронкой." },
      ],
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    },
    "hollywood-gulusu": {
      title: "Голливудская Улыбка", subtitle: "Голливудская Улыбка", emoji: "✨",
      hero: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
      description: "Голливудская Улыбка — комплексное эстетическое стоматологическое лечение, совершенствующее форму, цвет и положение зубов с помощью фарфоровых виниров и циркониевых коронок.",
      benefits: ["Мгновенное преображение", "Натуральный фарфоровый вид", "Устойчивость к пятнам", "Минимальная препаровка", "Срок службы 10–15 лет", "Повышение уверенности"],
      steps: [
        { step: "1", title: "Цифровой Дизайн Улыбки", desc: "Персонализированная симуляция улыбки на компьютере." },
        { step: "2", title: "Mock-Up", desc: "Попробуйте и одобрите результат сначала с временным виниром." },
        { step: "3", title: "Приклеивание Виниров", desc: "Фарфоровые виниры толщиной 0,3–0,5 мм приклеиваются к зубам." },
        { step: "4", title: "Финальные Штрихи", desc: "Контроль цвета, формы и прикуса. Улыбка вашей мечты сдаётся." },
      ],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    },
    "dis-beyazlatma": {
      title: "Отбеливание Зубов", subtitle: "Отбеливание Зубов", emoji: "🪥",
      hero: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80",
      description: "Осветлите зубы на 8 тонов с профессиональным лазерным отбеливанием. Быстрые и долговечные результаты с безопасным отбеливающим гелем.",
      benefits: ["На 8 тонов светлее за 1 сеанс", "Без повреждения эмали", "Мгновенный видимый результат", "Долговременный эффект", "Безболезненная процедура", "Продукты с сертификатом FDA"],
      steps: [
        { step: "1", title: "Чистка Поверхности Зубов", desc: "Удаление зубного камня и налёта как подготовка к отбеливанию." },
        { step: "2", title: "Защита Дёсен", desc: "Дёсна защищены гелем и световым барьером." },
        { step: "3", title: "Гель и Лазер", desc: "Активный гель перекиси карбамида нанесён и активирован лазером." },
        { step: "4", title: "Защитный Фторид", desc: "Укрепляющий фторид наносится после сеанса." },
      ],
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    },
    "zirkonyum-kaplama": {
      title: "Циркониевая Коронка", subtitle: "Циркониевая Коронка", emoji: "💎",
      hero: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
      description: "Циркониевые коронки обеспечивают наиболее естественный вид благодаря цельнокерамической структуре без металлического каркаса.",
      benefits: ["Без металла", "Прозрачный натуральный вид", "Нулевой риск аллергии", "Высокая прочность", "Срок службы 15+ лет", "Идеальное совпадение цвета"],
      steps: [
        { step: "1", title: "Подготовка Зуба", desc: "Идеальная основа с минимальной препаровкой." },
        { step: "2", title: "Слепок и Дизайн", desc: "Цифровой слепок, дизайн с помощью CAD/CAM." },
        { step: "3", title: "Временная Коронка", desc: "Временная коронка на время работы лаборатории." },
        { step: "4", title: "Постоянная Фиксация", desc: "Циркониевые коронки навсегда фиксируются точным адгезивом." },
      ],
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    },
    "kemik-grefti": {
      title: "Костная Пластика", subtitle: "Костная Пластика", emoji: "🦴",
      hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
      description: "Костная пластика — хирургическая процедура восстановления объёма кости перед имплантацией у пациентов с атрофией кости.",
      benefits: ["Подготавливает к имплантации", "Останавливает атрофию кости", "Сохраняет контуры лица", "Успех 95%+", "Малоинвазивные техники", "Опция синус-лифтинга"],
      steps: [
        { step: "1", title: "Анализ Кости", desc: "Плотность и объём кости измерены с помощью 3D CBCT." },
        { step: "2", title: "Выбор Материала", desc: "Планируется аутологичный, аллогенный или синтетический материал." },
        { step: "3", title: "Хирургическое Применение", desc: "Костный трансплантат устанавливается под местной анестезией." },
        { step: "4", title: "Заживление и Имплант", desc: "Имплантация после 3–6 месяцев заживления." },
      ],
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    },
    "dis-teli-ortodonti": {
      title: "Ортодонтия", subtitle: "Ортодонтия", emoji: "😁",
      hero: "https://images.unsplash.com/photo-1583911546473-407bb47c6b79?w=1200&q=80",
      description: "Исправьте кривые, скученные или с промежутками зубы с помощью современных ортодонтических методов. Решения для всех возрастов.",
      benefits: ["Вариант прозрачных элайнеров", "Технология невидимых брекетов", "Подходит для всех возрастов", "Улучшает здоровье полости рта", "Постоянные результаты", "Цифровая симуляция"],
      steps: [
        { step: "1", title: "Ортодонтический Осмотр", desc: "Комплексная оценка с моделью зубов, рентгеном и фото." },
        { step: "2", title: "План Лечения", desc: "Персональный ортодонтический план и оценка времени." },
        { step: "3", title: "Установка Аппарата", desc: "Выбранная система (элайнер, металл или керамика) устанавливается." },
        { step: "4", title: "Ретенция", desc: "Постоянный результат сохраняется ретейнером после лечения." },
      ],
      image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80",
    },
  },
};

// UI text translations
const uiText = {
  tr: { about: "Tedavi Hakkında", advantages: "Avantajlar", process: "Tedavi Süreci", back: "Ana Sayfaya Dön", ctaBadge: "Ücretsiz Değerlendirme", ctaDesc: "Uzman ekibimiz sizi ücretsiz olarak değerlendirsin.", whatsapp: "WhatsApp ile Yaz", call: "Hemen Ara", notFound: "Tedavi bulunamadı", notFoundLink: "Ana sayfaya dön" },
  en: { about: "About Treatment", advantages: "Advantages", process: "Treatment Process", back: "Back to Home", ctaBadge: "Free Evaluation", ctaDesc: "Our expert team will evaluate you for free.", whatsapp: "Write on WhatsApp", call: "Call Now", notFound: "Treatment not found", notFoundLink: "Go back to home" },
  de: { about: "Über die Behandlung", advantages: "Vorteile", process: "Behandlungsprozess", back: "Zur Startseite", ctaBadge: "Kostenlose Bewertung", ctaDesc: "Unser Expertenteam bewertet Sie kostenlos.", whatsapp: "Per WhatsApp schreiben", call: "Jetzt anrufen", notFound: "Behandlung nicht gefunden", notFoundLink: "Zur Startseite" },
  ar: { about: "حول العلاج", advantages: "المزايا", process: "عملية العلاج", back: "العودة للرئيسية", ctaBadge: "تقييم مجاني", ctaDesc: "سيقيّمك فريقنا الخبير مجاناً.", whatsapp: "تواصل عبر واتساب", call: "اتصل الآن", notFound: "العلاج غير موجود", notFoundLink: "العودة للرئيسية" },
  es: { about: "Sobre el Tratamiento", advantages: "Ventajas", process: "Proceso de Tratamiento", back: "Volver al Inicio", ctaBadge: "Evaluación Gratuita", ctaDesc: "Nuestro equipo experto le evaluará gratuitamente.", whatsapp: "Escribir por WhatsApp", call: "Llamar Ahora", notFound: "Tratamiento no encontrado", notFoundLink: "Volver al inicio" },
  it: { about: "Sul Trattamento", advantages: "Vantaggi", process: "Processo di Trattamento", back: "Torna alla Home", ctaBadge: "Valutazione Gratuita", ctaDesc: "Il nostro team esperto ti valuterà gratuitamente.", whatsapp: "Scrivi su WhatsApp", call: "Chiama Ora", notFound: "Trattamento non trovato", notFoundLink: "Torna alla home" },
  fr: { about: "Sur le Traitement", advantages: "Avantages", process: "Processus de Traitement", back: "Retour à l'Accueil", ctaBadge: "Évaluation Gratuite", ctaDesc: "Notre équipe d'experts vous évaluera gratuitement.", whatsapp: "Écrire sur WhatsApp", call: "Appeler Maintenant", notFound: "Traitement non trouvé", notFoundLink: "Retour à l'accueil" },
  ru: { about: "О Лечении", advantages: "Преимущества", process: "Процесс Лечения", back: "На Главную", ctaBadge: "Бесплатная Оценка", ctaDesc: "Наша команда экспертов оценит вас бесплатно.", whatsapp: "Написать в WhatsApp", call: "Позвонить", notFound: "Лечение не найдено", notFoundLink: "На главную" },
};

export default function TreatmentDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();

  const langTreatments = treatmentsByLang[lang] || treatmentsByLang.tr;
  const treatment = langTreatments[slug] || treatmentsByLang.tr[slug];
  const ui = uiText[lang] || uiText.tr;

  if (!treatment) {
    return (
      <div className="min-h-screen bg-[#f7f3ef] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl mb-4">🦷</p>
            <h2 className="text-2xl font-bold text-[#2d2419] mb-4">{ui.notFound}</h2>
            <Link to="/" className="text-[#8B6840] underline">{ui.notFoundLink}</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f3ef] font-inter">
      <Navbar />

      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={treatment.hero} alt={treatment.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#2c2419]/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-[#c9a87c] text-sm uppercase tracking-[0.3em] mb-3 font-medium"
          >
            {treatment.subtitle}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white font-playfair mb-4"
          >
            {treatment.emoji} {treatment.title}
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-[#c9a87c] transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              {ui.back}
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-14 mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2d2419] font-playfair mb-4">{ui.about}</h2>
            <p className="text-[#6b5e52] leading-relaxed mb-8 text-[15px]">{treatment.description}</p>
            <h3 className="text-lg font-bold text-[#2d2419] mb-4">{ui.advantages}</h3>
            <div className="grid grid-cols-2 gap-3">
              {treatment.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#8B6840] flex-shrink-0" />
                  <span className="text-[#4a3728] text-sm">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-2xl overflow-hidden shadow-xl">
            <img src={treatment.image} alt={treatment.title} className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Steps */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d2419] font-playfair text-center mb-10">{ui.process}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {treatment.steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-[#e0d8d0] rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mx-auto bg-[#8B6840] text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">{s.step}</div>
                <h4 className="font-bold text-[#2d2419] mb-2 text-sm">{s.title}</h4>
                <p className="text-[#6b5e52] text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="rounded-3xl text-center px-8 py-14"
          style={{ background: "linear-gradient(135deg, #2c2419 0%, #4a3728 50%, #3d3028 100%)" }}
        >
          <p className="text-[#c9a87c] text-xs uppercase tracking-[0.25em] mb-3 font-semibold">{ui.ctaBadge}</p>
          <h3 className="text-white text-2xl md:text-3xl font-bold font-playfair mb-3">{treatment.title}</h3>
          <p className="text-[#b0a090] text-sm mb-8 max-w-lg mx-auto">{ui.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/905315898089" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bb5a] transition-all shadow-lg text-sm uppercase tracking-wider"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.849L.057 23.882l6.204-1.448A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.876 9.876 0 01-5.034-1.376l-.361-.214-3.741.873.937-3.63-.235-.374A9.851 9.851 0 012.106 12C2.106 6.525 6.525 2.106 12 2.106c5.476 0 9.894 4.419 9.894 9.894 0 5.476-4.418 9.894-9.894 9.894z"/>
              </svg>
              {ui.whatsapp}
            </a>
            <a
              href="tel:+905315898089"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#c9a87c] hover:text-[#c9a87c] transition-all text-sm uppercase tracking-wider"
            >
              <Phone className="w-4 h-4" />
              {ui.call}
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}