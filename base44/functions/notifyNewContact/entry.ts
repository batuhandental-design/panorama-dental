import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { name, email, phone, message, fileUrls } = body;

    // Veritabanına kaydet (hata olsa bile devam et)
    try {
      await base44.asServiceRole.entities.ContactForm.create({
        name,
        email,
        phone,
        message,
        file_urls: fileUrls || [],
        status: "new",
      });
    } catch (dbErr) {
      console.error("DB kayıt hatası:", dbErr.message);
    }

    // Gmail ile bildirim gönder
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');

    let filesHtml = "";
    if (fileUrls && fileUrls.length > 0) {
      filesHtml = `
        <tr><td colspan="2" style="padding:12px;font-weight:bold;color:#8B6840;border-top:1px solid #e0d8d0;">📎 Yüklenen Dosyalar</td></tr>
        ${fileUrls.map((url, i) => `
          <tr style="${i % 2 === 0 ? 'background:#f7f3ef;' : ''}">
            <td colspan="2" style="padding:8px 12px;">
              <a href="${url}" style="color:#8B6840;">Dosya ${i + 1}</a>
            </td>
          </tr>
        `).join("")}
      `;
    }

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0d8d0;border-radius:8px;overflow:hidden;">
        <div style="background:#2c2419;padding:20px;text-align:center;">
          <h2 style="color:#c9a87c;margin:0;">🦷 Haliç Panorama Dental</h2>
          <p style="color:#fff;margin:6px 0 0;">Yeni Konsültasyon Başvurusu</p>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-top:0;">
          <tr>
            <td style="padding:10px 12px;font-weight:bold;color:#8B6840;width:140px;">Ad Soyad</td>
            <td style="padding:10px 12px;color:#2d2419;">${name || "-"}</td>
          </tr>
          <tr style="background:#f7f3ef;">
            <td style="padding:10px 12px;font-weight:bold;color:#8B6840;">Telefon</td>
            <td style="padding:10px 12px;color:#2d2419;">${phone || "-"}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;font-weight:bold;color:#8B6840;">E-posta</td>
            <td style="padding:10px 12px;color:#2d2419;">${email || "-"}</td>
          </tr>
          <tr style="background:#f7f3ef;">
            <td style="padding:10px 12px;font-weight:bold;color:#8B6840;">Mesaj</td>
            <td style="padding:10px 12px;color:#2d2419;">${message || "-"}</td>
          </tr>
          ${filesHtml}
        </table>
        <div style="background:#f7f3ef;padding:12px;text-align:center;font-size:12px;color:#9c8e84;">
          Bu mesaj web sitesi iletişim formundan otomatik gönderilmiştir.
        </div>
      </div>
    `;

    // RFC 2822 formatında e-posta oluştur
    const subject = `=?UTF-8?B?${btoa(unescape(encodeURIComponent(`Yeni Başvuru — ${name || "İsimsiz"}`)))}?=`;
    const boundary = "boundary_panorama_" + Date.now();
    const rawEmail = [
      `To: halicpanoramadental@gmail.com`,
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=UTF-8`,
      ``,
      htmlBody,
    ].join("\r\n");

    const encodedEmail = btoa(unescape(encodeURIComponent(rawEmail)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: encodedEmail }),
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});