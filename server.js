// require('dotenv').config();
// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// // app.use(cors());
// app.use(cors({ origin: '*' })); // Allows all origins

// app.use(bodyParser.json());

// // Route pour envoyer un email de confirmation
// app.post('/send-email', async (req, res) => {
//   const { email, name, orderDetails } = req.body;

//   try {
//     // Configurer Nodemailer avec Mailtrap
//     const transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
//       port: process.env.MAIL_PORT || 587,
//       auth: {
//         user: process.env.MAIL_USERNAME, // Identifiant SMTP Mailtrap
//         pass: process.env.MAIL_PASSWORD, // Mot de passe SMTP Mailtrap
//       },
//     });

//     // Contenu de l'email
//     const mailOptions = {
//       from: process.env.MAIL_FROM_ADDRESS || 'no-reply@example.com', // Adresse de l'expéditeur
//       to: email, // Adresse email du client
//       subject: 'Confirmation de votre commande',
//       html: `
//         <h1>Bonjour ${name},</h1>
//         <p>Merci pour votre commande. Voici les détails :</p>
//         <ul>
//           ${orderDetails.map(item => `<li>${item.name} - ${item.quantity} x ${item.price}€</li>`).join('')}
//         </ul>
//         <p>Montant total : ${orderDetails.reduce((total, item) => total + item.quantity * item.price, 0)}€</p>
//         <p>Nous vous remercions pour votre confiance.</p>
//       `,
//     };

//     // Envoyer l'email
//     await transporter.sendMail(mailOptions);
//     res.status(200).send('Email envoyé avec succès via Mailtrap');
//   } catch (error) {
//     console.error('Erreur lors de l\'envoi de l\'email :', error);
//     res.status(500).send('Erreur lors de l\'envoi de l\'email');
//   }
// });

// // Lancer le serveur
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
// });
// require('dotenv').config();
// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(cors({ origin: '*' })); // Allows all origins
// app.use(bodyParser.json());

// // Reusable transporter for nodemailer
// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
//   port: process.env.MAIL_PORT || 587,
//   auth: {
//     user: process.env.MAIL_USERNAME, // Mailtrap username
//     pass: process.env.MAIL_PASSWORD, // Mailtrap password
//   },
// });

// // Route to send order confirmation email
// app.post('/send-email', async (req, res) => {
//   const { email, name, orderDetails } = req.body;

//   if (!email || !name || !orderDetails || !Array.isArray(orderDetails)) {
//     return res.status(400).send({ message: 'Invalid data provided' });
//   }

//   try {
//     const mailOptions = {
//       from: process.env.MAIL_FROM_ADDRESS || 'no-reply@example.com', // Sender's email address
//       to: email, // Recipient's email address
//       subject: 'Order Confirmation',
//       html: `
//         <h1>Hi ${name},</h1>
//         <p>Thank you for your order. Here are the details:</p>
//         <ul>
//           ${orderDetails
//             .map(
//               (item) => `<li>${item.name} - ${item.quantity} x ${item.price}€</li>`
//             )
//             .join('')}
//         </ul>
//         <p>Total Amount: ${orderDetails
//           .reduce((total, item) => total + item.quantity * item.price, 0)
//           .toFixed(2)}€</p>
//         <p>We appreciate your trust in us!</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).send('Order confirmation email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send('Error sending order confirmation email');
//   }
// });

// // Route to send password reset link
// app.post('/send-reset-link', async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).send({ message: 'Email is required' });
//   }

//   try {
//     const mailOptions = {
//       from: process.env.MAIL_FROM_ADDRESS || 'no-reply@example.com',
//       to: email,
//       subject: 'Reset your password',
//       html: `
//         <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//           <h1 style="text-align: center; color: #007bff;">Reset your password</h1>
//           <p>Need to reset your password? No problem! Just click the button below and you'll be on your way. If you did not make this request, please ignore this email.</p>
//           <div style="text-align: center; margin-top: 20px;">
//             <a href="myapp://reset-password" target="_blank" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset your password</a>
//           </div>
//           <p style="margin-top: 20px;">If you have any questions, feel free to contact our support team.</p>
//         </div>
//       `,
//     };
    

//     await transporter.sendMail(mailOptions);
//     res.status(200).send({ message: 'Password reset email sent successfully!' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send({ message: 'Error sending password reset email' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*' })); // Allow all origins for development
app.use(bodyParser.json());

app.post('/send-reset-link', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: 'Email is required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
      port: process.env.MAIL_PORT || 587,
      auth: {
        user: process.env.MAIL_USERNAME, // Mailtrap username
        pass: process.env.MAIL_PASSWORD, // Mailtrap password
      },
    });

    const mailOptions = {
      from: process.env.MAIL_FROM_ADDRESS || 'no-reply@example.com',
      to: email,
      subject: 'Reset your password',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h1 style="text-align: center; color: #007bff;">Reset your password</h1>
          <p>Need to reset your password? No problem! Just click the button below and you'll be on your way. If you did not make this request, please ignore this email.</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://your-frontend-link.com/reset-password?email=${encodeURIComponent(
              email
            )}" target="_blank" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset your password</a>
          </div>
          <p style="margin-top: 20px;">If you have any questions, feel free to contact our support team.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Password reset email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Error sending password reset email.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
