import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { JWTdata } from "./jwt-data";

export interface RequestExt extends Request {
  // user?: string | JwtPayload;
  user?: JWTdata;
}
