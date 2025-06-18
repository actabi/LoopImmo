import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
import QRCode from 'qrcode';

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

  const referralCode = Math.random().toString(36).slice(2, 8).toUpperCase();
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const referralLink = `${baseUrl}?ref=${referralCode}`;

  try {
    const qrCodeBuffer = await QRCode.toBuffer(referralLink);
    const smtpReady =
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_HOST !== 'smtp.example.com';

    let transporter: nodemailer.Transporter | undefined;
    if (smtpReady) {
      transporter = nodemailer.createTransport({
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
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Confirmation d'inscription",
        text: `Merci pour votre inscription à LoopImmo!\nVoici votre code de parrainage : ${referralCode}\nPartagez-le avec vos contacts : ${referralLink}`,
        html: `<p>Merci pour votre inscription à LoopImmo!</p><p>Voici votre code de parrainage : <strong>${referralCode}</strong></p><p><a href="${referralLink}">Cliquez ici pour visiter le site</a></p><p><img src="cid:qrcode" alt="QR code pour partager le lien" /></p>`,
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
          subject: 'Nouvelle inscription',
          text: `Nouvelle inscription : ${email} - Code ${referralCode}${referredBy ? ` - Parrain ${referredBy}` : ''}`,
        });
      }
    }
    res.status(200).json({ success: true, referralCode, emailSent: !!transporter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to send email' });
  }
};
