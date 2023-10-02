import { NextFunction, Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { verifyToken } from "../utils/jwt-handle";
import { RequestExt } from "../models/request-ext";

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser?.split(" ").pop();
    const isUser = verifyToken(`${jwt}`);
    if (!isUser) {
      return handleHttp(res, 401, "JWT_NOT_VALID", "Token no valido");
    }
    req.user = isUser;
    next();
  } catch (e) {
    handleHttp(res, 400, "SESION_NO_VALID", e);
  }
};

export { checkJwt };
