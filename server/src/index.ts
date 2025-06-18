import express from 'express';
import { query, connectDb } from './db';
import { subscribeNewsletter, register } from './handlers';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/users', async (_req, res) => {
  try {
    const { rows } = await query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/properties', async (_req, res) => {
  try {
    const { rows } = await query('SELECT * FROM properties');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/subscribe', subscribeNewsletter);
app.post('/api/register', register);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server due to database error', err);
    process.exit(1);
  });
