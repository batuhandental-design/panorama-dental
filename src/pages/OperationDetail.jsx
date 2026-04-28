import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, CheckCircle } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import WhatsAppButton from "../components/home/WhatsAppButton";
import { useLanguage } from "@/lib/LanguageContext";

// All operation data
const operations = {
  // Estetik Cerrahi
  "goz-kapagi-estetigi": {
    tr: { title: "Göz Kapağı Estetiği", subtitle: "Eyelid Aesthetics", emoji: "👁️", category: "Estetik Cerrahi", description: "Göz kapağı estetiği (blefaroplasti), sarkık veya şişkin göz kapaklarını düzelterek daha genç ve dinç bir görünüm kazandıran cerrahi bir işlemdir. Hem üst hem de alt göz kapaklarına uygulanabilir. İşlem, gereksiz deri, kas ve yağ dokusunu kaldırarak gözlerin daha açık ve canlı görünmesini sağlar.", benefits: ["Daha genç görünüm", "Sarkıklık giderilir", "Görüş alanı genişler", "Kalıcı sonuçlar", "Minimal iz"] },
    en: { title: "Eyelid Aesthetics", subtitle: "Blepharoplasty", emoji: "👁️", category: "Aesthetic Surgery", description: "Eyelid aesthetics (blepharoplasty) is a surgical procedure that corrects droopy or puffy eyelids to achieve a younger and more refreshed appearance. It can be applied to both upper and lower eyelids.", benefits: ["Younger appearance", "Removes droopiness", "Wider field of vision", "Permanent results", "Minimal scarring"] },
  },
  "yuze-yag-enjeksiyonu": {
    tr: { title: "Yüze Yağ Enjeksiyonu", subtitle: "Fat Injection", emoji: "💉", category: "Estetik Cerrahi", description: "Yüze yağ enjeksiyonu, hastanın kendi vücudundan alınan yağ dokusunun yüz bölgesine enjekte edilerek hacim kaybını gidermek ve gençleştirmek amacıyla yapılan doğal bir dolgu işlemidir. Sentetik dolgu maddelerine kıyasla çok daha doğal ve kalıcı sonuçlar sunar.", benefits: ["Doğal dolgu", "Kendi yağ dokusu", "Uzun süreli etki", "Hem dolgu hem gençleştirme", "Minimal risk"] },
    en: { title: "Fat Injection to Face", subtitle: "Facial Fat Transfer", emoji: "💉", category: "Aesthetic Surgery", description: "Facial fat injection is a natural filling procedure using the patient's own fat tissue to restore volume loss and rejuvenate the face. It offers more natural and long-lasting results compared to synthetic fillers.", benefits: ["Natural filler", "Own fat tissue", "Long-lasting effect", "Volume + rejuvenation", "Minimal risk"] },
  },
  "yuz-germe": {
    tr: { title: "Yüz Germe", subtitle: "Facelift", emoji: "✨", category: "Estetik Cerrahi", description: "Yüz germe ameliyatı (ritidektomi), yüz ve boyun bölgesindeki sarkıklıkları, kırışıklıkları ve deri gevşemesini gidererek daha genç ve dinç bir görünüm elde etmeyi sağlayan kapsamlı bir estetik cerrahi işlemdir.", benefits: ["10+ yıl gençleşme", "Kalıcı sonuçlar", "Boyun da dahil", "Doğal görünüm", "Özgüven artışı"] },
    en: { title: "Facelift", subtitle: "Rhytidectomy", emoji: "✨", category: "Aesthetic Surgery", description: "A facelift (rhytidectomy) is a comprehensive cosmetic surgical procedure that eliminates sagging, wrinkles and skin laxity in the face and neck area for a younger, more refreshed appearance.", benefits: ["10+ years younger", "Permanent results", "Includes neck", "Natural look", "Confidence boost"] },
  },
  "rinoplasti": {
    tr: { title: "Rinoplasti", subtitle: "Rhinoplasty", emoji: "👃", category: "Estetik Cerrahi", description: "Rinoplasti (burun estetiği), burun şeklini, boyutunu ve oranlarını düzenlemek amacıyla yapılan cerrahi bir işlemdir. Hem estetik hem de fonksiyonel sorunları (burun tıkanıklığı gibi) aynı anda çözebilir.", benefits: ["Estetik ve fonksiyonel", "Kalıcı sonuçlar", "Nefes problemlerini çözer", "Yüz uyumu", "Kişiye özel tasarım"] },
    en: { title: "Rhinoplasty", subtitle: "Nose Job", emoji: "👃", category: "Aesthetic Surgery", description: "Rhinoplasty (nose aesthetics) is a surgical procedure to reshape, resize and rebalance the nose. It can address both aesthetic concerns and functional issues (such as nasal obstruction) simultaneously.", benefits: ["Aesthetic & functional", "Permanent results", "Fixes breathing issues", "Facial harmony", "Custom design"] },
  },
  "bisektomi": {
    tr: { title: "Bişektomi", subtitle: "Bichectomy", emoji: "😊", category: "Estetik Cerrahi", description: "Bişektomi, yüz dolgunluğuna yol açan yanak yağ bezlerinin (Bichat yağ yastıkçıkları) cerrahi olarak uzaklaştırılması işlemidir. Daha keskin elma kemikleri ve ince bir yüz hattı elde etmek isteyenler için idealdir.", benefits: ["İnce yüz hattı", "Keskin elma kemikleri", "Minimal invazif", "Hızlı iyileşme", "Kalıcı sonuç"] },
    en: { title: "Bichectomy", subtitle: "Cheek Reduction", emoji: "😊", category: "Aesthetic Surgery", description: "Bichectomy is the surgical removal of Bichat fat pads from the cheeks to create a slimmer, more defined facial contour with sharper cheekbones.", benefits: ["Slimmer face", "Sharper cheekbones", "Minimally invasive", "Fast recovery", "Permanent result"] },
  },
  "liposuction": {
    tr: { title: "Liposuction", subtitle: "Liposuction", emoji: "⚕️", category: "Estetik Cerrahi", description: "Liposuction, diyet ve egzersizle erimeyen bölgesel yağ birikintilerini cerrahi olarak uzaklaştıran vücut şekillendirme işlemidir. Karın, bel, kalça, uyluk ve kol gibi bölgelere uygulanabilir.", benefits: ["Bölgesel incelme", "Kalıcı yağ uzaklaştırma", "Vücut konturu", "Birden fazla bölge", "Hızlı iyileşme"] },
    en: { title: "Liposuction", subtitle: "Fat Removal Surgery", emoji: "⚕️", category: "Aesthetic Surgery", description: "Liposuction is a body contouring procedure that surgically removes localized fat deposits resistant to diet and exercise. It can be applied to areas such as the abdomen, waist, hips, thighs and arms.", benefits: ["Targeted slimming", "Permanent fat removal", "Body contouring", "Multiple areas", "Fast recovery"] },
  },
  "karin-germe": {
    tr: { title: "Karın Germe", subtitle: "Abdominoplasty", emoji: "👙", category: "Estetik Cerrahi", description: "Karın germe ameliyatı (abdominoplasti), karın bölgesindeki fazla deri ve yağ dokusunu uzaklaştırarak düz ve sıkı bir karın profili elde etmek için yapılan cerrahi işlemdir. Hamilelik veya hızlı kilo kaybı sonrası ideal sonuçlar sunar.", benefits: ["Düz karın profili", "Fazla deri giderilir", "Karın kasları sıkılaştırılır", "Hamilelik sonrası uygun", "Uzun süreli sonuç"] },
    en: { title: "Tummy Tuck", subtitle: "Abdominoplasty", emoji: "👙", category: "Aesthetic Surgery", description: "A tummy tuck (abdominoplasty) removes excess skin and fat from the abdomen to achieve a flat and firm abdominal profile. Ideal after pregnancy or rapid weight loss.", benefits: ["Flat abdomen", "Removes excess skin", "Tightens muscles", "Post-pregnancy ideal", "Long-lasting result"] },
  },
  "meme-estetigi": {
    tr: { title: "Meme Estetiği", subtitle: "Breast Aesthetics", emoji: "🌸", category: "Estetik Cerrahi", description: "Meme estetiği; meme büyütme, küçültme, dikleştirme veya şekillendirme ameliyatlarını kapsar. Her hasta için kişiselleştirilmiş bir tedavi planı hazırlanır.", benefits: ["Büyütme, küçültme, dikleştirme", "Kişiye özel plan", "Doğal görünüm", "Özgüven artışı", "Kalıcı sonuçlar"] },
    en: { title: "Breast Aesthetics", subtitle: "Breast Surgery", emoji: "🌸", category: "Aesthetic Surgery", description: "Breast aesthetics covers augmentation, reduction, lift or reshaping surgeries. A personalized treatment plan is prepared for each patient.", benefits: ["Augmentation, reduction, lift", "Personalized plan", "Natural appearance", "Confidence boost", "Permanent results"] },
  },
  "bbl": {
    tr: { title: "BBL", subtitle: "Brazilian Butt Lift", emoji: "✨", category: "Estetik Cerrahi", description: "BBL (Brazilian Butt Lift), hastanın kendi vücudundan alınan yağın kalça bölgesine transfer edilmesiyle daha dolgun, yuvarlak ve şekilli bir kalça elde etmeyi sağlayan popüler bir estetik işlemdir.", benefits: ["Doğal yağ transferi", "Dolgun kalça", "Hem liposuction hem dolgu", "Vücut oranları", "Kalıcı sonuç"] },
    en: { title: "BBL", subtitle: "Brazilian Butt Lift", emoji: "✨", category: "Aesthetic Surgery", description: "BBL (Brazilian Butt Lift) is a popular cosmetic procedure where fat from the patient's own body is transferred to the buttocks to create a fuller, rounder and more shapely appearance.", benefits: ["Natural fat transfer", "Fuller buttocks", "Liposuction + augmentation", "Body proportions", "Permanent result"] },
  },
  "penis-buyutme": {
    tr: { title: "Penis Büyütme", subtitle: "Penile Augmentation", emoji: "⚕️", category: "Estetik Cerrahi", description: "Penis büyütme işlemleri, uzunluk ve kalınlık artışı sağlamak amacıyla uygulanan cerrahi veya enjeksiyon bazlı prosedürlerdir. Kişinin öz güvenini ve yaşam kalitesini artırmayı hedefler.", benefits: ["Uzunluk artışı", "Kalınlık artışı", "Minimal invazif seçenekler", "Gizlilik", "Uzman doktorlar"] },
    en: { title: "Penis Enlargement", subtitle: "Penile Augmentation", emoji: "⚕️", category: "Aesthetic Surgery", description: "Penile augmentation procedures are surgical or injection-based methods to increase length and girth, aiming to improve self-confidence and quality of life.", benefits: ["Length increase", "Girth increase", "Minimally invasive options", "Confidentiality", "Expert doctors"] },
  },
  "vajina-estetigi": {
    tr: { title: "Vajina Estetiği", subtitle: "Vaginal Aesthetics", emoji: "⚕️", category: "Estetik Cerrahi", description: "Vajina estetiği (vajinoplasti, labioplasti), fonksiyonel ve estetik iyileştirme sağlamak amacıyla yapılan jinekolojik cerrahi işlemleri kapsar. Konfor, estetik ve yaşam kalitesini artırmaya yönelik kişiselleştirilmiş çözümler sunar.", benefits: ["Estetik iyileştirme", "Konfor artışı", "Kişiselleştirilmiş", "Gizlilik", "Uzman jinekologlar"] },
    en: { title: "Vaginal Aesthetics", subtitle: "Vaginoplasty", emoji: "⚕️", category: "Aesthetic Surgery", description: "Vaginal aesthetics (vaginoplasty, labiaplasty) covers gynecological surgical procedures for functional and aesthetic improvement, offering personalized solutions for comfort, aesthetics and quality of life.", benefits: ["Aesthetic improvement", "Comfort boost", "Personalized", "Confidentiality", "Expert gynecologists"] },
  },
  // Saç Ekimi
  "dhi-sac-ekimi": {
    tr: { title: "DHI Saç Ekimi", subtitle: "DHI Hair Transplant", emoji: "🌱", category: "Saç Ekimi", description: "DHI (Direct Hair Implantation) tekniği, saç köklerinin özel Choi kalemleri kullanılarak doğrudan alıcı bölgeye implante edildiği en gelişmiş saç ekimi yöntemidir. Kesisiz ve dikişsiz uygulamasıyla çok hızlı iyileşme süreci sunar.", benefits: ["Kesisiz yöntem", "Hızlı iyileşme", "Doğal sonuç", "Yüksek yoğunluk", "Minimal iz"] },
    en: { title: "DHI Hair Transplant", subtitle: "Direct Hair Implantation", emoji: "🌱", category: "Hair Transplant", description: "DHI (Direct Hair Implantation) is the most advanced hair transplant technique where hair follicles are implanted directly into the recipient area using special Choi pens. It offers very fast recovery with no cuts or stitches.", benefits: ["No incisions", "Fast recovery", "Natural result", "High density", "Minimal scarring"] },
  },
  "dhi-kas-ekimi": {
    tr: { title: "DHI Kaş Ekimi", subtitle: "DHI Eyebrow Transplant", emoji: "🌿", category: "Saç Ekimi", description: "DHI kaş ekimi, seyrek, şekilsiz veya tamamen dökülmüş kaşları doğal görünümlü ve kalıcı bir şekle kavuşturmak için DHI tekniğiyle yapılan hassas bir işlemdir.", benefits: ["Kalıcı kaş", "Doğal görünüm", "Kişiye özel tasarım", "Minimal iz", "Hızlı iyileşme"] },
    en: { title: "DHI Eyebrow Transplant", subtitle: "Eyebrow Restoration", emoji: "🌿", category: "Hair Transplant", description: "DHI eyebrow transplant is a precise procedure using DHI technique to give sparse, shapeless or completely lost eyebrows a natural-looking and permanent shape.", benefits: ["Permanent eyebrows", "Natural look", "Custom design", "Minimal scarring", "Fast recovery"] },
  },
  "dhi-sakal-ekimi": {
    tr: { title: "DHI Sakal Ekimi", subtitle: "DHI Beard Transplant", emoji: "🧔", category: "Saç Ekimi", description: "DHI sakal ekimi, seyrek veya boş alanlara sahip sakallara DHI tekniğiyle doğal ve kalıcı bir dolgunluk kazandıran erkek estetiği işlemidir.", benefits: ["Kalıcı sakal", "Doğal dolgunluk", "Boşluklar doldurulur", "Kişiye özel", "Hızlı iyileşme"] },
    en: { title: "DHI Beard Transplant", subtitle: "Beard Restoration", emoji: "🧔", category: "Hair Transplant", description: "DHI beard transplant is a male aesthetic procedure that gives sparse or patchy beards a natural and permanent fullness using the DHI technique.", benefits: ["Permanent beard", "Natural fullness", "Patches filled", "Custom design", "Fast recovery"] },
  },
  "prp": {
    tr: { title: "PRP", subtitle: "Platelet Rich Plasma", emoji: "🩸", category: "Saç Ekimi", description: "PRP (Trombositten Zengin Plazma) tedavisi, hastanın kendi kanından elde edilen büyüme faktörlerinin saçlı deriye enjekte edilmesiyle saç dökülmesini durduran ve yeni saç büyümesini teşvik eden doğal bir tedavi yöntemidir.", benefits: ["Doğal tedavi", "Saç dökülmesini durdurur", "Yeni saç çıkışı", "Kendi kanı kullanılır", "Minimal risk"] },
    en: { title: "PRP", subtitle: "Platelet Rich Plasma", emoji: "🩸", category: "Hair Transplant", description: "PRP (Platelet Rich Plasma) treatment is a natural therapy where growth factors obtained from the patient's own blood are injected into the scalp to stop hair loss and stimulate new hair growth.", benefits: ["Natural treatment", "Stops hair loss", "New hair growth", "Uses own blood", "Minimal risk"] },
  },
  "kok-hucre-tedavisi": {
    tr: { title: "Kök Hücre Tedavisi", subtitle: "Stem Cell Treatment", emoji: "🔬", category: "Saç Ekimi", description: "Saç için kök hücre tedavisi, saç foliküllerini yenilemek ve güçlendirmek amacıyla kök hücre bazlı bileşenlerin saçlı deriye uygulandığı yenilikçi bir yöntemdir.", benefits: ["Folikül yenilenmesi", "Saç güçlendirilir", "Yenilikçi yöntem", "Minimal invazif", "Uzun etkili"] },
    en: { title: "Stem Cell Treatment", subtitle: "Hair Stem Cell Therapy", emoji: "🔬", category: "Hair Transplant", description: "Stem cell treatment for hair is an innovative method where stem cell-based components are applied to the scalp to renew and strengthen hair follicles.", benefits: ["Follicle renewal", "Hair strengthening", "Innovative method", "Minimally invasive", "Long-lasting"] },
  },
  "sac-lazeri": {
    tr: { title: "Saç Lazeri", subtitle: "Hair Laser Therapy", emoji: "💡", category: "Saç Ekimi", description: "Saç lazeri (düşük seviyeli lazer tedavisi - LLLT), saç köklerini uyararak saç dökülmesini yavaşlatan ve saç büyümesini destekleyen ağrısız ve invazif olmayan bir tedavi yöntemidir.", benefits: ["Ağrısız", "İnvazif değil", "Saç dökülmesini yavaşlatır", "Saç büyümesi", "Seans bazlı"] },
    en: { title: "Hair Laser", subtitle: "Low Level Laser Therapy", emoji: "💡", category: "Hair Transplant", description: "Hair laser (Low Level Laser Therapy - LLLT) is a painless and non-invasive treatment that stimulates hair follicles to slow down hair loss and support hair growth.", benefits: ["Painless", "Non-invasive", "Slows hair loss", "Hair growth", "Session-based"] },
  },
  // Obezite
  "mide-baypas": {
    tr: { title: "Mide Bypass", subtitle: "Gastric Bypass", emoji: "🏥", category: "Obezite Cerrahisi", description: "Mide bypass ameliyatı, mideyi küçülterek ve sindirim sistemini yeniden düzenleyerek ciddi kilo kaybı sağlayan ve tip 2 diyabeti büyük ölçüde iyileştiren bariatrik bir cerrahi işlemdir.", benefits: ["Uzun süreli kilo kaybı", "Diyabet iyileşmesi", "Laparoskopik yöntem", "Metabolizma düzenleme", "Yaşam kalitesi"] },
    en: { title: "Gastric Bypass", subtitle: "Roux-en-Y Bypass", emoji: "🏥", category: "Obesity Surgery", description: "Gastric bypass surgery is a bariatric surgical procedure that reduces the stomach size and reroutes the digestive system to achieve significant weight loss and greatly improve type 2 diabetes.", benefits: ["Long-term weight loss", "Diabetes improvement", "Laparoscopic method", "Metabolism regulation", "Quality of life"] },
  },
  "tup-mide": {
    tr: { title: "Tüp Mide Ameliyatı", subtitle: "Sleeve Gastrectomy", emoji: "🏥", category: "Obezite Cerrahisi", description: "Tüp mide ameliyatı (sleeve gastrektomi), midenin yaklaşık %80'inin laparoskopik yöntemle çıkarılarak tüp şekline getirildiği, günümüzde en yaygın yapılan bariatrik cerrahi işlemidir.", benefits: ["Mide hacmi %80 azalır", "Hızlı kilo kaybı", "Laparoskopik", "Hormon düzenlenmesi", "Kalıcı çözüm"] },
    en: { title: "Sleeve Gastrectomy", subtitle: "Gastric Sleeve Surgery", emoji: "🏥", category: "Obesity Surgery", description: "Sleeve gastrectomy is the most commonly performed bariatric surgery today, where approximately 80% of the stomach is laparoscopically removed to form a tube shape.", benefits: ["80% stomach reduction", "Rapid weight loss", "Laparoscopic", "Hormone regulation", "Permanent solution"] },
  },
  "mide-balonu": {
    tr: { title: "Mide Balonu", subtitle: "Gastric Balloon", emoji: "🎈", category: "Obezite Cerrahisi", description: "Mide balonu, ameliyat gerektirmeyen, midenin içine endoskopik yöntemle yerleştirilen şişirilebilir bir silikon balon sayesinde tokluk hissi oluşturan ve kilo vermeyi destekleyen geçici bir uygulamadır (6-12 ay).", benefits: ["Cerrahi gerektirmez", "6-12 ay etkili", "Endoskopik uygulama", "Hızlı kilo kaybı", "Geri alınabilir"] },
    en: { title: "Gastric Balloon", subtitle: "Intragastric Balloon", emoji: "🎈", category: "Obesity Surgery", description: "A gastric balloon is a temporary non-surgical procedure (6-12 months) where an inflatable silicone balloon is placed endoscopically inside the stomach to create a feeling of fullness and support weight loss.", benefits: ["No surgery required", "6-12 months effective", "Endoscopic procedure", "Rapid weight loss", "Reversible"] },
  },
  "mide-botoksu": {
    tr: { title: "Mide Botoksu", subtitle: "Gastric Botox", emoji: "💉", category: "Obezite Cerrahisi", description: "Mide botoksu, midedeki kasları geçici olarak yavaşlatan botulinum toksini enjeksiyonu ile açlık hissini azaltan ve kilo vermeyi destekleyen minimal invazif bir işlemdir.", benefits: ["Minimal invazif", "Açlık azalır", "Cerrahi değil", "Hızlı işlem", "Kısa iyileşme"] },
    en: { title: "Gastric Botox", subtitle: "Stomach Botox", emoji: "💉", category: "Obesity Surgery", description: "Gastric botox is a minimally invasive procedure using botulinum toxin injections to temporarily slow stomach muscles, reducing hunger sensations and supporting weight loss.", benefits: ["Minimally invasive", "Reduces hunger", "Non-surgical", "Quick procedure", "Short recovery"] },
  },
  "tip2-diyabet": {
    tr: { title: "Tip 2 Diyabet Operasyonu", subtitle: "Metabolic Surgery", emoji: "🩺", category: "Obezite Cerrahisi", description: "Metabolik cerrahi, tip 2 diyabeti tedavi etmek veya remisyona sokmak amacıyla sindirim sistemini yeniden düzenleyen bariatrik ameliyatların uygulanmasını kapsar. Kilo bağımsız olarak da diyabet üzerinde olumlu etki gösterir.", benefits: ["Diyabet remisyonu", "Kan şekeri kontrolü", "İlaç ihtiyacı azalır", "Uzun süreli etki", "Laparoskopik yöntem"] },
    en: { title: "Type 2 Diabetes Operation", subtitle: "Metabolic Surgery", emoji: "🩺", category: "Obesity Surgery", description: "Metabolic surgery involves bariatric procedures that rearrange the digestive system to treat or put type 2 diabetes into remission, showing positive effects on diabetes even independent of weight loss.", benefits: ["Diabetes remission", "Blood sugar control", "Reduced medication", "Long-term effect", "Laparoscopic method"] },
  },
  // Göz
  "lazer-goz": {
    tr: { title: "Excimer Laser", subtitle: "Lazer Göz Ameliyatı", emoji: "👁️", category: "Göz Operasyonları", description: "Excimer lazer, miyopi, hipermetropi ve astigmatı tedavi etmek için kornea dokusunu yeniden şekillendiren, gözlük ve lens bağımlılığını ortadan kaldıran modern bir göz cerrahi yöntemidir.", benefits: ["Gözlük bağımlılığı bitiyor", "Hızlı iyileşme", "Kalıcı düzeltme", "Ağrısız işlem", "Yüksek başarı oranı"] },
    en: { title: "Excimer Laser", subtitle: "Laser Eye Surgery", emoji: "👁️", category: "Eye Operations", description: "Excimer laser is a modern eye surgery method that reshapes the corneal tissue to treat myopia, hyperopia and astigmatism, eliminating the need for glasses and contact lenses.", benefits: ["No more glasses", "Fast recovery", "Permanent correction", "Painless procedure", "High success rate"] },
  },
  "katarakt-ameliyati": {
    tr: { title: "Katarakt Ameliyatı", subtitle: "Cataract Surgery", emoji: "👓", category: "Göz Operasyonları", description: "Katarakt ameliyatı, gözün doğal merceğinin bulanıklaşmasıyla oluşan kataraktın yapay bir intraoküler lens ile değiştirildiği, günümüzün en sık yapılan ve başarılı göz ameliyatlarından biridir.", benefits: ["Net görüş kazanılır", "Hızlı iyileşme", "Gündüz cerrahisi", "Yüksek başarı oranı", "Hem estetik hem fonksiyonel"] },
    en: { title: "Cataract Surgery", subtitle: "Cataract Removal", emoji: "👓", category: "Eye Operations", description: "Cataract surgery is one of today's most frequently performed and successful eye surgeries, where the clouded natural lens is replaced with an artificial intraocular lens.", benefits: ["Clear vision restored", "Fast recovery", "Day surgery", "High success rate", "Aesthetic & functional"] },
  },
  "akilli-lens": {
    tr: { title: "Smart Lens", subtitle: "Akıllı Lens (Trifocal)", emoji: "🔭", category: "Göz Operasyonları", description: "Akıllı lens (multifokal intraoküler lens) implantasyonu, yakın, orta ve uzak mesafe görüşü tek bir lensle sağlayan, hem katarakt hem de refraktif göz bozukluklarını aynı anda tedavi eden ileri teknoloji bir göz ameliyatıdır.", benefits: ["Yakın + uzak görüş", "Gözlüksüz yaşam", "Katarakt tedavisi", "Kalıcı çözüm", "İleri teknoloji"] },
    en: { title: "Smart Lens", subtitle: "Trifocal Lens Implant", emoji: "🔭", category: "Eye Operations", description: "Smart lens (multifocal intraocular lens) implantation is an advanced eye surgery that provides near, intermediate and distance vision with a single lens, treating both cataracts and refractive errors simultaneously.", benefits: ["Near + far vision", "Glasses-free life", "Cataract treatment", "Permanent solution", "Advanced technology"] },
  },
  // Diş - yeni operasyonlar
  "all-on-4": {
    tr: { title: "All on 4 İmplantasyon", subtitle: "All-on-4 Dental Implants", emoji: "🦷", category: "Diş Tedavileri", description: "All-on-4 implant sistemi, dört stratejik olarak yerleştirilen implant üzerine tam bir diş köprüsü (ark) monte ederek tamamen dişsiz hastalara tek seansta sabit, çıkarılamaz bir diş çözümü sunan devrimsel bir yöntemdir.", benefits: ["Tek seansta tam diş", "Sadece 4 implant", "Kemik grefti gerekmez", "Kalıcı sabit diş", "Hızlı sonuç"] },
    en: { title: "All on 4 Implantation", subtitle: "All-on-4 Dental Implants", emoji: "🦷", category: "Dental Treatments", description: "The All-on-4 implant system is a revolutionary method that mounts a complete dental bridge (arch) on four strategically placed implants, offering fully edentulous patients a fixed, non-removable dental solution in a single session.", benefits: ["Full teeth in one session", "Only 4 implants", "No bone graft needed", "Permanent fixed teeth", "Fast result"] },
  },
  "emax-tac": {
    tr: { title: "Emax Taç", subtitle: "IPS e.max Crown", emoji: "💎", category: "Diş Tedavileri", description: "Emax taç (IPS e.max), lityum disilikat seramikten üretilen, yüksek estetik ve mukavemet sunan en popüler tam seramik kaplama sistemidir. Metal içermez ve doğal dişten ayırt edilemeyecek bir şeffaflık sağlar.", benefits: ["Metal içermez", "Yüksek şeffaflık", "Doğal görünüm", "15+ yıl ömür", "Alerjik reaksiyon yok"] },
    en: { title: "Emax Crown", subtitle: "IPS e.max Ceramic Crown", emoji: "💎", category: "Dental Treatments", description: "The Emax crown (IPS e.max) is the most popular all-ceramic crown system made from lithium disilicate ceramic, offering high aesthetics and strength. Metal-free with indistinguishable translucency from natural teeth.", benefits: ["Metal-free", "High translucency", "Natural look", "15+ year lifespan", "No allergic reaction"] },
  },
  "veneer": {
    tr: { title: "Veneer (Porselen Laminate)", subtitle: "Porcelain Veneer", emoji: "✨", category: "Diş Tedavileri", description: "Porselen laminate veneer, dişlerin ön yüzeyine minimum diş kesimi ile yapıştırılan ultra ince (0,3-0,5 mm) porselen kaplama sistemdir. Renk, şekil ve boyut sorunlarını tek seansta çözebilir.", benefits: ["Ultra ince (0,3 mm)", "Minimum kesim", "Leke tutmaz", "Hızlı sonuç", "10-15 yıl ömür"] },
    en: { title: "Veneer", subtitle: "Porcelain Laminate Veneer", emoji: "✨", category: "Dental Treatments", description: "Porcelain laminate veneers are ultra-thin (0.3-0.5 mm) porcelain shells bonded to the front surface of teeth with minimal tooth reduction. Color, shape and size problems can be solved in a single session.", benefits: ["Ultra thin (0.3mm)", "Minimal tooth reduction", "Stain-resistant", "Fast result", "10-15 year lifespan"] },
  },
  "hareketli-protez": {
    tr: { title: "Hareketli ve Sabit Protez", subtitle: "Dentures", emoji: "🦷", category: "Diş Tedavileri", description: "Diş protezleri, kaybedilen dişlerin estetik ve fonksiyonel olarak yenilenmesini sağlayan çıkarılabilir veya sabit uygulamalardır. Tam veya kısmi olarak her ihtiyaca göre tasarlanır.", benefits: ["Tam veya kısmi", "Ekonomik çözüm", "Hızlı uygulama", "Fonksiyon kazanımı", "Estetik görünüm"] },
    en: { title: "Removable & Fixed Dentures", subtitle: "Dental Prosthetics", emoji: "🦷", category: "Dental Treatments", description: "Dental prosthetics are removable or fixed appliances that restore lost teeth aesthetically and functionally. They are designed as complete or partial according to each need.", benefits: ["Complete or partial", "Economical solution", "Fast application", "Functional restoration", "Aesthetic appearance"] },
  },
  "kanal-tedavisi": {
    tr: { title: "Kanal Tedavisi", subtitle: "Root Canal Treatment", emoji: "🦷", category: "Diş Tedavileri", description: "Kanal tedavisi (endodontik tedavi), ileri çürük veya enfeksiyon nedeniyle hasarlanan dişin iç kısmındaki (pulpa) enfekte dokunun temizlenerek dişin korunmasını sağlayan tedavi yöntemidir.", benefits: ["Diş korunur", "Ağrı geçer", "Enfeksiyon giderilir", "Kaplama ile tamamlanır", "Uzun ömürlü"] },
    en: { title: "Root Canal Treatment", subtitle: "Endodontic Therapy", emoji: "🦷", category: "Dental Treatments", description: "Root canal treatment (endodontic treatment) is a method where infected tissue inside the tooth (pulp) is removed due to advanced decay or infection, preserving the tooth.", benefits: ["Tooth preserved", "Pain eliminated", "Infection removed", "Completed with crown", "Long-lasting"] },
  },
};

export default function OperationDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const data = operations[slug];
  const op = data?.[lang] || data?.tr || data?.en;

  const backLabel = { tr: "Ana Sayfaya Dön", en: "Back to Home", de: "Zurück", ar: "العودة", es: "Volver", it: "Torna", fr: "Retour", ru: "Назад" }[lang] || "Back";
  const aboutLabel = { tr: "Hakkında", en: "About", de: "Über", ar: "حول", es: "Sobre", it: "Info", fr: "À propos", ru: "О процедуре" }[lang] || "About";
  const benefitsLabel = { tr: "Avantajlar", en: "Benefits", de: "Vorteile", ar: "المزايا", es: "Beneficios", it: "Vantaggi", fr: "Avantages", ru: "Преимущества" }[lang] || "Benefits";
  const contactLabel = { tr: "Ücretsiz Konsültasyon", en: "Free Consultation", de: "Beratung", ar: "استشارة", es: "Consulta", it: "Consulenza", fr: "Consultation", ru: "Консультация" }[lang] || "Contact";
  const whatsappLabel = { tr: "WhatsApp ile Yaz", en: "Write on WhatsApp", de: "WhatsApp schreiben", ar: "واتساب", es: "WhatsApp", it: "WhatsApp", fr: "WhatsApp", ru: "WhatsApp" }[lang] || "WhatsApp";
  const callLabel = { tr: "Hemen Ara", en: "Call Now", de: "Jetzt anrufen", ar: "اتصل", es: "Llamar", it: "Chiama", fr: "Appeler", ru: "Позвонить" }[lang] || "Call";

  if (!op) {
    return (
      <div className="min-h-screen bg-[#f7f3ef] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl mb-4">🏥</p>
            <h2 className="text-2xl font-bold text-[#2d2419] mb-4">Sayfa bulunamadı</h2>
            <Link to="/" className="text-[#8B6840] underline">{backLabel}</Link>
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
      <div className="relative overflow-hidden" style={{ minHeight: 480 }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2c2419 0%, #4a3728 60%, #3d3028 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-[#c9a87c] text-sm uppercase tracking-[0.3em] mb-3 font-medium">
            {op.category}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white font-playfair mb-4">
            {op.emoji} {op.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#c9a87c]/80 text-base mb-6">{op.subtitle}</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-[#c9a87c] transition-colors text-sm">
              ← {backLabel}
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-14 mb-16">
          {/* Description */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2d2419] font-playfair mb-4">{aboutLabel}</h2>
            <p className="text-[#6b5e52] leading-relaxed text-[15px]">{op.description}</p>
          </motion.div>

          {/* Benefits */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h3 className="text-xl font-bold text-[#2d2419] font-playfair mb-5">{benefitsLabel}</h3>
            <div className="space-y-3">
              {op.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border border-[#e0d8d0] rounded-xl px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-[#8B6840] flex-shrink-0" />
                  <span className="text-[#4a3728] text-sm font-medium">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="rounded-3xl text-center px-8 py-14"
          style={{ background: "linear-gradient(135deg, #2c2419 0%, #4a3728 50%, #3d3028 100%)" }}
        >
          <p className="text-[#c9a87c] text-xs uppercase tracking-[0.25em] mb-3 font-semibold">{contactLabel}</p>
          <h3 className="text-white text-2xl md:text-3xl font-bold font-playfair mb-6">{op.title}</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/905551896062" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bb5a] transition-all text-sm uppercase tracking-wider">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.849L.057 23.882l6.204-1.448A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.876 9.876 0 01-5.034-1.376l-.361-.214-3.741.873.937-3.63-.235-.374A9.851 9.851 0 012.106 12C2.106 6.525 6.525 2.106 12 2.106c5.476 0 9.894 4.419 9.894 9.894 0 5.476-4.418 9.894-9.894 9.894z" />
              </svg>
              {whatsappLabel}
            </a>
            <a href="tel:+905551896062"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#c9a87c] hover:text-[#c9a87c] transition-all text-sm uppercase tracking-wider">
              📞 {callLabel}
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}