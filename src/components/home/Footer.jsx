import { Phone, Mail, MapPin } from "lucide-react";

const quickLinks = [
  "Diş Tedavileri",
  "Estetik Cerrahi",
  "Saç Ekimi",
  "Obezite Cerrahisi",
  "Diyabet Cerrahisi",
  "Göz Tedavisi",
];

const aboutLinks = [
  "Bize Ulaşın",
  "Hizmetlerimiz",
  "Hakkımızda",
  "Blog ve Haberler",
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1a] text-gray-400 font-inter">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-primary">Panorama</span> Dental
            </h3>
            <p className="text-sm leading-relaxed mb-6">
              Panorama Dental uluslararası sağlık turizmi yetki belgesine sahiptir ve uluslararası yetki belgesine sahip anlaşmalı sağlık kuruluşlarımızda tedavi fırsatları sunuyoruz.
            </p>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Bölümler</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Hakkımızda</h4>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">+90 505 804 14 16</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">info@panoramadental.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">Bahçelievler, İstanbul</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Panorama Dental. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}