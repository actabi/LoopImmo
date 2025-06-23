import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { query } from '../db';
import { notImplemented } from './utils';
import { error } from '../utils/logger';

export const listOffers = async (req: Request, res: Response) => {
  const { property_id, buyer_id } = req.query;
  try {
    let sql = 'SELECT * FROM offers';
    const params: any[] = [];
    if (property_id) {
      params.push(property_id);
      sql += ` WHERE property_id = $${params.length}`;
    }
    if (buyer_id) {
      params.push(buyer_id);
      sql += params.length === 1 ? ` WHERE buyer_id = $${params.length}` : ` AND buyer_id = $${params.length}`;
    }
    const { rows } = await query(sql, params);
    res.json(rows);
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const getOffer = notImplemented('get offer');
export const createOffer = async (req: Request, res: Response) => {
  const { property_id, buyer_id, amount, status, message } = req.body;
  if (!property_id || !buyer_id || !amount) {
    return res.status(400).json({ error: 'missing fields' });
  }
  try {
    const id = randomUUID();
    const { rows } = await query(
      'INSERT INTO offers (id, property_id, buyer_id, amount, status, message, created_at) VALUES ($1,$2,$3,$4,$5,$6,NOW()) RETURNING *',
      [id, property_id, buyer_id, amount, status, message]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const updateOffer = notImplemented('update offer');
export const deleteOffer = notImplemented('delete offer');
export const changeOfferStatus = notImplemented('change offer status');
export const counterOffer = notImplemented('counter offer');
