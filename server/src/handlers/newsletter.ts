import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';

// Load server-specific environment variables for email credentials
// The handler lives in `server/src/handlers`, so the root `.env`
// resides two directories up from this file.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const subscribeNewsletter = async (req: Request, res: Response) => {
  const { email } = req.body as { email?: string };
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const referralCode = Math.random().toString(36).slice(2, 8).toUpperCase();

  try {
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
        text: `Merci pour votre inscription à LoopImmo!\nVoici votre code de parrainage : ${referralCode}\nPartagez-le avec vos contacts pour cumuler des primes.`,
      });

      if (process.env.EMAIL_TO) {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: process.env.EMAIL_TO,
          subject: 'Nouvelle inscription',
          text: `Nouvelle inscription : ${email} - Code ${referralCode}`,
        });
      }
    }
    res.status(200).json({ success: true, referralCode, emailSent: !!transporter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to send email' });
  }
};
