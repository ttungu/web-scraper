import express, { Application, Response, Request, NextFunction } from "express";
import "dotenv/config.js";
import { fetchData } from "./fetch/fetchData";

const app: Application = express();
const port: string | number = process.env.PORT || 3000;

const states: Array<any> = [];

fetchData(1);

app.get("/", (req: Request, res: Response) => {
  res.send(states);
});

app.post("/data", (req: Request, res: Response) => {});

app.listen(port, (): void => {
  console.log(`Running on http://localhost:${port}`);
});
