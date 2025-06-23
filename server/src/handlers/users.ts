import { Request, Response } from 'express';
import { query } from '../db';
import { notImplemented } from './utils';
import { error } from '../utils/logger';

export const listUsers = async (_req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rows } = await query('SELECT * FROM users WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { first_name, last_name, phone } = req.body;
  try {
    const { rows } = await query(
      'UPDATE users SET first_name = $1, last_name = $2, phone = $3 WHERE id = $4 RETURNING *',
      [first_name, last_name, phone, id]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rowCount } = await query('DELETE FROM users WHERE id = $1', [id]);
    if (rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserProperties = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rows } = await query('SELECT * FROM properties WHERE seller_id = $1', [id]);
    res.json(rows);
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserSavedSearches = notImplemented('get user saved searches');
export const getUserFavoriteProperties = notImplemented('get user favorite properties');
