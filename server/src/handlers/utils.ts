import { Request, Response } from 'express';

export const notImplemented = (name: string) => (req: Request, res: Response) => {
  res.status(501).json({ error: `${name} not implemented` });
};
