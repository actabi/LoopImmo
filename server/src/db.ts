import { Pool } from 'pg';
import path from 'path';
import dotenv from 'dotenv';

// Load server-specific environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
