import { Pool } from 'pg';
import path from 'path';
import dotenv from 'dotenv';
import { log, error } from './utils/logger';

// Load server-specific environment variables and log the result
const envPath = path.resolve(__dirname, '../.env');
const envResult = dotenv.config({ path: envPath });
if (envResult.error) {
  log(`No .env file found at ${envPath}`);
} else {
  log(`Loaded environment variables from ${envPath}`);
}

// Configuration Pool optimisée pour OVH
const pool = new Pool({
  connectionString: process.env.DATABASE_URL?.split('?')[0], // URL propre sans paramètres
  ssl: {
    rejectUnauthorized: false
  },
  // Paramètres valides pour PoolConfig
  max: 10, // Nombre max de connexions
  min: 2,  // Nombre min de connexions maintenues
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const connectDb = async () => {
  try {
    log('Testing database connection with Pool...');
    
    // Test initial avec retry manuel
    let retries = 3;
    while (retries > 0) {
      try {
        const result = await pool.query('SELECT current_user, current_database(), NOW() as connected_at');
        log('Database Pool connected successfully');
        log('Connected as:', result.rows[0].current_user);
        log('Database:', result.rows[0].current_database);
        log('Connected at:', result.rows[0].connected_at);
        break;
      } catch (err) {
        retries--;
        if (retries === 0) throw err;
        log(`Connection attempt failed, retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  } catch (err) {
    error('Database Pool connection failed:', err);
    throw err;
  }
};

// Monitoring du pool (optionnel)
pool.on('connect', (client) => {
  log('New pool client connected');
});

pool.on('error', (err, client) => {
  error('Pool client error:', err);
});

// Gérer proprement la fermeture
process.on('SIGINT', async () => {
  log('Closing database pool...');
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  log('Closing database pool...');
  await pool.end();
  process.exit(0);
});