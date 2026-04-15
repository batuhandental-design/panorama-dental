import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/LanguageContext";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(`${t.whatsappText} ${form.name}. ${form.message}`);
    window.open(`https://api.whatsapp.com/send?phone=905491240103&text=${msg}`, "_blank");
  };

  return (
    <section className="py-20 bg-[#ede8e0] font-inter" id="contact">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">{t.contactLabel}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2419] font-playfair mb-4">{t.contactTitle}</h2>
          <p className="text-[#6b5e52]">{t.contactDesc}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#8B6840]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#8B6840]" />
                </div>
                <div>
                  <h4 className="text-[#2d2419] font-semibold mb-1">{t.phone}</h4>
                  <p className="text-[#6b5e52]">+90 549 124 01 03</p>
                  <p className="text-[#9c8e84] text-sm">{t.freeConsultLine}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#8B6840]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#8B6840]" />
                </div>
                <div>
                  <h4 className="text-[#2d2419] font-semibold mb-1">{t.email}</h4>
                  <p className="text-[#6b5e52]">halicpanoramadental@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#8B6840]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#8B6840]" />
                </div>
                <div>
                  <h4 className="text-[#2d2419] font-semibold mb-1">{t.address}</h4>
                  <p className="text-[#6b5e52]">Bahçelievler, İstanbul / Türkiye</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <Input placeholder={t.namePlaceholder} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-[#f7f3ef] border-[#c9bfb4] text-[#2d2419] placeholder:text-[#9c8e84] h-12" />
            <Input placeholder={t.emailPlaceholder} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-[#f7f3ef] border-[#c9bfb4] text-[#2d2419] placeholder:text-[#9c8e84] h-12" />
            <Input placeholder={t.phonePlaceholder} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-[#f7f3ef] border-[#c9bfb4] text-[#2d2419] placeholder:text-[#9c8e84] h-12" />
            <Textarea placeholder={t.messagePlaceholder} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-[#f7f3ef] border-[#c9bfb4] text-[#2d2419] placeholder:text-[#9c8e84] min-h-[120px]" />
            <Button type="submit" className="w-full bg-[#8B6840] hover:bg-[#7a5c38] text-white h-12 font-semibold text-sm uppercase tracking-wider">
              <Send className="w-4 h-4 mr-2" />
              {t.sendBtn}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}