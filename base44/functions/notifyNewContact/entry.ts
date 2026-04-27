import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { name, email, phone, message, fileUrls } = body;

    // Tüm işlemleri paralel çalıştır
    const tasks = [];

    // 1. Veritabanına kaydet (service role ile - public form için auth gerekmez)
    tasks.push(
      base44.asServiceRole.entities.ContactForm.create({
        name,
        email,
        phone,
        message,
        file_urls: fileUrls || [],
        status: "new",
      }).then(() => console.log("DB kaydı başarılı")).catch(err => console.error("DB hatası:", err.message))
    );

    // 2. E-posta bildirimi (Base44 SendEmail)
    let filesText = "";
    if (fileUrls && fileUrls.length > 0) {
      filesText = fileUrls.map((url, i) => `Dosya ${i + 1}: ${url}`).join("\n");
    }

    const emailBody = `
🦷 Pendik ve Haliç Panorama Dental - Yeni Konsültasyon Başvurusu

Ad Soyad: ${name || "-"}
Telefon: ${phone || "-"}
E-posta: ${email || "-"}
Mesaj: ${message || "-"}
${filesText ? `\nDosyalar:\n${filesText}` : ""}

Web sitesi iletişim formundan otomatik gönderilmiştir.
    `.trim();

    tasks.push(
      base44.asServiceRole.integrations.Core.SendEmail({
        to: "halicpanoramadental@gmail.com",
        subject: `🦷 Yeni Başvuru — ${name || "İsimsiz"} | ${phone || ""}`,
        body: emailBody,
        from_name: "Pendik ve Haliç Panorama Dental",
      }).catch(err => console.error("E-posta hatası:", err.message))
    );

    // 3. CallMeBot WhatsApp bildirimi
    const apiKey = Deno.env.get("CALLMEBOT_API_KEY");
    let waMsg = `🦷 Yeni Başvuru - Pendik ve Haliç Panorama Dental\n\n👤 Ad: ${name || "-"}\n📞 Tel: ${phone || "-"}`;
    if (email) waMsg += `\n📧 Email: ${email}`;
    if (message) waMsg += `\n💬 Mesaj: ${message}`;
    if (fileUrls && fileUrls.length > 0) waMsg += `\n📎 Dosya: ${fileUrls.length} adet`;

    tasks.push(
      fetch(`https://api.callmebot.com/whatsapp.php?phone=905551896062&text=${encodeURIComponent(waMsg)}&apikey=${apiKey}`)
        .catch(err => console.error("WhatsApp hatası:", err.message))
    );

    // Hepsini paralel bekle
    await Promise.all(tasks);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});