import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Merhaba, ben ${form.name}. ${form.message}`);
    window.open(`https://api.whatsapp.com/send?phone=905058041416&text=${msg}`, "_blank");
  };

  return (
    <section className="py-20 bg-[#0d1b2a] font-inter" id="contact">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-3 font-medium">İletişim</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair mb-4">
            Ücretsiz Danışmanlık
          </h2>
          <p className="text-gray-400">Sorularınızı bize sormaktan çekinmeyin. Hemen formu doldurun, sizi arayalım.</p>
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
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Telefon</h4>
                  <p className="text-gray-400">+90 505 804 14 16</p>
                  <p className="text-gray-500 text-sm">7/24 Ücretsiz Danışmanlık</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">E-posta</h4>
                  <p className="text-gray-400">info@panoramadental.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Adres</h4>
                  <p className="text-gray-400">Bahçelievler, İstanbul / Türkiye</p>
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
            <Input
              placeholder="Adınız Soyadınız"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-[#1a2940] border-white/10 text-white placeholder:text-gray-500 h-12"
            />
            <Input
              placeholder="E-posta Adresiniz"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-[#1a2940] border-white/10 text-white placeholder:text-gray-500 h-12"
            />
            <Input
              placeholder="Telefon Numaranız"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="bg-[#1a2940] border-white/10 text-white placeholder:text-gray-500 h-12"
            />
            <Textarea
              placeholder="Mesajınız..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-[#1a2940] border-white/10 text-white placeholder:text-gray-500 min-h-[120px]"
            />
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white h-12 font-semibold text-sm uppercase tracking-wider"
            >
              <Send className="w-4 h-4 mr-2" />
              Gönder
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}