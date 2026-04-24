import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Upload, X, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/LanguageContext";
import { base44 } from "@/api/base44Client";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const fileInputRef = useRef(null);
  const { t } = useLanguage();

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected]);
    e.target.value = "";
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    let fileUrls = [];

    if (files.length > 0) {
      setUploading(true);
      for (const file of files) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        fileUrls.push(file_url);
      }
      setUploading(false);
    }

    // Veritabanına kaydet + e-posta bildirimi gönder
    await base44.functions.invoke("notifyNewContact", {
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      fileUrls,
    });

    // WhatsApp'a yönlendir
    let waMsg = `🦷 Haliç Panorama Dental - Yeni Başvuru\n\n`;
    waMsg += `👤 Ad Soyad: ${form.name}\n`;
    waMsg += `📞 Telefon: ${form.phone}`;
    if (form.email) waMsg += `\n📧 E-posta: ${form.email}`;
    if (form.message) waMsg += `\n💬 Mesaj: ${form.message}`;
    if (fileUrls.length > 0) {
      waMsg += `\n\n📎 Yüklenen Dosyalar (${fileUrls.length}):`;
      fileUrls.forEach((url, i) => { waMsg += `\n${i + 1}. ${url}`; });
    }

    window.open(`https://api.whatsapp.com/send?phone=905551896062&text=${encodeURIComponent(waMsg)}`, "_blank");

    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setFiles([]);
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
            transition={{ duration: 0.6 }}>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#8B6840]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#8B6840]" />
                </div>
                <div>
                  <h4 className="text-[#2d2419] font-semibold mb-1">{t.phone}</h4>
                  <p className="text-[#6b5e52]">+90 555 189 60 62</p>
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
                  <p className="text-[#6b5e52]">Beyoğlu, İstanbul / Türkiye</p>
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
            className="space-y-4">

            {sent ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <p className="text-green-700 font-semibold text-lg">{t.contactSuccess}</p>
                <p className="text-green-600 text-sm mt-1">{t.contactSuccessDesc}</p>
                <button type="button" onClick={() => setSent(false)} className="mt-4 text-[#8B6840] text-sm underline">{t.contactNewMsg}</button>
              </div>
            ) : (
              <>
                <Input placeholder={t.namePlaceholder} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-[#f7f3ef] border-[#c9bfb4] text-[#2d2419] placeholder:text-[#9c8e84] h-12" />
                <Input placeholder={t.emailPlaceholder} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-[#f7f3ef] border-[#c9bfb4] text-[#2d2419] placeholder:text-[#9c8e84] h-12" />
                <Input placeholder={t.phonePlaceholder} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-[#f7f3ef] border-[#c9bfb4] text-[#2d2419] placeholder:text-[#9c8e84] h-12" />
                <Textarea placeholder={t.messagePlaceholder} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-[#f7f3ef] border-[#c9bfb4] text-[#2d2419] placeholder:text-[#9c8e84] min-h-[120px]" />

                {/* File Upload */}
                <div
                  className="border-2 border-dashed border-[#c9bfb4] rounded-xl p-4 bg-[#f7f3ef] cursor-pointer hover:border-[#8B6840] transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Upload className="w-6 h-6 text-[#8B6840]" />
                    <p className="text-sm font-medium text-[#2d2419]">{t.uploadTitle}</p>
                    <p className="text-xs text-[#9c8e84]">{t.uploadDesc}</p>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((file, i) => (
                      <div key={i} className="flex items-center justify-between bg-white border border-[#e0d8d0] rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2">
                          <FileImage className="w-4 h-4 text-[#8B6840]" />
                          <span className="text-sm text-[#2d2419] truncate max-w-[200px]">{file.name}</span>
                        </div>
                        <button type="button" onClick={() => removeFile(i)} className="text-[#9c8e84] hover:text-red-500 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <Button type="submit" disabled={sending} className="w-full bg-[#8B6840] hover:bg-[#7a5c38] text-white h-12 font-semibold text-sm uppercase tracking-wider disabled:opacity-70">
                  <Send className="w-4 h-4 mr-2" />
                  {uploading ? t.uploadingFiles : sending ? t.sending : t.sendBtn}
                </Button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>);

}