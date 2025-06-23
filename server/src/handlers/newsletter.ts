import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs/promises';
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
  console.log('subscribeNewsletter called', { email, referredBy });
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const { rows } = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (rows.length > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    console.log('Email not found in DB, proceeding');
  } catch (err) {
    console.error('Error checking email', err);
    return res.status(500).json({ error: 'Unable to check email' });
  }

  const referralCode = Math.random().toString(36).slice(2, 8).toUpperCase();
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const referralLink = `${baseUrl}?ref=${referralCode}`;
  console.log('Generated referral link', referralLink);

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
    console.log('Inserted new user', id);
    const smtpReady =
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_HOST !== 'smtp.example.com';

    let transporter: nodemailer.Transporter | undefined;
    if (smtpReady) {
      console.log('Creating SMTP transporter');
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
      console.log('Sending email to', email);
      const templatePath = path.resolve(
        __dirname,
        '../../templates/newsletter.html'
      );
      let htmlTemplate = await fs.readFile(templatePath, 'utf-8');
      htmlTemplate = htmlTemplate
        .replace(/{{referralCode}}/g, referralCode)
        .replace(/{{referralLink}}/g, referralLink);

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
    console.error('Error during subscription', err);
    res.status(500).json({ error: 'Unable to send email' });
  }
};
