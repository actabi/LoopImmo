import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { query } from '../db';
import { notImplemented } from './utils';
import { error } from '../utils/logger';

export const listProperties = async (_req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM properties');
    res.json(rows);
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rows } = await query(
      `SELECT p.*, u.first_name AS seller_first_name, u.last_name AS seller_last_name,
              a.id AS ambassador_id, a.bio AS ambassador_bio
       FROM properties p
       LEFT JOIN users u ON p.seller_id = u.id
       LEFT JOIN ambassadors a ON p.ambassador_id = a.id
       WHERE p.id = $1`,
      [id]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'Property not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createProperty = async (req: Request, res: Response) => {
  const { title, price, type, status, seller_id } = req.body;
  if (!title || !price || !type || !status) {
    return res.status(400).json({ error: 'missing fields' });
  }
  try {
    const id = randomUUID();
    const { rows } = await query(
      'INSERT INTO properties (id, title, price, type, status, seller_id, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,NOW(),NOW()) RETURNING *',
      [id, title, price, type, status, seller_id]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, price, status } = req.body;
  try {
    const { rows } = await query(
      'UPDATE properties SET title = $1, price = $2, status = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [title, price, status, id]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'Property not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rowCount } = await query('DELETE FROM properties WHERE id = $1', [id]);
    if (rowCount === 0) {
      res.status(404).json({ error: 'Property not found' });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const getPropertyStats = notImplemented('get property stats');
export const changePropertyStatus = notImplemented('change property status');
export const getPropertyVisitSlots = notImplemented('get property visit slots');
export const addPropertyPhotos = notImplemented('add property photos');
export const deletePropertyPhoto = notImplemented('delete property photo');
export const addPropertyFeatures = notImplemented('add property features');
export const deletePropertyFeature = notImplemented('delete property feature');
