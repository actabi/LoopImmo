import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { query } from '../db';
import { notImplemented } from './utils';

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
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, first_name, last_name, roles = [] } = req.body;
  if (!email || !first_name || !last_name) {
    return res.status(400).json({ error: 'missing fields' });
  }
  try {
    const id = randomUUID();
    const { rows } = await query(
      'INSERT INTO users (id, email, first_name, last_name, roles, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [id, email, first_name, last_name, roles]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const logout = notImplemented('logout');
export const refreshToken = notImplemented('refresh token');
export const forgotPassword = notImplemented('forgot password');
export const resetPassword = notImplemented('reset password');
