import { Response } from "express";

export const handleHttp = (
  res: Response,
  status: number,
  error_name: string,
  error: any,
) => {
  res.status(status).send({
    success: false,
    message: error_name,
    error: error,
  });
};
