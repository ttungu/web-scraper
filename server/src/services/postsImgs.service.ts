import { QueryResult } from "pg";
import db, { pool } from "../db";
/**
 * @description Creates a record in posts table (title + location) and in imgs table (imgs). Transactions are used.
 * @param {string} title title of the property - e.g Prodej bytu v Praze 47m
 * @param {string} location location of the property - e.g Praha
 * @param {Array} imgs image urls of the property - e.g. https://seznam.cz
 */
export const createPostsAndImgs = async (
  title: string,
  location: string,
  imgs: Array<any>
) => {
  try {
    await db.query("BEGIN");
    const results: QueryResult = await db.query(
      "INSERT INTO posts (title, loc) VALUES ($1, $2) RETURNING id",
      [title, location]
    );
    const { id } = results.rows[0];
    for (let i = 0; i < imgs.length; i++) {
      const insertImgs: QueryResult = await db.query(
        "INSERT INTO imgs (post_id, img_url) VALUES ($1, $2)",
        [id, imgs[i]]
      );
    }
    await db.query("COMMIT");
  } catch (e) {
    await db.query("ROLLBACK");
    console.log(e);
  }
};
