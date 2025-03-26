// lib/db.ts
import { Pool, QueryResultRow } from 'pg';

// Set up the database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for NeonDB
  }
});

// Define a generic query function that returns a promise with the specified result type `T`
export const query = async <T extends QueryResultRow = any>(text: string, params?: any[]): Promise<T[]> => {
  const result = await pool.query<T>(text, params);
  return result.rows;
};
