import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { name, email, phone, message, fileUrls } = body;

    let filesHtml = "";
    if (fileUrls && fileUrls.length > 0) {
      filesHtml = `
        <h3 style="color:#8B6840;">Yüklenen Dosyalar:</h3>
        <ul>
          ${fileUrls.map((url, i) => `<li><a href="${url}">Dosya ${i + 1}</a></li>`).join("")}
        </ul>
      `;
    }

    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0d8d0; border-radius: 8px;">
        <h2 style="color: #2d2419; border-bottom: 2px solid #8B6840; padding-bottom: 10px;">
          🦷 Haliç Panorama Dental — Yeni Form Başvurusu
        </h2>
        <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #8B6840; width: 140px;">Ad Soyad:</td>
            <td style="padding: 8px 12px; color: #2d2419;">${name || "-"}</td>
          </tr>
          <tr style="background:#f7f3ef;">
            <td style="padding: 8px 12px; font-weight: bold; color: #8B6840;">E-posta:</td>
            <td style="padding: 8px 12px; color: #2d2419;">${email || "-"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #8B6840;">Telefon:</td>
            <td style="padding: 8px 12px; color: #2d2419;">${phone || "-"}</td>
          </tr>
          <tr style="background:#f7f3ef;">
            <td style="padding: 8px 12px; font-weight: bold; color: #8B6840;">Mesaj:</td>
            <td style="padding: 8px 12px; color: #2d2419;">${message || "-"}</td>
          </tr>
        </table>
        ${filesHtml}
        <p style="margin-top: 24px; font-size: 12px; color: #9c8e84;">Bu mesaj Haliç Panorama Dental web sitesi iletişim formundan gönderilmiştir.</p>
      </div>
    `;

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: "halicpanoramadental@gmail.com",
      from_name: "Haliç Panorama Dental Web",
      subject: `Yeni Konsültasyon Başvurusu — ${name || "İsimsiz"}`,
      body: emailBody,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});