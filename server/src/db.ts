import { Pool } from 'pg';
import path from 'path';
import dotenv from 'dotenv';

// Load server-specific environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;
const sslRequired = connectionString?.includes('sslmode=require');

const pool = new Pool({
  connectionString,
  ...(sslRequired ? { ssl: { rejectUnauthorized: false } } : {}),
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
