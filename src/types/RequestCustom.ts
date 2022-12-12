import { Request } from "express";

export interface RequestCustom extends Request {
  limit?: string;
  offset?: string;
}
