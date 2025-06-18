import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
import QRCode from 'qrcode';
import { randomUUID } from 'crypto';
import { query } from '../db';

// Load server-specific environment variables for email credentials
// The handler lives in `server/src/handlers`, so the root `.env`
// resides two directories up from this file.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const subscribeNewsletter = async (req: Request, res: Response) => {
  const { email, referredBy } = req.body as {
    email?: string;
    referredBy?: string;
  };
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const { rows } = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (rows.length > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to check email' });
  }

  const referralCode = Math.random().toString(36).slice(2, 8).toUpperCase();
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const referralLink = `${baseUrl}?ref=${referralCode}`;

  try {
    const qrCodeBuffer = await QRCode.toBuffer(referralLink);

    const id = randomUUID();
    await query(
      'INSERT INTO users (id, email, first_name, last_name, roles, phone, avatar, referral_code, referred_by, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW())',
      [
        id,
        email,
        '',
        '',
        [],
        null,
        null,
        referralCode,
        referredBy || null,
      ]
    );
    const smtpReady =
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_HOST !== 'smtp.example.com';

    let transporter: nodemailer.Transporter | undefined;
    if (smtpReady) {
      transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      console.warn('SMTP not configured, skipping email send');
    }

    if (transporter) {
      const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenue chez LoopImmo</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f8fafc;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 40px 30px;
              text-align: center;
              color: white;
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              margin-bottom: 10px;
              letter-spacing: -1px;
            }
            .subtitle {
              font-size: 16px;
              opacity: 0.9;
              font-weight: 300;
            }
            .content {
              padding: 40px 30px;
            }
            .welcome-title {
              font-size: 24px;
              font-weight: 600;
              color: #2d3748;
              margin-bottom: 20px;
              text-align: center;
            }
            .welcome-text {
              font-size: 16px;
              color: #4a5568;
              margin-bottom: 30px;
              text-align: center;
              line-height: 1.7;
            }
            .referral-section {
              background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
              border-radius: 12px;
              padding: 30px;
              margin: 30px 0;
              text-align: center;
              border: 1px solid #e2e8f0;
            }
            .referral-title {
              font-size: 20px;
              font-weight: 600;
              color: #2d3748;
              margin-bottom: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
            }
            .gift-icon {
              font-size: 24px;
            }
            .referral-code {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 15px 25px;
              border-radius: 8px;
              font-size: 24px;
              font-weight: bold;
              letter-spacing: 3px;
              margin: 20px 0;
              display: inline-block;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            }
            .referral-description {
              font-size: 14px;
              color: #718096;
              margin-bottom: 25px;
              line-height: 1.6;
            }
            .cta-button {
              background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              display: inline-block;
              margin: 20px 0;
              box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
              transition: transform 0.2s ease;
            }
            .cta-button:hover {
              transform: translateY(-2px);
            }
            .qr-section {
              text-align: center;
              margin: 30px 0;
              padding: 25px;
              background: #ffffff;
              border: 2px dashed #e2e8f0;
              border-radius: 12px;
            }
            .qr-title {
              font-size: 16px;
              font-weight: 600;
              color: #4a5568;
              margin-bottom: 15px;
            }
            .qr-description {
              font-size: 14px;
              color: #718096;
              margin-top: 15px;
            }
            .benefits {
              background: #f7fafc;
              border-radius: 12px;
              padding: 25px;
              margin: 30px 0;
            }
            .benefits-title {
              font-size: 18px;
              font-weight: 600;
              color: #2d3748;
              margin-bottom: 20px;
              text-align: center;
            }
            .benefit-item {
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              font-size: 14px;
              color: #4a5568;
            }
            .benefit-icon {
              color: #48bb78;
              margin-right: 12px;
              font-weight: bold;
            }
            .footer {
              background: #2d3748;
              color: #a0aec0;
              padding: 30px;
              text-align: center;
              font-size: 14px;
            }
            .footer-title {
              color: white;
              font-weight: 600;
              margin-bottom: 10px;
            }
            .social-links {
              margin: 20px 0;
            }
            .social-links a {
              color: #a0aec0;
              text-decoration: none;
              margin: 0 15px;
              font-weight: 500;
            }
            @media (max-width: 600px) {
              .container {
                margin: 10px;
                border-radius: 8px;
              }
              .header, .content {
                padding: 25px 20px;
              }
              .referral-section {
                padding: 20px;
              }
              .referral-code {
                font-size: 20px;
                letter-spacing: 2px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🏠 LoopImmo</div>
              <div class="subtitle">Votre partenaire immobilier de confiance</div>
            </div>
            
            <div class="content">
              <h1 class="welcome-title">🎉 Bienvenue dans l'aventure LoopImmo !</h1>
              
              <p class="welcome-text">
                Félicitations ! Vous venez de rejoindre une communauté exclusive qui révolutionne le marché immobilier. 
                Votre inscription nous fait énormément plaisir et nous sommes impatients de vous accompagner dans vos projets.
              </p>

              <div class="benefits">
                <h3 class="benefits-title">✨ Ce qui vous attend</h3>
                <div class="benefit-item">
                  <span class="benefit-icon">🚀</span>
                  Accès prioritaire à notre plateforme révolutionnaire
                </div>
                <div class="benefit-item">
                  <span class="benefit-icon">💎</span>
                  Offres immobilières exclusives et personnalisées
                </div>
                <div class="benefit-item">
                  <span class="benefit-icon">🤝</span>
                  Accompagnement par nos experts certifiés
                </div>
                <div class="benefit-item">
                  <span class="benefit-icon">📈</span>
                  Outils d'analyse et de suivi en temps réel
                </div>
              </div>

              <div class="referral-section">
                <h2 class="referral-title">
                  <span class="gift-icon">🎁</span>
                  Votre Code de Parrainage Exclusif
                </h2>
                
                <div class="referral-code">${referralCode}</div>
                
                <p class="referral-description">
                  Partagez ce code avec vos proches et bénéficiez d'avantages exclusifs ! 
                  Chaque personne que vous parrainez vous rapproche de récompenses exceptionnelles.
                </p>
                
                <a href="${referralLink}" class="cta-button">
                  🔗 Partager mon lien de parrainage
                </a>
              </div>

              <div class="qr-section">
                <h3 class="qr-title">📱 Partage rapide avec QR Code</h3>
                <img src="cid:qrcode" alt="QR Code de parrainage" style="max-width: 150px; height: auto;" />
                <p class="qr-description">
                  Scannez ce QR code avec votre téléphone pour partager facilement votre lien de parrainage
                </p>
              </div>
            </div>

            <div class="footer">
              <div class="footer-title">LoopImmo - L'immobilier réinventé</div>
              <p>Merci de faire partie de notre communauté !</p>
              
              <div class="social-links">
                <a href="#">LinkedIn</a>
                <a href="#">Twitter</a>
                <a href="#">Instagram</a>
              </div>
              
              <p style="margin-top: 20px; font-size: 12px; opacity: 0.8;">
                Cet email a été envoyé car vous vous êtes inscrit à notre newsletter.<br>
                Si vous ne souhaitez plus recevoir nos emails, vous pouvez vous désabonner à tout moment.
              </p>
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "🎉 Bienvenue chez LoopImmo - Votre code de parrainage exclusif !",
        text: `Bienvenue chez LoopImmo !\n\nFélicitations ! Vous venez de rejoindre une communauté exclusive qui révolutionne le marché immobilier.\n\nVotre code de parrainage exclusif : ${referralCode}\n\nPartagez votre lien de parrainage : ${referralLink}\n\nMerci de faire partie de notre aventure !\n\nL'équipe LoopImmo`,
        html: htmlTemplate,
        attachments: [
          {
            filename: 'qrcode.png',
            content: qrCodeBuffer,
            cid: 'qrcode',
          },
        ],
      });

      if (process.env.EMAIL_TO) {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: process.env.EMAIL_TO,
          subject: '🎯 Nouvelle inscription LoopImmo',
          text: `Nouvelle inscription sur LoopImmo !\n\nEmail : ${email}\nCode de parrainage : ${referralCode}${referredBy ? `\nParrainé par : ${referredBy}` : ''}\n\nTableau de bord admin pour plus de détails.`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 8px;">
              <h2 style="color: #2d3748; margin-bottom: 20px;">🎯 Nouvelle inscription LoopImmo</h2>
              <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #48bb78;">
                <p><strong>Email :</strong> ${email}</p>
                <p><strong>Code de parrainage :</strong> <code style="background: #edf2f7; padding: 2px 6px; border-radius: 4px;">${referralCode}</code></p>
                ${referredBy ? `<p><strong>Parrainé par :</strong> ${referredBy}</p>` : ''}
                <p style="margin-top: 15px; font-size: 14px; color: #718096;">
                  Consultez le tableau de bord admin pour plus de détails.
                </p>
              </div>
            </div>
          `
        });
      }
    }
    res.status(200).json({ success: true, referralCode, emailSent: !!transporter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to send email' });
  }
};
