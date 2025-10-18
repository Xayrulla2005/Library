const nodemailer = require("nodemailer");

module.exports = async function(email, otp){
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transport.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Devbook - Verification Code",
      text: `Your verification code is: ${otp}`,
      html: `<b style="font-size:24px; color:blue;">Verify code: ${otp}</b>`
    });
  } catch (error) {
    throw new Error("Failed to send email");
  }
}
