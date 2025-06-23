import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { query } from '../db';
import { notImplemented } from './utils';
import { error } from '../utils/logger';

export const login = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'email required' });
  }
  try {
    const { rows } = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ token: 'dummy-token', user: rows[0] });
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, first_name, last_name, roles = [], referredBy } = req.body;
  if (!email || !first_name || !last_name) {
    return res.status(400).json({ error: 'missing fields' });
  }
  try {
    const id = randomUUID();
    const referralCode = Math.random().toString(36).slice(2, 8).toUpperCase();
    const { rows } = await query(
      'INSERT INTO users (id, email, first_name, last_name, roles, phone, avatar, referral_code, referred_by, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW()) RETURNING *',
      [
        id,
        email,
        first_name,
        last_name,
        roles,
        null,
        null,
        referralCode,
        referredBy || null,
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const logout = notImplemented('logout');
export const refreshToken = notImplemented('refresh token');
export const forgotPassword = notImplemented('forgot password');
export const resetPassword = notImplemented('reset password');
