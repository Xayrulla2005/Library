const nodemailer = require("nodemailer");
const LOGO_URL = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rawpixel.com%2Fsearch%2Fbook%2520logo%2520png&psig=AOvVaw0zmEY-57waceviYtw2DWGp&ust=1760910915515000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIDi1b7erpADFQAAAAAdAAAAABAE"

module.exports = async function (email, otp) {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        await transport.sendMail({
            from: `"Devbook" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "🔐 Devbook — Your verification code",
            text: `Devbook verification code: ${otp}\n\nThis code expires in 10 minutes.\nIf you didn't request this, ignore this email.`,
            html: `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
  </head>
  <body style="margin:0; padding:0; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; background:#f4f6f9;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 6px 24px rgba(15,23,42,0.08);">
            <!-- Header -->
            <tr>
              <td style="padding:24px 28px; text-align:left; border-bottom:1px solid #eef2f7;">
                <img src="${LOGO_URL}" alt="Devbook" width="120" style="display:block; height:auto;">
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px;">
                <h1 style="margin:0 0 12px 0; font-size:20px; color:#0f172a;">Your Devbook verification code</h1>
                <p style="margin:0 0 20px 0; color:#475569; line-height:1.45;">
                  Hello — use the verification code below to complete your action. The code is valid for <strong>10 minutes</strong>.
                </p>

                <!-- OTP card -->
                <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%; margin:18px 0;">
                  <tr>
                    <td align="center" style="background:linear-gradient(180deg,#0ea5e9,#0369a1); padding:18px; border-radius:8px; color:#fff;">
                      <div style="font-size:28px; letter-spacing:4px; font-weight:700;">${otp}</div>
                      <div style="font-size:12px; opacity:0.9; margin-top:6px;">One-time code</div>
                    </td>
                  </tr>
                </table>
                <p style="margin:0; color:#94a3b8; font-size:13px;">
                  If you didn't request this code, you can safely ignore this email. For support, reply to this message.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px 28px; background:#fafafa; border-top:1px solid #eef2f7; color:#94a3b8; font-size:12px;">
                Devbook • 123 Your Street • Your City<br>
                &copy; ${new Date().getFullYear()} Devbook. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `
        });
    } catch (error) {
        throw new Error("Failed to send email");
    }
}
