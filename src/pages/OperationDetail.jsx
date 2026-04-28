import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Phone } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import WhatsAppButton from "../components/home/WhatsAppButton";
import TopBar from "../components/home/TopBar";

const operations = {
  // Diş Tedavileri
  "dis-implanti": {
    title: "Diş İmplantı",
    category: "Diş Tedavileri",
    description: "Diş implantı, eksik dişlerin yerine titanium veya zirkonyum bazlı yapay kökler yerleştirilerek kalıcı çözüm sağlayan modern bir tedavi yöntemidir. Çene kemiğiyle kaynaşarak doğal dişe en yakın görünüm ve işlevi sunar.",
    benefits: ["Kalıcı ve doğal görünüm", "Çevre dişlere zarar vermez", "20+ yıl dayanıklılık", "Kemik erimesini önler"],
  },
  "hollywood-gulumsemesi": {
    title: "Hollywood Gülümsemesi",
    category: "Diş Tedavileri",
    description: "Hollywood Gülümsemesi, porselen laminatlar ve zirkonyum kaplamalar kullanılarak dişlerin form, renk ve pozisyonunu mükemmelleştiren kapsamlı bir estetik diş tedavisidir.",
    benefits: ["Anında dönüşüm", "Doğal porselen görünümü", "Leke tutmaz yapı", "10-15 yıl ömür"],
  },
  "all-on-4": {
    title: "All on 4 İmplantasyon",
    category: "Diş Tedavileri",
    description: "All-on-4, dört stratejik implant üzerine tam bir diş köprüsü yerleştirerek dişsiz hastalara tek seansta sabit diş sunan ileri bir implantoloji sistemidir.",
    benefits: ["Tek seansta sabit diş", "4 implantla tam çözüm", "Hızlı iyileşme", "Yüksek başarı oranı"],
  },
  "emax-tac": {
    title: "Emax Taç",
    category: "Diş Tedavileri",
    description: "Emax taç (kron), lityum disilikat cam seramikten üretilen, estetik ve dayanıklılığı bir arada sunan premium bir diş kaplama sistemidir.",
    benefits: ["Üstün estetik", "Metal içermez", "Yüksek kırılma direnci", "Doğal ışık geçirgenliği"],
  },
  "zirkonyum-kaplama": {
    title: "Zirkonyum Kaplama",
    category: "Diş Tedavileri",
    description: "Zirkonyum kaplamalar, metal içermeyen tam seramik yapısıyla doğal dişlerden ayırt edilemeyen, estetik ve dayanıklı diş restorasyonlarıdır.",
    benefits: ["Metal içermez", "Doğal görünüm", "Alerjik reaksiyon yok", "15+ yıl ömür"],
  },
  "veneer": {
    title: "Veneer",
    category: "Diş Tedavileri",
    description: "Veneer (diş kaplama), dişlerin ön yüzeyine yapıştırılan ultra ince porselen veya kompozit kaplamalardır. Minimal invaziv yöntemle mükemmel gülüş elde edilir.",
    benefits: ["Minimum diş kesimi", "Doğal görünüm", "Uzun ömürlü", "Leke tutmaz"],
  },
  "hareketli-protez": {
    title: "Hareketli ve Sabit Protez",
    category: "Diş Tedavileri",
    description: "Eksik dişlerin fonksiyonel ve estetik olarak yenilenmesinde kullanılan protez sistemleri; hareketli (çıkarılabilir) ve sabit (implant veya köprü üstü) seçenekler sunar.",
    benefits: ["Her yaşa uygun", "Uygun fiyat seçenekleri", "Fonksiyonel çözüm", "Doğal görünüm"],
  },
  "kanal-tedavisi": {
    title: "Kanal Tedavisi",
    category: "Diş Tedavileri",
    description: "Kanal tedavisi, ileri çürük veya enfeksiyona maruz kalmış dişlerin pulpasının temizlenip steril bir madde ile doldurularak kurtarıldığı bir endodonti prosedürüdür.",
    benefits: ["Diş çekimini önler", "Ağrıyı giderir", "Enfeksiyonu temizler", "Uzun vadeli çözüm"],
  },
  "dis-beyazlatma": {
    title: "Diş Beyazlatma",
    category: "Diş Tedavileri",
    description: "Profesyonel diş beyazlatma, LED ışık aktivasyonu ve özel jel ile tek seansta 8 tona kadar beyazlama sağlayan güvenli ve etkili bir kozmetik diş tedavisidir.",
    benefits: ["1 seansta 8 ton açılma", "Ağrısız prosedür", "Uzun süreli etki", "FDA onaylı ürünler"],
  },
  // Estetik Cerrahi
  "goz-kapagi-estetigi": {
    title: "Göz Kapağı Estetiği",
    category: "Estetik Cerrahi",
    description: "Blefaroplasti (göz kapağı estetiği), sarkık veya şişkin göz kapaklarını düzelterek daha genç ve dinç bir görünüm kazandıran cerrahi bir işlemdir.",
    benefits: ["Gençleştirici etki", "Kısa iyileşme süresi", "Kalıcı sonuçlar", "Genel görünümü iyileştirir"],
  },
  "yuze-yag-enjeksiyonu": {
    title: "Yüze Yağ Enjeksiyonu",
    category: "Estetik Cerrahi",
    description: "Hastanın kendi vücut yağının yüze enjekte edilmesiyle hacim ve dolgunluk kazandırılan, doğal ve kalıcı sonuçlar sunan bir estetik prosedürdür.",
    benefits: ["Kendi yağ dokusu kullanılır", "Doğal sonuç", "Alerjik reaksiyon yok", "Uzun süreli etki"],
  },
  "yuz-germe": {
    title: "Yüz Germe",
    category: "Estetik Cerrahi",
    description: "Ritmidektomi (yüz germe), yüz ve boyundaki sarkmış doku ve deriyi kaldırarak daha genç ve canlı bir görünüm sağlayan kapsamlı bir estetik cerrahi prosedürdür.",
    benefits: ["10-15 yıl gençleşme", "Kalıcı sonuçlar", "Doğal görünüm", "Kapsamlı yüz rejüvenasyonu"],
  },
  "rinoplasti": {
    title: "Rinoplasti",
    category: "Estetik Cerrahi",
    description: "Rinoplasti (burun estetiği), burunun şeklini, boyutunu ve yapısını düzelten cerrahi bir işlemdir. Hem estetik hem de fonksiyonel sorunları çözebilir.",
    benefits: ["Estetik ve fonksiyonel iyileştirme", "Kalıcı sonuçlar", "Özgüven artışı", "Nefes sorunlarını giderir"],
  },
  "bisektomi": {
    title: "Bişektomi",
    category: "Estetik Cerrahi",
    description: "Bişektomi, yanak yağ yastıklarının (Bichat yağ kütlesi) alınmasıyla yüze daha ince ve angular bir görünüm kazandıran minimal invaziv bir estetik prosedürdür.",
    benefits: ["İnce yüz hattı", "Minimal iz", "Hızlı iyileşme", "Kalıcı sonuç"],
  },
  "liposuction": {
    title: "Liposuction",
    category: "Estetik Cerrahi",
    description: "Liposuction, diyetve egzersizle giderilemeyen bölgesel yağlanmaları cerrahi yöntemle uzaklaştıran vücut şekillendirme prosedürüdür.",
    benefits: ["Bölgesel yağ giderimi", "Vücut şekillendirme", "Hızlı sonuçlar", "Minimal iz"],
  },
  "karin-germe": {
    title: "Karın Germe",
    category: "Estetik Cerrahi",
    description: "Abdominoplasti (karın germe), karın bölgesindeki fazla deri ve yağ dokusunu kaldırarak düz ve sıkı bir karın görünümü sağlayan cerrahi işlemdir.",
    benefits: ["Düz karın görünümü", "Gergin deri", "Kalıcı sonuç", "Özgüven artışı"],
  },
  "meme-estetigi": {
    title: "Meme Estetiği",
    category: "Estetik Cerrahi",
    description: "Meme estetiği; meme büyütme, küçültme, dikleştirme ve yeniden şekillendirme operasyonlarını kapsayan geniş bir cerrahi kategoridir.",
    benefits: ["Kişiselleştirilmiş çözüm", "Doğal görünüm", "Orantılı siluet", "Yüksek hasta memnuniyeti"],
  },
  "bbl": {
    title: "BBL (Brazilian Butt Lift)",
    category: "Estetik Cerrahi",
    description: "BBL, hastanın kendi yağ dokusunun liposuction ile alınıp kalçalara enjekte edilmesiyle dolgun ve şekilli kalça görünümü kazandıran doğal bir vücut şekillendirme prosedürüdür.",
    benefits: ["Kendi yağ dokusu kullanılır", "Doğal ve kalıcı sonuç", "Vücut orantısını düzeltir", "Çift etki: ince bel + dolgun kalça"],
  },
  "penis-buyutme": {
    title: "Penis Büyütme",
    category: "Estetik Cerrahi",
    description: "Penis büyütme operasyonları; yağ enjeksiyonu, hyalüronik asit dolgusu veya cerrahi uzatma yöntemleriyle gerçekleştirilen ürolojik estetik prosedürlerdir.",
    benefits: ["Güven artışı", "Farklı yöntem seçenekleri", "Gizlilik ve hassasiyet", "Uzman kadro"],
  },
  "vajina-estetigi": {
    title: "Vajina Estetiği",
    category: "Estetik Cerrahi",
    description: "Vajinal estetik (jinekologi estetiği); labioplasti, vajinoplasti ve benzeri prosedürlerle hem fonksiyonel hem estetik iyileştirme sağlayan operasyonları kapsar.",
    benefits: ["Fonksiyonel iyileştirme", "Estetik görünüm", "Yüksek hasta memnuniyeti", "Uzman jinekoloji ekibi"],
  },
  // Saç Ekimi
  "dhi-sac-ekimi": {
    title: "DHI Saç Ekimi",
    category: "Saç Ekimi",
    description: "DHI (Direct Hair Implantation) tekniği, saç köklerinin özel bir implanter kalemiyle doğrudan alıcı bölgeye yerleştirildiği, kesisiz ve en ileri saç ekimi yöntemidir.",
    benefits: ["Kesisiz yöntem", "Doğal saç çıkış açısı", "Hızlı iyileşme", "Yoğun ekim kapasitesi"],
  },
  "dhi-kas-ekimi": {
    title: "DHI Kaş Ekimi",
    category: "Saç Ekimi",
    description: "DHI tekniğiyle yapılan kaş ekimi, seyrek veya hiç olmayan kaşlara doğal ve kalıcı kaş görünümü kazandıran bir estetik prosedürdür.",
    benefits: ["Kalıcı sonuç", "Doğal görünüm", "Minimal iz", "Kişisel kaş tasarımı"],
  },
  "dhi-sakal-ekimi": {
    title: "DHI Sakal Ekimi",
    category: "Saç Ekimi",
    description: "DHI sakal ekimi, seyrek veya eksik sakal bölgelerine saç kökü nakliyle dolgun ve doğal bir sakal görünümü kazandıran modern bir estetik yöntemdir.",
    benefits: ["Kalıcı sakal", "Doğal büyüme", "Skar bırakmaz", "Kişisel tasarım"],
  },
  "prp": {
    title: "PRP (Platelet Rich Plasma)",
    category: "Saç Ekimi",
    description: "PRP tedavisi, hastanın kendi kanından elde edilen trombosit açısından zengin plazmayı saç köklerine enjekte ederek saç dökülmesini durduran ve yeni saç büyümesini teşvik eden bir yöntemdir.",
    benefits: ["Kendi kanı kullanılır", "Doğal tedavi", "Saç dökülmesini durdurur", "Saç kalitesini artırır"],
  },
  "kok-hucre-tedavisi": {
    title: "Kök Hücre Tedavisi",
    category: "Saç Ekimi",
    description: "Saçta kök hücre tedavisi, hasarlı saç foliküllerini yenileyen ve saç büyümesini uyaran yenilikçi bir rejeneratif tıp uygulamasıdır.",
    benefits: ["Folikül yenilenmesi", "Saç kalitesi artışı", "Minimal invaziv", "İleri teknoloji"],
  },
  "sac-lazeri": {
    title: "Saç Lazeri",
    category: "Saç Ekimi",
    description: "Düşük seviyeli lazer terapisi (LLLT), saç foliküllerini uyararak saç dökülmesini azaltan ve yeni saç büyümesini destekleyen non-invaziv bir tedavi yöntemidir.",
    benefits: ["Ağrısız tedavi", "İlaç gerektirmez", "Saç dökülmesini azaltır", "Saç kalınlığını artırır"],
  },
  // Obezite Cerrahisi
  "mide-baypas": {
    title: "Mide Bypass",
    category: "Obezite Cerrahisi",
    description: "Gastrik bypass operasyonu, midenin küçültülüp sindirim sisteminin yeniden düzenlenmesiyle uzun vadeli kilo kaybı sağlayan bariatrik cerrahi prosedürüdür.",
    benefits: ["Uzun vadeli kilo kaybı", "Tip 2 diyabeti iyileştirir", "Tansiyon düzenler", "Yüksek başarı oranı"],
  },
  "tup-mide": {
    title: "Tüp Mide Ameliyatı",
    category: "Obezite Cerrahisi",
    description: "Sleeve gastrektomi (tüp mide), midenin yaklaşık %75-80'inin alınarak tüp şeklinde küçültüldüğü, en yaygın bariatrik cerrahi yöntemlerinden biridir.",
    benefits: ["Laparoskopik yöntem", "Hızlı kilo kaybı", "Kısa hastane süreci", "Düşük komplikasyon riski"],
  },
  "mide-balonu": {
    title: "Mide Balonu (6-12 Aylık)",
    category: "Obezite Cerrahisi",
    description: "Mide balonu, mideye endoskopik olarak yerleştirilen ve mide hacmini azaltarak daha az yeme hissi oluşturan, cerrahi gerektirmeyen non-invaziv bir kilo verme yöntemidir.",
    benefits: ["Cerrahi gerektirmez", "6 veya 12 aylık seçenek", "Hızlı kilo kaybı", "Geri alınabilir işlem"],
  },
  "mide-botoksu": {
    title: "Mide Botoksu",
    category: "Obezite Cerrahisi",
    description: "Mide botoksu, mide kaslarına botulinum toksin enjeksiyonuyla mide hareketlerini yavaşlatan ve tokluk hissini uzatan endoskopik bir kilo yönetim yöntemidir.",
    benefits: ["Cerrahi değil", "Kısa işlem süresi", "Tokluk hissini uzatır", "Hızlı iyileşme"],
  },
  "tip2-diyabet": {
    title: "Tip 2 Diyabet Operasyonu",
    category: "Obezite Cerrahisi",
    description: "Metabolik cerrahi, Tip 2 diyabetin tedavisinde kullanılan, bağırsak hormonlarını düzenleyerek kan şekerini kontrol altına alan bariatrik cerrahi yöntemlerini kapsar.",
    benefits: ["Diyabeti kontrol eder", "İlaç ihtiyacını azaltır", "Uzun vadeli çözüm", "Yüksek remisyon oranı"],
  },
  // Göz Operasyonları
  "lazer-goz": {
    title: "Excimer Laser (Göz Lazeri)",
    category: "Göz Operasyonları",
    description: "Excimer laser, miyopi, hipermetropi ve astigmatı düzelten, gözlük ve lens bağımlılığını ortadan kaldıran modern bir kornea şekillendirme yöntemidir.",
    benefits: ["Gözlükten kurtulma", "Hızlı iyileşme", "Yüksek başarı oranı", "Ağrısız prosedür"],
  },
  "katarakt-ameliyati": {
    title: "Katarakt Ameliyatı",
    category: "Göz Operasyonları",
    description: "Katarakt ameliyatı, gözün bulanıklaşmış doğal merceğinin yapay intraoküler lens (IOL) ile değiştirildiği, görme keskinliğini yeniden kazandıran güvenli bir cerrahi yöntemdir.",
    benefits: ["Net görüş", "Kısa operasyon süresi", "Lokal anestezi", "Hızlı iyileşme"],
  },
  "akilli-lens": {
    title: "Smart Lens (Akıllı Lens)",
    category: "Göz Operasyonları",
    description: "Akıllı lens (trifokal IOL), katarakt tedavisi ya da yüksek numaralı gözlük bağımlılığında yakın, orta ve uzak mesafe görüşü tek lensle sağlayan ileri teknoloji bir göz prosedürüdür.",
    benefits: ["Tüm mesafelerde net görüş", "Gözlük gerektirmez", "Kalıcı çözüm", "Yaşa bağlı değişime dirençli"],
  },
};

export default function OperationDetail() {
  const { slug } = useParams();
  const operation = operations[slug];

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
            <h2 className="text-2xl font-bold text-[#2d2419] mb-4">Operasyon bulunamadı</h2>
            <Link to="/" className="text-[#8B6840] underline">Ana Sayfaya Dön</Link>
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
          Ana Sayfaya Dön
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
          <h2 className="text-2xl font-bold text-[#2d2419] font-playfair mb-4">Tedavi Hakkında</h2>
          <p className="text-[#6b5e52] leading-relaxed text-[15px]">{operation.description}</p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white border border-[#e0d8d0] rounded-2xl p-8 shadow-sm mb-8"
        >
          <h2 className="text-2xl font-bold text-[#2d2419] font-playfair mb-6">Avantajlar</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {operation.benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#f7f3ef] rounded-xl">
                <div className="w-2 h-2 rounded-full bg-[#8B6840] flex-shrink-0" />
                <span className="text-[#4a3728] text-sm font-medium">{b}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl text-center px-8 py-14"
          style={{ background: "linear-gradient(135deg, #2c2419 0%, #4a3728 50%, #3d3028 100%)" }}
        >
          <p className="text-[#c9a87c] text-xs uppercase tracking-[0.25em] mb-3 font-semibold">Ücretsiz Değerlendirme</p>
          <h3 className="text-white text-2xl font-bold font-playfair mb-3">{operation.title}</h3>
          <p className="text-[#b0a090] text-sm mb-8 max-w-lg mx-auto">
            Uzman ekibimiz sizi ücretsiz olarak değerlendirsin ve kişisel tedavi planınızı oluştursun.
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
              WhatsApp ile Yaz
            </a>
            <a
              href="tel:+905551896062"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#c9a87c] hover:text-[#c9a87c] transition-all text-sm uppercase tracking-wider"
            >
              <Phone className="w-4 h-4" />
              Hemen Ara
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}