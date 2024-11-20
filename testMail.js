require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendTestEmail() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM_ADDRESS,
      to: "test@user.com",
      subject: "Test Email",
      text: "Ceci est un test de Mailtrap.",
    });

    console.log("Email envoyé : ", info.messageId);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
  }
}

sendTestEmail();
