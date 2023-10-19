import { Request } from "express";
import { JWTdata } from "./jwt-data";

export interface RequestExt extends Request {
  // user?: string | JwtPayload;
  user?: JWTdata;
}
