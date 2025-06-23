import { Pool } from 'pg';
import path from 'path';
import dotenv from 'dotenv';
import { log, error } from './utils/logger';

// Load server-specific environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;
const sslRequired = connectionString?.includes('sslmode=require');

// When the connection string requires SSL, skip certificate verification
// for the database connection only. Avoid setting
// NODE_TLS_REJECT_UNAUTHORIZED globally to prevent runtime warnings.

const pool = new Pool({
  connectionString,
  ...(sslRequired ? { ssl: { rejectUnauthorized: false } } : {}),
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const connectDb = async () => {
  try {
    await pool.connect();
    log('Database connected');
  } catch (err) {
    error('Database connection failed:', err);
  }
};
