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
    description: "Blefaroplasti (göz kapağı estetiği), yaşlanmayla birlikte sarkıp ağırlaşan üst göz kapakları ile şişkinlik ve torba oluşturan alt göz kapaklarını cerrahi olarak düzelten bir işlemdir. Göz çevresindeki fazla deri ve yağ dokusu uzaklaştırılarak daha uyanık, dinç ve genç bir ifade elde edilir. Üst blefaroplastide insizyon doğal göz kıvrımına gizlenirken, alt blefaroplastide kirpik kenarına yakın mikroskobik kesiler kullanılır. Ortalama 1-2 saat süren operasyon lokal anestezi ile de yapılabilmektedir. İyileşme süreci oldukça hızlıdır; çoğu hasta 7-10 günde sosyal hayatına geri döner ve sonuçlar 10-15 yıl boyunca kalıcıdır.",
    benefits: ["Uyanık ve genç bakış", "Lokal anestezi ile uygulanabilir", "7-10 günde sosyal hayata dönüş", "10-15 yıl kalıcı sonuç", "Görüş alanını genişletir", "Gizli insizyon hattı"],
  },
  "yuze-yag-enjeksiyonu": {
    title: "Yüze Yağ Enjeksiyonu",
    category: "Estetik Cerrahi",
    description: "Yüze yağ enjeksiyonu (lipofillig/fat transfer), hastanın kendi karın, uyluk veya bel bölgesinden liposuction ile alınan yağ hücrelerinin özel işlemden geçirildikten sonra yüzdeki çökmüş alanlara, elmacık kemiklerine, dolguya ihtiyaç duyan bölgelere enjekte edilmesi işlemidir. Sentetik dolgu maddelerinin aksine kişinin kendi biyolojik dokusu kullanıldığından alerjik reaksiyon riski sıfıra yakındır. Enjekte edilen yağın yaklaşık %60-70'i kalıcı olarak tutunur ve bu tutunma gerçekleştikten sonra sonuç ömür boyu sürer. Prosedür aynı zamanda bölgenin kök hücre içeriğini de artırarak deri kalitesini iyileştirir.",
    benefits: ["Tamamen doğal, kendi yağ dokusu", "Alerjik reaksiyon riski yok", "Kalıcı ve doğal görünüm", "Deri kalitesini iyileştirir", "Kök hücre etkisi", "Çift bölgede ince + dolgunluk"],
  },
  "yuz-germe": {
    title: "Yüz Germe",
    category: "Estetik Cerrahi",
    description: "Ritidektomi olarak da bilinen yüz germe operasyonu, yalnızca derinin gerilmesiyle yetinmeyip altta yatan SMAS (Yüzeysel Muskülo-Aponörotik Sistem) tabakasının da yeniden konumlandırıldığı derin düzlem tekniğiyle yapıldığında çok daha doğal ve uzun süreli sonuçlar vermektedir. Kliniğimizde uygulanan 'deep plane' yüz germe tekniği sayesinde bir anda 10-15 yıl gençleşmek mümkündür. Kulak önü ve arkasına gizlenen kesiler nedbe bırakmaz. Boyun germe ile kombine edildiğinde yüz-boyun-dekolte bütünlüğü sağlanır. Sonuçlar tipik olarak 8-12 yıl sürmekte ve hastalar 2-3 hafta içinde sosyal yaşamlarına dönmektedir.",
    benefits: ["Deep plane SMAS tekniği", "10-15 yıl gençleşme", "Gizli insizyon hattı", "Boyun germe ile kombine", "8-12 yıl kalıcı sonuç", "Doğal, gergin görünüm"],
  },
  "rinoplasti": {
    title: "Rinoplasti",
    category: "Estetik Cerrahi",
    description: "Kliniğimizde uygulanan Piezo Ultrasonik Rinoplasti tekniği, geleneksel keski ve raspa kullanımını tamamen ortadan kaldırmaktadır. Yüksek frekanslı ultrasonik titreşimler sayesinde burun kemiği; yalnızca kemik dokuya etki ederek yumuşak dokuya, kıkırdağa ve kana en minimal düzeyde zarar verilmesiyle şekillendirilir. Bu sayede ameliyat sonrası morarma ve şişme klasik rinoplastiye kıyasla %60-70 oranında azalmaktadır. Ayrıca 3D simülasyon yazılımıyla operasyon öncesinde hastaya burun şeklinin dijital önizlemesi sunulmaktadır. Hem estetik kaygıları (kambur, geniş uç, asimetri) hem de fonksiyonel sorunları (septum sapması, nefes güçlüğü) tek seansta çözmek mümkündür.",
    benefits: ["Piezo ultrasonik teknik", "Geleneksele göre %60-70 az morarma", "3D dijital önizleme", "Estetik + fonksiyonel", "Kıkırdağa minimal zarar", "Hızlı iyileşme"],
  },
  "bisektomi": {
    title: "Bişektomi",
    category: "Estetik Cerrahi",
    description: "Bişektomi, ağız içinde yapılan küçük kesiler aracılığıyla yanak bölgesinde doğuştan fazla miktarda bulunan Bichat yağ yastıklarının alınmasıyla gerçekleştirilen minimal invaziv bir estetik operasyondur. İşlem genel anestezi gerekmeksizin sedasyon veya lokal anestezi ile yapılabilir ve ortalama 30-45 dakika sürer. Yüzde daha angular, ince ve fotojenik bir görünüm elde edilmesi sağlanır. Ağız içinden yapıldığı için yüzde hiçbir dışarıdan görünür iz kalmaz. Şişme ve iyileşme süreci 2-4 hafta içinde tamamlanır ve final sonuç 3-6 ayda tam olarak ortaya çıkar.",
    benefits: ["Ağız içinden gizli kesi", "Lokal anestezi ile yapılabilir", "30-45 dakika işlem", "Dışarıdan iz bırakmaz", "Angular yüz hattı", "Kalıcı sonuç"],
  },
  "liposuction": {
    title: "Liposuction",
    category: "Estetik Cerrahi",
    description: "Liposuction, diyet ve egzersizle çözülemeyen kalıcı bölgesel yağlanmaları hedef alan, vücut konturunu yeniden şekillendiren cerrahi bir yöntemdir. Kliniğimizde uygulanan VASER (Ultrasonik) Liposuction tekniğinde yağ hücreleri ultrasonik dalgalarla önce sıvılaştırılır; ardından hassas kanüllerle vücuttan uzaklaştırılır. Bu yöntem klasik liposuctiona kıyasla çevre dokulara zarar vermez, deri kasılmasını destekler ve gerçek anlamda vücut heykeltıraşlığına (Hi-Def Lipo) olanak tanır. Alınan yağ dokusu steril koşullarda işlenerek aynı seansta yüz, kalça veya göğüs bölgesine transfer edilebilir (kompozit lipolipofilling).",
    benefits: ["VASER ultrasonik teknik", "Deri kasılmasını destekler", "Hi-Def vücut heykeltıraşlığı", "Yağ transferi ile kombine", "Minimal iz, hızlı iyileşme", "Kalıcı bölgesel ince hat"],
  },
  "karin-germe": {
    title: "Karın Germe",
    category: "Estetik Cerrahi",
    description: "Abdominoplasti (karın germe), özellikle doğum sonrası veya ciddi kilo kaybından sonra oluşan fazla deri, gerilmiş kaslar ve deri altı yağ dokusunu ortadan kaldırmak için yapılan kapsamlı bir cerrahi işlemdir. Operasyon sırasında yalnızca fazla deri alınmakla kalmaz; karın ortasında birbirinden açılmış olan rectus kasları (diastazis rekti) da birbirine yaklaştırılarak güçlü ve düz bir karın duvarı oluşturulur. Bikinide görünmeyecek şekilde kasık kıvrımına gizlenen insizyon çizgisi sayesinde nedbe son derece gizli kalır. Liposuction ile kombine edildiğinde (lipo-abdominoplasti) çok daha belirgin sonuçlar elde edilmektedir.",
    benefits: ["Diastazis rekti onarımı", "Gizli kesi kasık kıvrımında", "Liposuction ile kombine", "Doğum sonrası karın için ideal", "Düz ve sıkı karın duvarı", "Kalıcı sonuç"],
  },
  "meme-estetigi": {
    title: "Meme Estetiği",
    category: "Estetik Cerrahi",
    description: "Meme estetiği, meme büyütme (augmentasyon), meme küçültme (redüksiyon), meme dikleştirme (mastopeksi) ve meme yeniden yapılandırma operasyonlarını kapsayan geniş bir cerrahi alandır. Büyütme operasyonlarında FDA ve CE onaylı anatomik veya yuvarlak silikon implantlar kullanılır; implant tipi, boyutu ve yerleştirme yüzeyi (koltuk altı, areola altı veya altaltı) tamamen hastanın anatomisine ve isteğine göre kişiselleştirilir. Küçültme operasyonlarında ise kronik sırt-boyun ağrısı ve duruş bozuklukları gibi fonksiyonel sorunlar da çözülür. 3D simülasyon yazılımıyla operasyon öncesinde sonuç önizlemesi sunulmaktadır.",
    benefits: ["FDA/CE onaylı implantlar", "3D sonuç simülasyonu", "Büyütme, küçültme, dikleştirme", "Koltuk altı gizli kesi seçeneği", "Sırt-boyun ağrısını giderir", "Kişiye özel planlama"],
  },
  "bbl": {
    title: "BBL (Brazilian Butt Lift)",
    category: "Estetik Cerrahi",
    description: "BBL (Brezilya Kalça Estetiği), hastanın karın, bel veya uyluk bölgesinden VASER liposuction ile alınan yağ hücrelerinin özel santrifüj işleminden geçirildikten sonra kalça bölgesine katmanlı olarak enjekte edildiği doğal vücut şekillendirme işlemidir. Herhangi bir yabancı materyal kullanılmadığından uzun vadeli komplikasyon riski son derece düşüktür. Enjekte edilen yağın yaklaşık %65-70'i kalıcı olarak tutunur. İşlem hem bel bölgesini incelterek hem de kalçayı kaldırıp dolgunlaştırarak tek operasyonda çift estetik etki sağlar. Özel pozisyonlu iyileşme yastıkları ve korse kullanımıyla desteklenen 3-4 haftalık iyileşme sürecinden sonra final görünüm ortaya çıkar.",
    benefits: ["%100 doğal kendi yağ dokusu", "VASER ile hassas yağ toplama", "İnce bel + dolgun kalça", "Yabancı materyal yok", "%65-70 kalıcı tutunma", "Çift bölge şekillendirme"],
  },
  "penis-buyutme": {
    title: "Penis Büyütme",
    category: "Estetik Cerrahi",
    description: "Penis büyütme ve şekillendirme işlemleri, cerrahi ve non-cerrahi olmak üzere iki ana kategoride değerlendirilir. Non-cerrahi yöntemde FDA onaylı hyalüronik asit dolgusu veya hastanın kendi yağ dokusu (lipofillig) kullanılarak çap artışı sağlanır; bu işlem klinik ortamda kısa sürede tamamlanır. Cerrahi yöntemde ise süspansör ligaman kesisi ile uzunluk artışı hedeflenir. Tüm işlemler tam gizlilik içinde, uzman üroloji ve estetik cerrahi ekibince gerçekleştirilmektedir. Kişiye özel değerlendirme seansında en uygun yöntem belirlenir ve gerçekçi beklentiler konusunda kapsamlı bilgilendirme yapılır.",
    benefits: ["Cerrahi ve non-cerrahi seçenekler", "FDA onaylı dolgu malzemeleri", "Kendi yağ dokusuyla doğal çap artışı", "Uzman üroloji ekibi", "Tam gizlilik ve özel muayene", "Gerçekçi hedef belirleme"],
  },
  "vajina-estetigi": {
    title: "Vajina Estetiği",
    category: "Estetik Cerrahi",
    description: "Vajinal estetik ve fonksiyonel jinekoloji kapsamındaki operasyonlar; labioplasti (iç veya dış dudak düzeltme), vajinoplasti (vajinal kasılma), klitoroplasti ve himen onarımı gibi prosedürleri içermektedir. Labioplasti, uzun veya asimetrik iç dudak yapısının neden olduğu giysi sürtünmesi, hijyen güçlüğü ve psikolojik rahatsızlıkları ortadan kaldırmak için yapılır. Vajinoplasti ise doğum veya yaşlanmaya bağlı gevşeyen vajinal kasları yeniden sıkılaştırarak fonksiyonel iyileştirme sağlar. Tüm operasyonlar deneyimli jinekoloji ve plastik cerrahi ekibimizce, özel muayene odalarında tam gizlilik ilkesiyle yürütülmektedir.",
    benefits: ["Labioplasti ve vajinoplasti", "Hijyen ve konfor artışı", "Fonksiyonel iyileştirme", "Uzman jinekoloji + plastik cerrahi", "Tam gizlilik", "Kısa iyileşme süresi"],
  },
  // Saç Ekimi
  "dhi-sac-ekimi": {
    title: "DHI Saç Ekimi",
    category: "Saç Ekimi",
    description: "DHI (Direct Hair Implantation) saç ekimi, Kore kökenli Dr. Choi tarafından geliştirilen özel CHOI implanter kalemiyle yapılan ve dünyada en ileri saç ekimi yöntemi olarak kabul edilen bir tekniktir. Bu kalemde saç kökü (greft) önce alınır, ardından aynı cihazla doğrudan alıcı bölgeye kanalı açılıp eş zamanlı olarak yerleştirilir; böylece greftlerin vücut dışında bekleme süresi sıfıra yaklaştırılır ve tutunma oranı maksimuma çıkar. Saç kanalı ön açımı gerektirmediğinden cm² başına daha yoğun ekim yapılabilmekte, saçın doğal çıkış açısı ve yönü hassasiyetle ayarlanabilmektedir. Sonuçlar tamamen doğal görünür; ekilen saçlar ömür boyu dökmez.",
    benefits: ["CHOI implanter kalemi", "Greft bekleme süresi minimuma iner", "Yüksek tutunma oranı", "cm² başına yoğun ekim", "Doğal açı ve yön kontrolü", "Ömür boyu kalıcı sonuç"],
  },
  "dhi-kas-ekimi": {
    title: "DHI Kaş Ekimi",
    category: "Saç Ekimi",
    description: "DHI kaş ekimi, ense bölgesinden alınan ince tek telli saç köklerinin CHOI implanter kalemiyle kaş bölgesine tek tek yerleştirilmesi işlemidir. Her bir greft, doğal kaş çıkış açısına (yaklaşık 10-15 derece) ve yönüne uyacak şekilde hassasiyetle konumlandırılır; bu sayede tamamen organik görünen kalıcı kaşlar elde edilir. İşlem lokal anestezi ile gerçekleştirilir ve genellikle 3-4 saat sürer. Ekilen kaşlar 3-4 ay içinde düşüp yeniden çıkmaya başlar; 8-12 ayda final görünüm ortaya çıkar. Microblading gibi geçici çözümlerin aksine DHI kaş ekimi ömür boyu sürmektedir.",
    benefits: ["CHOI kalemiyle hassas açı kontrolü", "Doğal kaş görünümü", "Lokal anestezi", "Microblading'in aksine kalıcı", "8-12 ayda final sonuç", "Kişisel kaş tasarımı"],
  },
  "dhi-sakal-ekimi": {
    title: "DHI Sakal Ekimi",
    category: "Saç Ekimi",
    description: "DHI sakal ekimi, ense bölgesinden alınan genetik olarak dökülmeye dirençli saç köklerinin CHOI implanter kalemiyle sakal bölgesine, yanaklar, çene ve bıyık hatlarına uygun açı ve yoğunlukla yerleştirildiği kalıcı bir estetik işlemdir. Graftlar yüzün anatomik yapısına ve doğal sakal büyüme yönüne göre tasarlanır. İşlem sonrası sakallar 3-4 ay içinde erken dönem dökülmesinin ardından kalıcı olarak büyümeye başlar; tıraş edilebilir, şekillendirilebilir ve tamamen doğal hissettirirler. Donör bölgede ise hiç iz kalmaz, sadece çok kısa süreli kızarıklık oluşabilir.",
    benefits: ["Genetik dökülmeye dirençli greft", "Doğal sakal hattı tasarımı", "Tıraş edilebilir sonuç", "Donör bölgede iz yok", "Lokal anestezi ile ağrısız", "Kalıcı ve gerçek sakal"],
  },
  "prp": {
    title: "PRP (Platelet Rich Plasma)",
    category: "Saç Ekimi",
    description: "PRP (Trombositten Zengin Plazma) tedavisinde hastanın kendi kanından alınan 10-20 ml kan, özel santrifüj cihazında döndürülerek trombosit yoğunluğu normal kanın 4-8 katına çıkarılmış plazma elde edilir. Bu trombositçe zengin plazma saç dökülmesinin yaşandığı alanlara ince iğnelerle enjekte edildiğinde içerdiği büyüme faktörleri (VEGF, EGF, TGF-β) saç foliküllerini uyarır, yeni damar oluşumunu tetikler ve uyku evresindeki saç köklerini aktif faza geçirir. 3-4 seans protokolüyle yürütülen tedavide hastaların %80'inden fazlasında saç dökülmesinin durduğu ve mevcut saç yoğunluğunun arttığı gözlemlenmektedir.",
    benefits: ["Kendi kanından elde edilen doğal plazma", "4-8 kat yoğunlaştırılmış trombosit", "Büyüme faktörleriyle folikül aktivasyonu", "%80+ saç dökülmesini durdurma", "Seans aralarında sosyal hayat devam", "İlaç bağımlılığı yok"],
  },
  "kok-hucre-tedavisi": {
    title: "Kök Hücre Tedavisi",
    category: "Saç Ekimi",
    description: "Saç için kök hücre tedavisi, rejeneratif tıbbın en güncel uygulamalarından biridir. Hastanın kendi yağ dokusundan elde edilen mezenkim kök hücreleri (SVF - Stromal Vasküler Fraksiyon) veya saç folikülünden izole edilen dermal papilla hücreleri saç dökülmesinin yoğun olduğu bölgelere enjekte edilir. Bu hücreler, hasar görmüş ve küçülmüş saç foliküllerini yeniden programlayarak onları aktive eder; miniaturizasyon sürecini tersine çevirir. PRP ile kombinasyonu sinerjistik etki yaratmaktadır. Tek seans yeterli olabilmekte; etki 6-18 ay boyunca sürmektedir. Saç ekimine uygun olmayan hastalarda da uygulanabilmektedir.",
    benefits: ["Kendi yağ/saç folikülünden kök hücre", "Miniaturizasyonu tersine çevirir", "PRP ile kombine sinerjistik etki", "Tek seans yeterli olabilir", "Ekim uygun olmayan hastalara da uygulanan", "6-18 ay etki süresi"],
  },
  "sac-lazeri": {
    title: "Saç Lazeri (LLLT)",
    category: "Saç Ekimi",
    description: "Düşük Seviyeli Lazer Terapi (LLLT - Low Level Laser Therapy), 650-670 nm dalga boyundaki soğuk lazer ışığının saç foliküllerine uygulanmasıyla hücresel enerji üretimini (ATP sentezini) artıran FDA onaylı non-invaziv bir tedavi yöntemidir. Lazer ışığı folikül hücrelerinin mitokondrisine etki ederek kan dolaşımını güçlendirir, oksidatif stresi azaltır ve telogen (dinlenme) evresindeki folikülleri anagen (büyüme) evresine taşır. Saç ekimi sonrasında yeni ekilen saçların tutunmasını hızlandırmak, saç dökülme tedavilerini desteklemek veya saç kalınlığını artırmak amacıyla yaygın şekilde kullanılmaktadır. Ağrısız, kimyasal içermez ve yan etkisi yoktur.",
    benefits: ["FDA onaylı LLLT teknolojisi", "ATP sentezini artırır", "Folikülleri büyüme evresine taşır", "Saç ekimi sonrası tutunmayı hızlandırır", "Tamamen ağrısız ve yan etkisiz", "Kimyasal içermez"],
  },
  // Obezite Cerrahisi
  "mide-baypas": {
    title: "Mide Bypass",
    category: "Obezite Cerrahisi",
    description: "Laparoskopik Roux-en-Y Gastrik Bypass, bariatrik cerrahinin altın standardı kabul edilen ve hem kısıtlayıcı hem de malabsorptif etki yaratan iki mekanizmalı bir ameliyattır. Operasyonda önce mide küçük bir kese (yaklaşık 30 ml) şeklinde ayrıştırılır; ardından ince bağırsak bu keseye doğrudan bağlanarak yiyeceğin mide ve onikiparmak bağırsağının büyük kısmını atlaması (bypass) sağlanır. Bu sayede hem alınan besin miktarı azalır hem de sindirim hormonları yeniden düzenlenerek tokluk hissi kalıcı olarak değişir. Hastalar ilk 12-18 ayda fazla kilolarının %70-80'ini verebilmekte; Tip 2 diyabet remisyon oranı %80'e ulaşmaktadır.",
    benefits: ["Çift mekanizma: kısıtlayıcı + malabsorptif", "12-18 ayda %70-80 fazla kilo kaybı", "%80 Tip 2 diyabet remisyonu", "Tansiyon ve kolesterol düzenlenmesi", "Laparoskopik kapalı yöntem", "Uzun vadeli kalıcı sonuç"],
  },
  "tup-mide": {
    title: "Tüp Mide Ameliyatı",
    category: "Obezite Cerrahisi",
    description: "Laparoskopik Sleeve Gastrektomi (Tüp Mide), dünyada en yaygın uygulanan bariatrik cerrahi prosedürüdür. Karın duvarında yalnızca 5-6 adet küçük delik açılarak gerçekleştirilen bu kapalı ameliyatta midenin yaklaşık %75-80'i kalıcı olarak çıkarılır; geriye muz ya da tüp şeklinde yaklaşık 100-150 ml hacimli küçük bir mide parçası kalır. Yalnızca kısıtlayıcı bir etki yaratmakla kalmaz; midenin çıkarılan kısmıyla birlikte iştahı kontrol eden ghrelin hormonu da büyük ölçüde azalır ve hastalar çok daha az acıkır. Operasyon ortalama 60-90 dakika sürer, hastanede kalış süresi 2-3 gün, işe dönüş süresi ise yaklaşık 2 haftadır.",
    benefits: ["Kapalı (laparoskopik) yöntem", "Ghrelin hormonu azalır, iştah kesilir", "%75-80 mide hacmi küçülür", "60-90 dakika operasyon", "2-3 gün hastanede kalış", "İlk yıl %60-70 fazla kilo kaybı"],
  },
  "mide-balonu": {
    title: "Mide Balonu (6-12 Aylık)",
    category: "Obezite Cerrahisi",
    description: "Mide balonu, herhangi bir cerrahi kesi veya anestezi gerektirmeksizin endoskop aracılığıyla mideye yerleştirilen ve şişirilerek mide hacmini dolduran geçici bir kilo yönetim yöntemidir. İşlem ortalama 20-30 dakika sürer ve hasta aynı gün taburcu edilir. Balon içinde bulunduğu süre boyunca daha erken tokluk hissi yaratır, öğün porsiyonlarını küçültür ve yeme alışkanlıklarını yeniden programlar. 6 aylık modelde %10-15, 12 aylık modelde %15-20 vücut ağırlığı kaybı hedeflenmektedir. Süre sonunda balon endoskopik yolla kolayca geri alınır. Cerrahi risk taşımayan, hafif-orta obezitesi olan kişiler için ideal bir başlangıç yöntemidir.",
    benefits: ["Cerrahi ve anestezi gerektirmez", "20-30 dakika endoskopik işlem", "Aynı gün taburcu", "6 veya 12 aylık seçenek", "Yeme alışkanlığını yeniden programlar", "Kolay geri alınabilir"],
  },
  "mide-botoksu": {
    title: "Mide Botoksu",
    category: "Obezite Cerrahisi",
    description: "Mide botoksu, endoskopi eşliğinde mide kaslarının belirli bölgelerine botulinum toksin enjekte edilmesiyle yapılan non-cerrahi bir kilo yönetim prosedürüdür. Botoks mide kaslarının kasılma hızını yavaşlatır; midede bekleyen yiyeceğin boşalma süresi uzar ve beyin daha uzun süre tokluk sinyali alır. Bunun yanı sıra iştahtan sorumlu fundus bölgesindeki sinir uçları geçici olarak bloke edilerek iştah baskılanır. İşlem yaklaşık 15-20 dakika sürer, sedasyon altında rahatlıkla gerçekleştirilir ve hasta aynı gün eve gider. Etki süresi 4-6 aydır; düzenli beslenme ve egzersiz programıyla desteklendiğinde bu sürede 10-15 kg kayıp hedeflenir.",
    benefits: ["Cerrahi gerektirmez, 15-20 dakika", "Mide boşalmasını yavaşlatır", "İştahı baskılar", "Sedasyon ile konforlu işlem", "Aynı gün eve dönüş", "4-6 ay etki süresi"],
  },
  "tip2-diyabet": {
    title: "Tip 2 Diyabet Operasyonu",
    category: "Obezite Cerrahisi",
    description: "Metabolik cerrahi, özellikle obeziteyle ilişkili Tip 2 diyabeti, ilaçsız ya da minimal ilaçla kontrol altına almayı hedefleyen bariatrik prosedürlerin özelleşmiş uygulamasıdır. Gastrik bypass ve transit bipartition gibi metabolik cerrahi yöntemlerinde ince bağırsak yeniden düzenlenerek GLP-1 başta olmak üzere insülin salgısını artıran inkretin hormonlarının salınımı dramatik biçimde yükselir. Bunun sonucunda pankreas beta hücreleri yeniden aktive olur ve kan şekeri ilaçsız normalize edilebilir. Uluslararası diyabet cemiyetlerinin verilerine göre düzgün hasta seçiminde %80'in üzerinde tam remisyon sağlanmaktadır; bu oran en iyi ilaç tedavisinin 3-4 katıdır.",
    benefits: ["%80+ Tip 2 diyabet tam remisyonu", "İnkretin hormon salınımı artışı", "İlaç tedavisinin 3-4 katı etki", "Pankreas beta hücresi aktivasyonu", "Kan şekeri normalizasyonu", "Uzun vadeli metabolik sağlık"],
  },
  // Göz Operasyonları
  "lazer-goz": {
    title: "Excimer Laser (Göz Lazeri)",
    category: "Göz Operasyonları",
    description: "Excimer Laser, 193 nm dalga boyunda ultraviyole ışık yayarak kornea dokusunu atomik düzeyde hassasiyetle yeniden şekillendiren ve miyopi, hipermetropi ile astigmatı kalıcı olarak düzelten ileri teknoloji bir göz ameliyatı yöntemidir. Kliniğimizde LASIK, LASEK ve TransPRK olmak üzere üç farklı excimer lazer tekniği uygulanmaktadır. LASIK'te ince bir korneal flep kaldırılıp altına lazer uygulandıktan sonra flep yerine kapatılır; görme kalitesi birkaç saat içinde yükselir. LASEK ve TransPRK ise flep gerektirmeksizin doğrudan kornea yüzeyine uygulanan, ince kornea yapısı olan hastalara özel yöntemlerdir. Her iki göze toplam lazer süresi yalnızca 20-30 saniyedir. Wave-front rehberli kişiselleştirilmiş lazer planlamasıyla hastanın göz haritası benzersiz biçimde işlenir.",
    benefits: ["LASIK, LASEK, TransPRK seçenekleri", "20-30 saniye lazer süresi", "Gözlük ve lens bağımlılığından kurtuluş", "Wave-front rehberli kişisel planlama", "Birkaç saat içinde net görüş", "%99 üzeri hasta memnuniyeti"],
  },
  "katarakt-ameliyati": {
    title: "Katarakt Ameliyatı",
    category: "Göz Operasyonları",
    description: "Katarakt, göz merceğinin zamanla bulanıklaşmasıdır ve cerrahi dışında kesin tedavisi yoktur. Modern fakoemülsifikasyon yönteminde yalnızca 2-3 mm'lik mikro kesi açılarak bulanıklaşmış mercek ultrasonik dalgalarla parçalanıp emilir; yerine katlanan yapay intraoküler lens (IOL) yerleştirilerek kesi dikişsiz kapanır. Tüm işlem ortalama 10-15 dakika sürer ve damla anestezi yeterlidir; enjeksiyon gerekmez. Tek odaklı lenslerden trifokal (yakın-orta-uzak tüm mesafe) akıllı lenslere kadar geniş bir yelpazede kişiye özel lens seçeneği sunulmaktadır. Hasta aynı gün taburcu edilir ve çoğunlukla 24-48 saat içinde görme netleşmeye başlar.",
    benefits: ["Fakoemülsifikasyon ultrasonik teknik", "2-3 mm mikro kesi, dikişsiz", "Damla anestezi, enjeksiyon yok", "10-15 dakika operasyon", "Trifokal akıllı lens seçeneği", "Aynı gün taburcu"],
  },
  "akilli-lens": {
    title: "Smart Lens (Akıllı Lens)",
    category: "Göz Operasyonları",
    description: "Akıllı Lens (Trifokal veya EDOF intraoküler lens), yüksek numaralı gözlük bağımlılığını veya kataraktı tedavi ederken yaşa bağlı yakın görme kaybını (presbiopi) da kalıcı olarak ortadan kaldıran premium bir lens çözümüdür. Trifokal IOL tasarımı sayesinde tek lens; yakın (30-40 cm), orta (60-80 cm) ve uzak mesafelerin tamamında keskin görüş sağlar. Bu özelliği standart tek odaklı katarakt lenslerinden çok daha üstün kılar. Lens ömür boyu değiştirilmez; göz içine yerleştirildikten sonra yaşlanmadan veya dış etkenlerden etkilenmez. -20 diyopteriye kadar olan miyopi ve hipermetropilerde başarıyla uygulanmaktadır. Lazer için kornea kalınlığı yetersiz olan hastalara da ideal bir alternatiftir.",
    benefits: ["Yakın, orta ve uzak net görüş", "Presbiopi'yi kalıcı çözer", "-20 diyoptere kadar uygulanabilir", "Ömür boyu değiştirilmez", "Katarakt + gözlük bağımlılığını çözer", "İnce kornealı hastalara alternatif"],
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