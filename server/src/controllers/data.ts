import e, { Request, Response } from "express";
import { QueryResult } from "pg";
import { RequestCustom } from "../types/RequestCustom";
import db from "../db";
import { Result } from "../interfaces/Result";

export const getAllData = async (
  req: RequestCustom,
  res: Response
): Promise<any> => {
  const { limit, offset } = req.query;
  const query =
    "SELECT p.id, p.title, p.loc, STRING_AGG(i.img_url, ';') AS urls FROM posts p LEFT JOIN imgs i ON p.id=i.post_id GROUP BY p.id ORDER BY p.id ASC LIMIT $1 OFFSET $2;";
  try {
    let limitTmp: number = 20;
    let offsetTmp: number = 0;
    if (typeof offset != "undefined") {
      offsetTmp = Number(offset);
    }
    if (typeof limit != "undefined") {
      limitTmp = Number(limit);
    }

    const response: QueryResult = await db.query(query, [limitTmp, offsetTmp]);
    const totalRows: QueryResult = await db.query(
      "SELECT COUNT(*) FROM posts;"
    );
    // uprav response -> results, total pages, current page
    const results: Result = {};
    results.totalPages = Math.ceil(
      parseInt(totalRows.rows[0].count) / limitTmp
    );
    results.currentPage = Math.ceil(offsetTmp / limitTmp + 1);
    results.totalRowsInDb = totalRows.rows[0].count;
    results.rowCount = response.rowCount;
    results.results = response.rows;

    res.json(results);
  } catch (e: any) {
    res.status(500).send({ message: e });
    console.log(e);
  }
};
