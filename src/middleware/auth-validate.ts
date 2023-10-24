import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const service = new AuthService();

const verifyAccountEmail = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { email } = request.body;
  let msg = "";
  let error = false;
  const account = await service.findUserEmail(email);

  if (account) {
    msg = `Ya existe una cuenta con el email ${email}`;
    error = true;
  }

  if (error) {
    response.status(400).json({
      success: false,
      errors: {
        msg,
      },
    });
  } else {
    next();
  }
};

const existsAccountEmail = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { email } = request.body;
  let msg = "";
  let error = false;
  const account = await service.findUserEmail(email);

  if (!account) {
    msg = `No existe una cuenta con el email ${email}`;
    error = true;
  }

  if (error) {
    response.status(400).json({
      success: false,
      errors: {
        msg,
      },
    });
  } else {
    next();
  }
};

export { verifyAccountEmail, existsAccountEmail };
