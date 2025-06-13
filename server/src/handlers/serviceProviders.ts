import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { query } from '../db';
import { notImplemented } from './utils';

export const listServiceProviders = async (_req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM service_providers');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getServiceProvider = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rows } = await query('SELECT * FROM service_providers WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Service provider not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const createServiceProvider = notImplemented('create service provider');
export const updateServiceProvider = notImplemented('update service provider');
export const deleteServiceProvider = notImplemented('delete service provider');
export const getServiceProviderPortfolio = notImplemented('get service provider portfolio');

export const listServiceProposals = async (_req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM service_proposals');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const getServiceProposal = notImplemented('get service proposal');
export const createServiceProposal = async (req: Request, res: Response) => {
  const { property_id, provider_id, status, proposed_date, message, custom_price } = req.body;
  if (!property_id || !provider_id) {
    return res.status(400).json({ error: 'missing fields' });
  }
  try {
    const id = randomUUID();
    const { rows } = await query(
      'INSERT INTO service_proposals (id, property_id, provider_id, status, proposed_date, message, created_at, custom_price) VALUES ($1,$2,$3,$4,$5,$6,NOW(),$7) RETURNING *',
      [id, property_id, provider_id, status, proposed_date, message, custom_price]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const changeServiceProposalStatus = notImplemented('change service proposal status');
export const updateServiceProposal = notImplemented('update service proposal');
