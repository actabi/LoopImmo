import { Request, Response } from 'express';
import { query } from '../db';
import { notImplemented } from './utils';
import { error } from '../utils/logger';

export const listPriceTiers = async (_req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM price_tiers');
    res.json(rows);
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const createPriceTier = notImplemented('create price tier');
export const updatePriceTier = notImplemented('update price tier');
export const deletePriceTier = notImplemented('delete price tier');
export const getSystemConfig = notImplemented('get system config');
export const updateSystemConfig = notImplemented('update system config');
export const getSystemStats = notImplemented('get system stats');
