import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { query } from '../db';
import { notImplemented } from './utils';
import { error } from '../utils/logger';

export const listVisits = async (req: Request, res: Response) => {
  const { property_id, buyer_id } = req.query;
  try {
    let sql = 'SELECT * FROM visits';
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
export const getVisit = notImplemented('get visit');
export const createVisit = async (req: Request, res: Response) => {
  const { property_id, buyer_id, visit_date, visit_time, status } = req.body;
  if (!property_id || !buyer_id || !visit_date || !visit_time) {
    return res.status(400).json({ error: 'missing fields' });
  }
  try {
    const id = randomUUID();
    const { rows } = await query(
      'INSERT INTO visits (id, property_id, buyer_id, visit_date, visit_time, status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [id, property_id, buyer_id, visit_date, visit_time, status]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const updateVisit = notImplemented('update visit');
export const deleteVisit = notImplemented('delete visit');
export const changeVisitStatus = notImplemented('change visit status');
export const addVisitFeedback = notImplemented('add visit feedback');
export const listVisitSlots = notImplemented('list visit slots');
export const createVisitSlot = notImplemented('create visit slot');
export const updateVisitSlot = notImplemented('update visit slot');
export const deleteVisitSlot = notImplemented('delete visit slot');
export const changeVisitSlotAvailability = notImplemented('change visit slot availability');
