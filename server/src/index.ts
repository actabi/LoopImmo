import express, { Request, Response } from 'express';
import cors from 'cors';
import * as Sentry from '@sentry/node';
import { query, connectDb } from './db';
import { subscribeNewsletter, register } from './handlers';
import { log, error } from './utils/logger';

const allowedOrigin = process.env.FRONTEND_URL;

if (!allowedOrigin) {
  error('FRONTEND_URL environment variable is not defined');
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

// RequestHandler must be the first middleware
app.use(Sentry.Handlers.requestHandler());

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get('/api/users', async (_req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/properties', async (_req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM properties');
    res.json(rows);
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/subscribe', subscribeNewsletter);
app.post('/api/register', register);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello LoopImmo !');
});

// Test route to verify Sentry configuration
app.get('/debug-sentry', (_req: Request, _res: Response) => {
  throw new Error('Test Sentry error');
});

// Error handler must come after routes
app.use(Sentry.Handlers.errorHandler());

connectDb()
  .then(() => {
    app.listen(port, () => {
      log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    error('Failed to start server due to database error', err);
    process.exit(1);
  });
