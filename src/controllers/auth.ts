import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { AuthService } from "../services/auth.service";
import { encrypt, verified } from "../utils/bcrypt.handle";
import {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
} from "../utils/jwt-handle";
import { JwtPayload } from "jsonwebtoken";
import { JWTdata } from "../models/jwt-data";

const service = new AuthService();

const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = await service.findUser(email);
    if (user) {
      handleHttp(
        res,
        409,
        "ERROR_REGISTER_USER",
        `Ya existe un usuario con el email ${email}`,
      );
    }
    const passwordHash = await encrypt(password);
    const response = await service.registerUser({
      email,
      password: passwordHash,
      name,
    });
    res.send({ success: true, data: response });
  } catch (e) {
    handleHttp(res, 500, "ERROR_REGISTER_USER", e);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await service.findUser(email);

    if (!user) {
      return handleHttp(res, 404, "ERROR_LOGIN_USER", "Datos Incorrectos");
    }

    const passwordHash = user?.password;
    const isCorrect = await verified(password, passwordHash);

    if (!isCorrect) {
      return handleHttp(res, 403, "ERROR_LOGIN_USER", "Datos Incorrectos");
    }

    const token = generateToken(user.id);
    const refresh_token = generateRefreshToken(user.id);
    const response = {
      token,
      refresh_token,
      user,
    };

    res.send({ success: true, data: response });
  } catch (e) {
    handleHttp(res, 500, "ERROR_LOGIN_USER", e);
  }
};

const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.body.refresh_token;

  if (!refreshToken) {
    handleHttp(
      res,
      400,
      "ERROR_REFRESH_TOKEN",
      "Necesita enviar el Refresh Token",
    );
  }

  try {
    const validRefreshToken = verifyRefreshToken(refreshToken) as JWTdata;
    console.log("validRefreshToken", validRefreshToken);

    if (!validRefreshToken) {
      return handleHttp(
        res,
        401,
        "JWT_REFRESH_NOT_VALID",
        "Datos Vencidos, Inicia Sesión Nuevamente",
      );
    }

    const user = await service.findUserId(validRefreshToken.id);

    console.log("user", user);

    if (!user) {
      return handleHttp(
        res,
        401,
        "JWT_REFRESH_NOT_VALID",
        "Datos de Sesión Invalidos, Inicia Sesión Nuevamente",
      );
    }

    const token = generateToken(user.id);
    const refresh_token = generateRefreshToken(user.id);

    const response = {
      token,
      refresh_token,
    };

    res.send({ success: true, data: response });
  } catch (e) {
    handleHttp(res, 500, "ERROR_REFRESH_TOKEN", e);
  }
};

export { registerUser, loginUser, refreshToken };
