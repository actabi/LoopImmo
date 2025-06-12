import express from 'express';
import { query } from './db';

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

app.get('/api/properties/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await query(
      `SELECT p.*, u.first_name AS seller_first_name, u.last_name AS seller_last_name,
              a.id AS ambassador_id, a.bio AS ambassador_bio
       FROM properties p
       LEFT JOIN users u ON p.seller_id = u.id
       LEFT JOIN ambassadors a ON p.ambassador_id = a.id
       WHERE p.id = $1`,
      [id],
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'Property not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
