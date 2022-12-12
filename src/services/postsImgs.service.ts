import { QueryResult } from "pg";
import db from "../db";

/**
 * @description Creates a record in posts table (title + location) and in imgs table (imgs). Transactions are used.
 * @param title title of the property - e.g Prodej bytu v Praze 47m
 * @param location location of the property - e.g Praha
 * @param imgs image urls of the property - e.g. https://seznam.cz
 */
export const createPostsAndImgs = async (
  title: string,
  location: string,
  imgs: Array<any>
) => {
  let tmpId = 0;
  try {
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
