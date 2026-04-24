import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { name, email, phone, message, fileUrls } = body;

    // Tüm işlemleri paralel çalıştır
    const tasks = [];

    // 1. Veritabanına kaydet
    tasks.push(
      base44.asServiceRole.entities.ContactForm.create({
        name,
        email,
        phone,
        message,
        file_urls: fileUrls || [],
        status: "new",
      }).catch(err => console.error("DB hatası:", err.message))
    );

    // 2. E-posta bildirimi (Resend API)
    let filesHtml = "";
    if (fileUrls && fileUrls.length > 0) {
      filesHtml = fileUrls.map((url, i) => `<br><a href="${url}">Dosya ${i + 1}</a>`).join("");
    }

    const emailBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0d8d0;border-radius:8px;overflow:hidden;">
        <div style="background:#2c2419;padding:20px;text-align:center;">
          <h2 style="color:#c9a87c;margin:0;">🦷 Haliç Panorama Dental</h2>
          <p style="color:#fff;margin:6px 0 0;">Yeni Konsültasyon Başvurusu</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 12px;font-weight:bold;color:#8B6840;width:140px;">Ad Soyad</td><td style="padding:10px 12px;">${name || "-"}</td></tr>
          <tr style="background:#f7f3ef;"><td style="padding:10px 12px;font-weight:bold;color:#8B6840;">Telefon</td><td style="padding:10px 12px;">${phone || "-"}</td></tr>
          <tr><td style="padding:10px 12px;font-weight:bold;color:#8B6840;">E-posta</td><td style="padding:10px 12px;">${email || "-"}</td></tr>
          <tr style="background:#f7f3ef;"><td style="padding:10px 12px;font-weight:bold;color:#8B6840;">Mesaj</td><td style="padding:10px 12px;">${message || "-"}</td></tr>
          ${filesHtml ? `<tr><td style="padding:10px 12px;font-weight:bold;color:#8B6840;">Dosyalar</td><td style="padding:10px 12px;">${filesHtml}</td></tr>` : ""}
        </table>
        <div style="background:#f7f3ef;padding:12px;text-align:center;font-size:12px;color:#9c8e84;">
          Web sitesi iletişim formundan otomatik gönderilmiştir.
        </div>
      </div>
    `;

    const resendKey = Deno.env.get("RESEND_API_KEY");
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Haliç Panorama Dental <onboarding@resend.dev>",
          to: ["halicpanoramadental@gmail.com"],
          subject: `Yeni Başvuru — ${name || "İsimsiz"}`,
          html: emailBody,
        }),
      })
        .then(r => r.json())
        .then(r => { if (r.error) console.error("Resend hatası:", r.error); })
        .catch(err => console.error("Resend hatası:", err.message))
    );

    // 3. CallMeBot WhatsApp bildirimi
    const apiKey = Deno.env.get("CALLMEBOT_API_KEY");
    let waMsg = `🦷 Yeni Başvuru - Haliç Panorama Dental\n\n👤 Ad: ${name || "-"}\n📞 Tel: ${phone || "-"}`;
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