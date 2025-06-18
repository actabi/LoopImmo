import { Pool } from 'pg';
import path from 'path';
import dotenv from 'dotenv';

// Load server-specific environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;
const sslRequired = connectionString?.includes('sslmode=require');

if (sslRequired) {
  // Disable TLS certificate verification when connecting to cloud
  // databases that provide a self-signed certificate. This mirrors the
  // behaviour of setting NODE_TLS_REJECT_UNAUTHORIZED=0 but only applies
  // when the connection string explicitly requests SSL.
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const pool = new Pool({
  connectionString,
  ...(sslRequired ? { ssl: { rejectUnauthorized: false } } : {}),
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
