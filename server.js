require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route pour envoyer un email de confirmation
app.post('/send-email', async (req, res) => {
  const { email, name, orderDetails } = req.body;

  try {
    // Configurer Nodemailer avec Mailtrap
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
      port: process.env.MAIL_PORT || 587,
      auth: {
        user: process.env.MAIL_USERNAME, // Identifiant SMTP Mailtrap
        pass: process.env.MAIL_PASSWORD, // Mot de passe SMTP Mailtrap
      },
    });

    // Contenu de l'email
    const mailOptions = {
      from: process.env.MAIL_FROM_ADDRESS || 'no-reply@example.com', // Adresse de l'expéditeur
      to: email, // Adresse email du client
      subject: 'Confirmation de votre commande',
      html: `
        <h1>Bonjour ${name},</h1>
        <p>Merci pour votre commande. Voici les détails :</p>
        <ul>
          ${orderDetails.map(item => `<li>${item.name} - ${item.quantity} x ${item.price}€</li>`).join('')}
        </ul>
        <p>Montant total : ${orderDetails.reduce((total, item) => total + item.quantity * item.price, 0)}€</p>
        <p>Nous vous remercions pour votre confiance.</p>
      `,
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email envoyé avec succès via Mailtrap');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    res.status(500).send('Erreur lors de l\'envoi de l\'email');
  }
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
