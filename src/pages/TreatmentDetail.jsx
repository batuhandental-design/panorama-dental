import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Phone } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

const treatments = {
  "dis-implanti": {
    title: "Diş İmplantı",
    subtitle: "Dental Implant",
    emoji: "🦷",
    hero: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80",
    description: "Diş implantı, kaybedilen dişlerin en kalıcı ve doğal görünümlü çözümüdür. Titanyum vida şeklindeki implant, çene kemiğine yerleştirilerek doğal diş köküne benzer bir temel oluşturur.",
    benefits: [
      "Doğal görünüm ve his",
      "20+ yıl dayanıklılık",
      "Çevre dişlere zarar vermez",
      "Kemik erimesini önler",
      "Yeme-içme rahatlığı",
      "Özgüven artışı",
    ],
    steps: [
      { step: "1", title: "Muayene & Planlama", desc: "3D tomografi ile kapsamlı ağız analizi ve kişiselleştirilmiş tedavi planı." },
      { step: "2", title: "İmplant Yerleştirme", desc: "Lokal anestezi altında titanyum implantın çene kemiğine uygulanması." },
      { step: "3", title: "İyileşme Süreci", desc: "2–4 aylık osseointegrasyon (kemikle kaynaşma) süreci." },
      { step: "4", title: "Üst Yapı & Teslim", desc: "Zirkonyum veya porselen kron takılarak tamamlanan kusursuz gülüş." },
    ],
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
  },
  "hollywood-gulusu": {
    title: "Hollywood Gülüşü",
    subtitle: "Hollywood Smile",
    emoji: "✨",
    hero: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
    description: "Hollywood Gülüşü, porselen laminate ve zirkonyum kaplamalar kullanılarak dişlerin şeklini, rengini ve konumunu mükemmelleştiren kapsamlı bir estetik diş tedavisidir.",
    benefits: [
      "Anında dönüşüm",
      "Doğal porselen görünümü",
      "Leke tutmaz yapı",
      "Minimum diş törpüleme",
      "10–15 yıl ömür",
      "Özgüven patlaması",
    ],
    steps: [
      { step: "1", title: "Dijital Gülüş Tasarımı", desc: "Bilgisayar ortamında kişiselleştirilmiş gülüş simülasyonu." },
      { step: "2", title: "Mock-Up Uygulama", desc: "Geçici kaplama ile sonucu önce deneyin, onaylayın." },
      { step: "3", title: "Laminatların Yapıştırılması", desc: "0.3–0.5 mm ince porselen laminatlar dişlere yapıştırılır." },
      { step: "4", title: "Son Rötuşlar", desc: "Renk, şekil ve ısırış kontrolü. Hayalinizdeki gülüş teslim edilir." },
    ],
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
  },
  "dis-beyazlatma": {
    title: "Diş Beyazlatma",
    subtitle: "Teeth Whitening",
    emoji: "🪥",
    hero: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80",
    description: "Profesyonel laser diş beyazlatma ile dişlerinizi 8 tona kadar açın. Klinik ortamında uygulanan güvenli beyazlatma jeli ve LED/laser aktivasyonu ile hızlı ve kalıcı sonuçlar.",
    benefits: [
      "1 seansta 8 ton açılma",
      "Diş minesine zarar vermez",
      "Anında görünür sonuç",
      "Uzun ömürlü etki",
      "Ağrısız prosedür",
      "FDA onaylı ürünler",
    ],
    steps: [
      { step: "1", title: "Diş Yüzeyi Temizliği", desc: "Tartar ve plak temizliği ile beyazlatma öncesi hazırlık." },
      { step: "2", title: "Diş Eti Koruması", desc: "Jel ve ışık bariyeri ile diş etleri korunur." },
      { step: "3", title: "Beyazlatma Jeli & Laser", desc: "Aktif karbojen peroksit jeli uygulanır, laser ile aktive edilir." },
      { step: "4", title: "Koruyucu Flor", desc: "Seans sonunda dişlere güçlendirici flor uygulanır." },
    ],
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
  },
  "zirkonyum-kaplama": {
    title: "Zirkonyum Kaplama",
    subtitle: "Zirconia Crown",
    emoji: "💎",
    hero: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    description: "Zirkonyum kaplamalar, metal altyapısız tam seramik yapısıyla en doğal görünümü sunan diş kaplamasıdır. Işık geçirgenliği sayesinde doğal dişten ayırt edilemez.",
    benefits: [
      "Metal içermez",
      "Işık geçirgen doğal görünüm",
      "Alerjik reaksiyon riski sıfır",
      "Yüksek kırılma direnci",
      "15+ yıl ömür",
      "Tam renk uyumu",
    ],
    steps: [
      { step: "1", title: "Diş Hazırlığı", desc: "Minimum diş kesimi ile mükemmel altyapı hazırlanır." },
      { step: "2", title: "Ölçü & Tasarım", desc: "Dijital ağız ölçüsü alınır, CAD/CAM sistemiyle tasarlanır." },
      { step: "3", title: "Geçici Kaplama", desc: "Laboratuvar süreci boyunca geçici estetik kaplama takılır." },
      { step: "4", title: "Kalıcı Yapıştırma", desc: "Zirkonyum kronlar hassas adeziv ile kalıcı olarak yapıştırılır." },
    ],
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
  },
  "kemik-grefti": {
    title: "Kemik Grefti",
    subtitle: "Bone Graft",
    emoji: "🦴",
    hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    description: "Kemik grefti, diş kaybına bağlı kemik erimesi olan hastalarda implant uygulaması öncesi kemik hacmini yeniden kazandıran cerrahi bir prosedürdür.",
    benefits: [
      "İmplant öncesi zemin hazırlar",
      "Kemik erimesini durdurur",
      "Yüz konturlarını korur",
      "Başarı oranı %95+",
      "Minimal invazif teknikler",
      "Sinus lifting seçeneği",
    ],
    steps: [
      { step: "1", title: "Kemik Analizi", desc: "3D CBCT tomografi ile kemik yoğunluğu ve hacmi ölçülür." },
      { step: "2", title: "Greft Materyali Seçimi", desc: "Otolog, allograft veya sentetik greft materyali planlanır." },
      { step: "3", title: "Cerrahi Uygulama", desc: "Lokal anestezi altında kemik grefti yerleştirilir." },
      { step: "4", title: "İyileşme & İmplant", desc: "3–6 ay iyileşme sonrası implant uygulamasına geçilir." },
    ],
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
  },
  "dis-teli-ortodonti": {
    title: "Diş Teli & Ortodonti",
    subtitle: "Orthodontics",
    emoji: "😁",
    hero: "https://images.unsplash.com/photo-1583911546473-407bb47c6b79?w=1200&q=80",
    description: "Modern ortodonti tedavileriyle çarpık, sıkışık veya aralıklı dişlerinizi düzeltin. Şeffaf plaktan metal tele geniş seçenek yelpazesiyle her yaşa uygun çözümler.",
    benefits: [
      "Şeffaf plak seçeneği",
      "Görünmez tel teknolojisi",
      "Her yaşa uygun",
      "Ağız sağlığını iyileştirir",
      "Kalıcı sonuçlar",
      "Dijital simülasyon",
    ],
    steps: [
      { step: "1", title: "Ortodontik Muayene", desc: "Diş modeli, röntgen ve fotoğraf analizi ile kapsamlı değerlendirme." },
      { step: "2", title: "Tedavi Planı", desc: "Kişiselleştirilmiş ortodontik tedavi planı ve süre tahmini." },
      { step: "3", title: "Aparey Uygulaması", desc: "Seçilen sistem (şeffaf plak, metal veya seramik tel) takılır." },
      { step: "4", title: "Retansiyon", desc: "Tedavi sonrası pekiştirici plak ile kalıcı sonuç korunur." },
    ],
    image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80",
  },
};

export default function TreatmentDetail() {
  const { slug } = useParams();
  const treatment = treatments[slug];

  if (!treatment) {
    return (
      <div className="min-h-screen bg-[#f7f3ef] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl mb-4">🦷</p>
            <h2 className="text-2xl font-bold text-[#2d2419] mb-4">Tedavi bulunamadı</h2>
            <Link to="/" className="text-[#8B6840] underline">Ana sayfaya dön</Link>
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
        <img
          src={treatment.hero}
          alt={treatment.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2c2419]/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#c9a87c] text-sm uppercase tracking-[0.3em] mb-3 font-medium"
          >
            {treatment.subtitle}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white font-playfair mb-4"
          >
            {treatment.emoji} {treatment.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-[#c9a87c] transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Ana Sayfaya Dön
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-14 mb-16">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#2d2419] font-playfair mb-4">Tedavi Hakkında</h2>
            <p className="text-[#6b5e52] leading-relaxed mb-8 text-[15px]">{treatment.description}</p>

            <h3 className="text-lg font-bold text-[#2d2419] mb-4">Avantajlar</h3>
            <div className="grid grid-cols-2 gap-3">
              {treatment.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#8B6840] flex-shrink-0" />
                  <span className="text-[#4a3728] text-sm">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <img src={treatment.image} alt={treatment.title} className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d2419] font-playfair text-center mb-10">
            Tedavi Süreci
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {treatment.steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-[#e0d8d0] rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mx-auto bg-[#8B6840] text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                  {s.step}
                </div>
                <h4 className="font-bold text-[#2d2419] mb-2 text-sm">{s.title}</h4>
                <p className="text-[#6b5e52] text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl text-center px-8 py-14"
          style={{ background: "linear-gradient(135deg, #2c2419 0%, #4a3728 50%, #3d3028 100%)" }}
        >
          <p className="text-[#c9a87c] text-xs uppercase tracking-[0.25em] mb-3 font-semibold">Ücretsiz Değerlendirme</p>
          <h3 className="text-white text-2xl md:text-3xl font-bold font-playfair mb-3">
            {treatment.title} için hemen başlayın
          </h3>
          <p className="text-[#b0a090] text-sm mb-8 max-w-lg mx-auto">
            Uzman ekibimiz sizi ücretsiz olarak değerlendirsin ve kişisel tedavi planınızı oluştursun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+905315898089"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bb5a] transition-all shadow-lg text-sm uppercase tracking-wider"
            >
              <Phone className="w-4 h-4" />
              Hemen Ara
            </a>
            <a
              href="https://wa.me/905315898089"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#c9a87c] hover:text-[#c9a87c] transition-all text-sm uppercase tracking-wider"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.849L.057 23.882l6.204-1.448A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.876 9.876 0 01-5.034-1.376l-.361-.214-3.741.873.937-3.63-.235-.374A9.851 9.851 0 012.106 12C2.106 6.525 6.525 2.106 12 2.106c5.476 0 9.894 4.419 9.894 9.894 0 5.476-4.418 9.894-9.894 9.894z"/>
              </svg>
              WhatsApp ile Yaz
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}