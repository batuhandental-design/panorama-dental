import { Phone, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Diş İmplantı", href: "/tedavi/dis-implanti" },
  { label: "Hollywood Gülüşü", href: "/tedavi/hollywood-gulusu" },
  { label: "Diş Beyazlatma", href: "/tedavi/dis-beyazlatma" },
  { label: "Zirkonyum Kaplama", href: "/tedavi/zirkonyum-kaplama" },
  { label: "Kemik Grefti", href: "/tedavi/kemik-grefti" },
  { label: "Diş Teli & Ortodonti", href: "/tedavi/dis-teli-ortodonti" },
];

const aboutLinks = [
  { label: "Bize Ulaşın", href: "/#contact" },
  { label: "Hizmetlerimiz", href: "/#services" },
  { label: "Hakkımızda", href: "/#about" },
  { label: "Operasyonlar", href: "/#operations" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2c2419] text-[#b0a090] font-inter">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-[#e8dfd5] mb-4">
              <span className="text-[#c9a87c]">Haliç Panorama</span> Dental
            </h3>
            <p className="text-sm leading-relaxed mb-6">
              Haliç Panorama Dental, uluslararası sağlık turizmi yetki belgesine sahip, yüksek standartlarda hizmet sunan bir sağlık kuruluşudur. Alanında doktorlarımız ve sağlık merkezlerimizle birlikte, hastalarımıza dünya standartlarında tedavi deneyimi sunuyoruz. İstanbul'da en ileri teknolojiyle donatılmış kliniğimizde, konforu ve kaliteyi bir arada yaşayarak ayrıcalıklı bir sağlık hizmeti almak için Haliç Panorama Dental'i keşfedin.
            </p>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-[#e8dfd5] font-semibold mb-4 uppercase text-sm tracking-wider">Bölümler</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-[#c9a87c] transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-[#e8dfd5] font-semibold mb-4 uppercase text-sm tracking-wider">Hakkımızda</h4>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-[#c9a87c] transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#e8dfd5] font-semibold mb-4 uppercase text-sm tracking-wider">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#c9a87c] flex-shrink-0" />
                <span className="text-sm">+90 549 124 01 03</span>
              </div>
              <a
                href="https://wa.me/905491240103"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 mt-1 group"
              >
                <div className="w-4 h-4 flex-shrink-0 text-[#25D366]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.849L.057 23.882l6.204-1.448A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.876 9.876 0 01-5.034-1.376l-.361-.214-3.741.873.937-3.63-.235-.374A9.851 9.851 0 012.106 12C2.106 6.525 6.525 2.106 12 2.106c5.476 0 9.894 4.419 9.894 9.894 0 5.476-4.418 9.894-9.894 9.894z"/>
                  </svg>
                </div>
                <span className="text-sm text-[#25D366] group-hover:text-green-400 transition-colors font-medium">WhatsApp'tan Yaz</span>
              </a>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#c9a87c] flex-shrink-0" />
                <span className="text-sm">info@panoramadental.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#c9a87c] flex-shrink-0" />
                <span className="text-sm">Bahçelievler, İstanbul</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-xs text-[#7a6e62]">
          © {new Date().getFullYear()} Haliç Panorama Dental. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}