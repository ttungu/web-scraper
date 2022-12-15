import { Pool } from "pg";

export const pool: Pool = new Pool();

export default {
  query: (text: string, params?: Array<any>) => pool.query(text, params),
};
