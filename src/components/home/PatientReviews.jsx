import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const reviewsByLang = {
  tr: [
    "Çok ilgili tatlı dilli güler yüzlü. İşinde başarılı. Tedaviler süresinde hiç sorun yaşamadım.",
    "Dr Zeynep hanım işinde olsun insanlara yaklaşımı olsun çok iyi bir doktor. Teşekkür ediyorum.",
    "Deneyimi anlatmaya gerek yok, yıllardır Zeynep Hoca'yı tercih ediyorum.",
    "Zeynep Hanım çok iyi bir doktor. Kendisine çok teşekkür ediyorum.",
    "Zeynep ve tüm ekip çok harikalar. Hiç sorun yaşamadım, gönül rahatlığıyla tercih edebilir herkes.",
    "Daha önceden de işlemler yaptırıp çok memnun kaldığım işin ehli bir doktor.",
    "Zeynep hocamdan çok memnun oldum. Diğer çalışanlardan da memnun kaldım, hepinizin ellerine sağlık.",
    "Doktor hanım önce güler yüzü insanı rahatlatıyor, sonra yaptığı iş çok iyi, eli hafif. Çok teşekkür ederim.",
    "Çok sevdiğim, evimizden biri gibi tatlı dilli çok samimi bir doktor. Dişçiden korkardım ama şimdi severek gidiyorum.",
    "Bana göre iyi bir hekim. Diş rahatsızlığı olanlara tavsiye ederim.",
    "Zeynep hocadan çok memnun kaldım, eşi benzeri bulunmaz, hastasıyla çok iyi ilgileniyor.",
    "Zeynep hanım gayet ilgili, işinde profesyonel ve sabırlı bir doktor, kendisine çok teşekkür ederim.",
    "İlgi, alaka ve samimi bir ortam. Tedavi sürecinde detaylı açıklamaları ve ilgisinden dolayı teşekkürler.",
    "İmplant süreci sorunsuz devam ediyor, hocama çok teşekkürler. Dişlerimle ilgili tüm sıkıntılar için geldiğim bir yer, çok memnunum.",
    "Zeynep hocam gerçekten bu işin vakkosu, eli çok hafif, ağrısız bir süreç. Tavsiye üzerine geldim, çok teşekkür ederim.",
    "Hocamız gayet işinin ehli ve çok güzel çalışıyor. Kesinlikle tavsiye ederim, teşekkürler.",
    "Güler yüz ve samimiyetten dolayı teşekkür ederim. Saygılarımla.",
    "İşinde çok başarılı. Şiddetle tavsiye ederim, çalışanlar çok ilgili.",
    "İlgisinden memnun kaldım. Alanında uzman bir doktor.",
    "Mükemmel bir doktor. Eli çok hafif, işini çok iyi yapan, severek yapan bir doktor.",
  ],
  en: [
    "Very attentive, kind and smiling. Successful in her work. I had no issues during treatments.",
    "Dr. Zeynep is a very good doctor both in her work and her approach to people. I thank her.",
    "No need to describe the experience, I've been choosing Dr. Zeynep for years.",
    "Dr. Zeynep is a very good doctor. I thank her very much.",
    "Zeynep and the whole team are wonderful. I had no issues, anyone can choose them with peace of mind.",
    "A skilled doctor I've been very satisfied with from previous treatments as well.",
    "I'm very happy with Dr. Zeynep. Also happy with the other staff, thank you all.",
    "The doctor first puts you at ease with her smile, then does her work very well, gentle hands. Thank you very much.",
    "A doctor I love very much, kind and very warm like a family member. I used to fear dentists but now I go happily.",
    "A good doctor in my opinion. I recommend her to anyone with dental problems.",
    "I'm very happy with Dr. Zeynep, one of a kind, takes great care of her patients.",
    "Dr. Zeynep is very attentive, professional and patient, I thank her very much.",
    "Attention, care and a warm atmosphere. Thanks for the detailed explanations during treatment.",
    "The implant process is going smoothly, many thanks to my doctor. A place I come for all my dental issues, very satisfied.",
    "Dr. Zeynep is truly a master of this work, very gentle hands, painless process. Came on recommendation, thank you very much.",
    "Our doctor is quite skilled and works beautifully. I definitely recommend, thanks.",
    "Thank you for the smiling face and sincerity. With respect.",
    "Very successful in her work. I strongly recommend, the staff is very attentive.",
    "I was happy with the attention. An expert doctor in her field.",
    "A perfect doctor. Very gentle hands, does her job very well, a doctor who works with love.",
  ],
  de: [
    "Sehr aufmerksam, freundlich und lächelnd. Erfolgreich in ihrer Arbeit. Bei den Behandlungen hatte ich keine Probleme.",
    "Dr. Zeynep ist eine sehr gute Ärztin, sowohl fachlich als auch im Umgang mit Menschen. Ich danke ihr.",
    "Die Erfahrung muss man nicht beschreiben, ich wähle Dr. Zeynep seit Jahren.",
    "Dr. Zeynep ist eine sehr gute Ärztin. Ich danke ihr sehr.",
    "Zeynep und das ganze Team sind wunderbar. Ich hatte keine Probleme, jeder kann sie beruhigt wählen.",
    "Eine kompetente Ärztin, mit der ich auch bei früheren Behandlungen sehr zufrieden war.",
    "Ich bin sehr zufrieden mit Dr. Zeynep. Auch mit dem übrigen Personal zufrieden, danke an alle.",
    "Die Ärztin beruhigt einen zuerst mit ihrem Lächeln, dann macht sie ihre Arbeit sehr gut, sanfte Hände. Vielen Dank.",
    "Eine Ärztin, die ich sehr mag, freundlich und sehr herzlich wie ein Familienmitglied. Ich hatte Angst vor Zahnärzten, aber jetzt gehe ich gerne.",
    "Meiner Meinung nach eine gute Ärztin. Ich empfehle sie allen mit Zahnproblemen.",
    "Ich bin sehr zufrieden mit Dr. Zeynep, einzigartig, kümmert sich sehr gut um ihre Patienten.",
    "Dr. Zeynep ist sehr aufmerksam, professionell und geduldig, ich danke ihr sehr.",
    "Aufmerksamkeit, Fürsorge und eine herzliche Atmosphäre. Danke für die detaillierten Erklärungen während der Behandlung.",
    "Der Implantat-Prozess verläuft reibungslos, vielen Dank an meine Ärztin. Ein Ort, an den ich wegen all meiner Zahnprobleme komme, sehr zufrieden.",
    "Dr. Zeynep ist wirklich eine Meisterin ihres Fachs, sehr sanfte Hände, schmerzfreier Prozess. Auf Empfehlung gekommen, vielen Dank.",
    "Unsere Ärztin ist sehr kompetent und arbeitet wunderschön. Ich empfehle sie unbedingt, danke.",
    "Danke für das Lächeln und die Herzlichkeit. Mit Respekt.",
    "Sehr erfolgreich in ihrer Arbeit. Ich empfehle sie dringend, das Personal ist sehr aufmerksam.",
    "Ich war zufrieden mit der Aufmerksamkeit. Eine Expertin auf ihrem Gebiet.",
    "Eine perfekte Ärztin. Sehr sanfte Hände, macht ihre Arbeit sehr gut, eine Ärztin, die mit Freude arbeitet.",
  ],
  ar: [
    "مُهتمة جداً ولطيفة ومبتسمة. ناجحة في عملها. لم أواجه أي مشاكل أثناء العلاجات.",
    "الدكتورة زينب طبيبة جيدة جداً في عملها وتعاملها مع الناس. أشكرها.",
    "لا حاجة لوصف التجربة، أختار الدكتورة زينب منذ سنوات.",
    "الدكتورة زينب طبيبة جيدة جداً. أشكرها كثيراً.",
    "زينب وكل الفريق رائعون. لم أواجه أي مشاكل، يمكن للجميع اختيارها بطمأنينة.",
    "طبيبة ماهرة كنت راضياً جداً عن علاجاتي السابقة معها أيضاً.",
    "أنا سعيد جداً بالدكتورة زينب. وسعيد أيضاً بباقي الموظفين، شكراً للجميع.",
    "الطبيبة أولاً تطمئنك بابتسامتها، ثم تقوم بعملها بشكل جيد جداً، يدها لطيفة. شكراً جزيلاً.",
    "طبيبة أحبها كثيراً، لطيفة ودافئة كأحد أفراد العائلة. كنت أخاف من أطباء الأسنان لكنني الآن أذهب بسعادة.",
    "طبيبة جيدة برأيي. أنصح بها كل من يعاني من مشاكل الأسنان.",
    "أنا سعيد جداً بالدكتورة زينب، فريدة من نوعها، تعتني بمرضاها جيداً جداً.",
    "الدكتورة زينب مُهتمة جداً، محترفة وصبورة، أشكرها كثيراً.",
    "اهتمام ورعاية وأجواء دافئة. شكراً على الشروحات التفصيلية أثناء العلاج.",
    "عملية الزرعة تسير بسلاسة، شكراً جزيلاً لطبيبتي. مكان أتي إليه لكل مشاكل أسناني، راضٍ جداً.",
    "الدكتورة زينب حقاً ماهرة في هذا العمل، يدها لطيفة جداً، عملية غير مؤلمة. جئت بناءً على توصية، شكراً جزيلاً.",
    "طبيبتنا ماهرة جداً وتعمل بشكل جميل. أنصح بها بالتأكيد، شكراً.",
    "شكراً على الابتسامة والإخلاص. مع احترامي.",
    "ناجحة جداً في عملها. أنصح بها بشدة، الموظفون مُهتمون جداً.",
    "كنت سعيداً بالاهتمام. طبيبة خبيرة في مجالها.",
    "طبيبة مثالية. يدها لطيفة جداً، تقوم بعملها بشكل جيد جداً، طبيبة تعمل بحب.",
  ],
  es: [
    "Muy atenta, amable y sonriente. Exitosa en su trabajo. No tuve problemas durante los tratamientos.",
    "La Dra. Zeynep es una muy buena doctora tanto en su trabajo como en su trato con las personas. La agradezco.",
    "No hace falta describir la experiencia, elijo a la Dra. Zeynep desde hace años.",
    "La Dra. Zeynep es una muy buena doctora. Le agradezco mucho.",
    "Zeynep y todo el equipo son maravillosos. No tuve problemas, cualquiera puede elegirlos con tranquilidad.",
    "Una doctora hábil con la que también estuve muy satisfecho en tratamientos anteriores.",
    "Estoy muy contento con la Dra. Zeynep. También contento con el resto del personal, gracias a todos.",
    "La doctora primero te pone a gusto con su sonrisa, luego hace su trabajo muy bien, manos suaves. Muchas gracias.",
    "Una doctora que amo mucho, amable y muy cálida como un familiar. Le tenía miedo al dentista pero ahora voy con gusto.",
    "Una buena doctora en mi opinión. La recomiendo a cualquiera con problemas dentales.",
    "Estoy muy contento con la Dra. Zeynep, única, cuida muy bien a sus pacientes.",
    "La Dra. Zeynep es muy atenta, profesional y paciente, le agradezco mucho.",
    "Atención, cuidado y un ambiente cálido. Gracias por las explicaciones detalladas durante el tratamiento.",
    "El proceso del implante va sin problemas, muchas gracias a mi doctora. Un lugar al que vengo por todos mis problemas dentales, muy satisfecho.",
    "La Dra. Zeynep es realmente una maestra de este trabajo, manos muy suaves, proceso sin dolor. Vine por recomendación, muchas gracias.",
    "Nuestra doctora es bastante experta y trabaja muy bien. Definitivamente la recomiendo, gracias.",
    "Gracias por la sonrisa y la sinceridad. Con respeto.",
    "Muy exitosa en su trabajo. La recomiendo encarecidamente, el personal es muy atento.",
    "Estuve satisfecho con la atención. Una doctora experta en su campo.",
    "Una doctora perfecta. Manos muy suaves, hace su trabajo muy bien, una doctora que trabaja con amor.",
  ],
  it: [
    "Molto attenta, gentile e sorridente. Brava nel suo lavoro. Non ho avuto problemi durante le cure.",
    "La Dr.ssa Zeynep è una brava dottoressa sia nel lavoro che nel approccio con le persone. La ringrazio.",
    "Non serve descrivere l'esperienza, scelgo la Dr.ssa Zeynep da anni.",
    "La Dr.ssa Zeynep è una brava dottoressa. La ringrazio molto.",
    "Zeynep e tutto il team sono meravigliosi. Non ho avuto problemi, chiunque può sceglierli con tranquillità.",
    "Una dottoressa esperta con cui sono stata molto soddisfatta anche nelle cure precedenti.",
    "Sono molto contento della Dr.ssa Zeynep. Contento anche del resto del personale, grazie a tutti.",
    "La dottoressa prima ti mette a tuo agio con il suo sorriso, poi fa il suo lavoro molto bene, mani delicate. Grazie mille.",
    "Una dottoressa che amo molto, gentile e molto calorosa come un membro della famiglia. Avevo paura del dentista ma ora ci vado volentieri.",
    "Una brava dottoressa a mio parere. La consiglio a chiunque abbia problemi dentali.",
    "Sono molto contento della Dr.ssa Zeynep, unica, si prende molta cura dei suoi pazienti.",
    "La Dr.ssa Zeynep è molto attenta, professionale e paziente, la ringrazio molto.",
    "Attenzione, cura e un ambiente caloroso. Grazie per le spiegazioni dettagliate durante la cura.",
    "Il processo dell'impianto procede senza problemi, molti ringraziamenti alla mia dottoressa. Un posto dove vengo per tutti i miei problemi dentali, molto soddisfatto.",
    "La Dr.ssa Zeynep è davvero una maestra di questo lavoro, mani molto delicate, processo indolore. Venuto su raccomandazione, grazie mille.",
    "La nostra dottoressa è molto esperta e lavora benissimo. La consiglio assolutamente, grazie.",
    "Grazie per il sorriso e la sincerità. Con rispetto.",
    "Molto brava nel suo lavoro. La consiglio vivamente, il personale è molto attento.",
    "Sono rimasto soddisfatto dell'attenzione. Una dottoressa esperta nel suo campo.",
    "Una dottoressa perfetta. Mani molto delicate, fa molto bene il suo lavoro, una dottoressa che lavora con amore.",
  ],
  fr: [
    "Très attentive, gentille et souriante. Réussie dans son travail. Je n'ai eu aucun problème pendant les soins.",
    "La Dr Zeynep est une très bonne doctoresse tant dans son travail que dans son approche des gens. Je la remercie.",
    "Pas besoin de décrire l'expérience, je choisis la Dr Zeynep depuis des années.",
    "La Dr Zeynep est une très bonne doctoresse. Je la remercie beaucoup.",
    "Zeynep et toute l'équipe sont merveilleux. Je n'ai eu aucun problème, tout le monde peut les choisir l'esprit tranquille.",
    "Une doctoresse compétente avec qui j'ai aussi été très satisfaite des soins précédents.",
    "Je suis très satisfait de la Dr Zeynep. Satisfait aussi du reste du personnel, merci à tous.",
    "La doctoresse vous met d'abord à l'aise avec son sourire, puis fait très bien son travail, mains douces. Merci beaucoup.",
    "Une doctoresse que j'aime beaucoup, gentille et très chaleureuse comme un membre de la famille. J'avais peur du dentiste mais maintenant j'y vais avec plaisir.",
    "Une bonne doctoresse à mon avis. Je la recommande à toute personne ayant des problèmes dentaires.",
    "Je suis très satisfait de la Dr Zeynep, unique, prend très bien soin de ses patients.",
    "La Dr Zeynep est très attentive, professionnelle et patiente, je la remercie beaucoup.",
    "Attention, soin et une atmosphère chaleureuse. Merci pour les explications détaillées pendant le traitement.",
    "Le processus d'implant se déroule sans problème, grand merci à ma doctoresse. Un endroit où je viens pour tous mes problèmes dentaires, très satisfait.",
    "La Dr Zeynep est vraiment une maîtresse de ce travail, mains très douces, processus indolore. Venu sur recommandation, merci beaucoup.",
    "Notre doctoresse est très compétente et travaille très bien. Je la recommande absolument, merci.",
    "Merci pour le sourire et la sincérité. Avec respect.",
    "Très réussie dans son travail. Je la recommande vivement, le personnel est très attentif.",
    "J'étais satisfait de l'attention. Une doctoresse experte dans son domaine.",
    "Une doctoresse parfaite. Mains très douces, fait très bien son travail, une doctoresse qui travaille avec amour.",
  ],
  ru: [
    "Очень внимательная, добрая и улыбчивая. Успешна в своей работе. Во время лечения у меня не было проблем.",
    "Д-р Зейнеп очень хороший врач и в работе, и в общении с людьми. Благодарю её.",
    "Описывать опыт не нужно, я выбираю д-ра Зейнеп уже много лет.",
    "Д-р Зейнеп очень хороший врач. Очень благодарю её.",
    "Зейнеп и вся команда прекрасны. У меня не было проблем, любой может выбрать их со спокойной душой.",
    "Грамотный врач, которым я был очень доволен и при предыдущих лечениях.",
    "Я очень доволен д-ром Зейнеп. Доволен и остальным персоналом, спасибо всем.",
    "Врач сначала успокаивает улыбкой, потом делает свою работу очень хорошо, нежные руки. Большое спасибо.",
    "Врач, которую я очень люблю, добрая и очень тёплая, как член семьи. Я боялся стоматологов, но теперь хожу с удовольствием.",
    "Хороший врач на мой взгляд. Рекомендую всем, у кого проблемы с зубами.",
    "Я очень доволен д-ром Зейнеп, неповторимая, очень хорошо заботится о пациентах.",
    "Д-р Зейнеп очень внимательная, профессиональная и терпеливая, очень благодарю её.",
    "Внимание, забота и тёплая атмосфера. Спасибо за подробные объяснения во время лечения.",
    "Процесс имплантации проходит без проблем, большое спасибо моему врачу. Место, куда я прихожу со всеми проблемами с зубами, очень доволен.",
    "Д-р Зейнеп — настоящий мастер своего дела, очень нежные руки, безболезненный процесс. Пришёл по рекомендации, большое спасибо.",
    "Наш врач очень компетентный и прекрасно работает. Определённо рекомендую, спасибо.",
    "Спасибо за улыбку и искренность. С уважением.",
    "Очень успешна в своей работе. Настойчиво рекомендую, персонал очень внимательный.",
    "Я был доволен вниманием. Опытный врач в своей области.",
    "Идеальный врач. Очень нежные руки, отлично выполняет свою работу, врач, работающий с любовью.",
  ],
};

const initials = ["S","Ç","A","C","S","Ç","Z","K","M","F","Z","Ö","M","N","M","H","A","G","M","D"];

const STEP = 3; // 3 kart aynı anda

const sectionTitles = {
  tr: { badge: "Hasta Yorumları", title: "Hastalarımız Ne Diyor?", sub: "244 değerlendirme · 5.0 ★", source: "doktorsitesi.com'dan gerçek yorumlar" },
  en: { badge: "Patient Reviews", title: "What Our Patients Say?", sub: "244 reviews · 5.0 ★", source: "Real reviews from doktorsitesi.com" },
  de: { badge: "Patientenbewertungen", title: "Was sagen unsere Patienten?", sub: "244 Bewertungen · 5.0 ★", source: "Echte Bewertungen von doktorsitesi.com" },
  ar: { badge: "تقييمات المرضى", title: "ماذا يقول مرضانا؟", sub: "٢٤٤ تقييم · ٥.٠ ★", source: "تقييمات حقيقية من doktorsitesi.com" },
  es: { badge: "Opiniones de Pacientes", title: "¿Qué dicen nuestros pacientes?", sub: "244 reseñas · 5.0 ★", source: "Reseñas reales de doktorsitesi.com" },
  it: { badge: "Recensioni Pazienti", title: "Cosa dicono i nostri pazienti?", sub: "244 recensioni · 5.0 ★", source: "Recensioni reali da doktorsitesi.com" },
  fr: { badge: "Avis Patients", title: "Que disent nos patients ?", sub: "244 avis · 5.0 ★", source: "Avis réels de doktorsitesi.com" },
  ru: { badge: "Отзывы пациентов", title: "Что говорят наши пациенты?", sub: "244 отзыва · 5.0 ★", source: "Реальные отзывы с doktorsitesi.com" },
};

export default function PatientReviews() {
  const { lang } = useLanguage();
  const txt = sectionTitles[lang] || sectionTitles.tr;
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const autoRef = useRef(null);
  const reviews = (reviewsByLang[lang] || reviewsByLang.tr).map((text, i) => ({ initial: initials[i], text }));
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
          <h2 className="text-2xl md:text-4xl font-bold text-[#2d2419] font-playfair mb-3">{txt.title}</h2>
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