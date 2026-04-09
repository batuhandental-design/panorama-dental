import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=905058041416&text=Merhaba.%20Mevcut%20teklifleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors hover:scale-110 transform duration-200"
      title="WhatsApp ile iletişime geçin"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
}