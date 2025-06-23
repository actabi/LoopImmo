import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { query } from '../db';
import { notImplemented } from './utils';
import { error } from '../utils/logger';

export const listAmbassadors = async (_req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM ambassadors');
    res.json(rows);
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAmbassador = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rows } = await query('SELECT * FROM ambassadors WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Ambassador not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createAmbassador = async (req: Request, res: Response) => {
  const { user_id, zone, commission, bio } = req.body;
  if (!user_id) {
    return res.status(400).json({ error: 'user_id required' });
  }
  try {
    const id = randomUUID();
    const { rows } = await query(
      'INSERT INTO ambassadors (id, user_id, zone, commission, bio) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [id, user_id, zone, commission, bio]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const updateAmbassador = notImplemented('update ambassador');
export const getAmbassadorProperties = notImplemented('get ambassador properties');
export const getAmbassadorStats = notImplemented('get ambassador stats');
export const getAmbassadorCommissions = notImplemented('get ambassador commissions');
export const listReferrals = notImplemented('list referrals');
export const getReferral = notImplemented('get referral');
export const createReferral = notImplemented('create referral');
export const changeReferralStatus = notImplemented('change referral status');
export const acceptReferral = notImplemented('accept referral');
export const convertReferral = notImplemented('convert referral');
export const addReferralNotes = notImplemented('add referral notes');
