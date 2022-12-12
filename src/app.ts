import express, { Application, Response, Request } from "express";
import "dotenv/config.js";
import { fetchData } from "./fetch/fetchData";
import db from "./db";
import { getAllData } from "./controllers/data";

const app: Application = express();
const port: string | number = process.env.PORT || 3000;

const numberOfResults: number = 500;
const resultsPerPage: number = 20;
const n: number = numberOfResults / resultsPerPage;
fetchData(1);

app.get("/", async (req: Request, res: Response): Promise<any> => {
  const results = await db.query("SELECT * FROM posts;");
  res.send(results);
});

app.get("/data", getAllData);

app.listen(port, (): void => {
  console.log(`Running on http://localhost:${port}`);
});
