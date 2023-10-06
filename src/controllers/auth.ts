import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { AuthService } from "../services/auth.service";
import { encrypt, verified } from "../utils/bcrypt.handle";
import {
  generateRefreshToken,
  generateToken,
  generateTokenRecovery,
  verifyRefreshToken,
  verifyToken,
} from "../utils/jwt-handle";
import { JwtPayload } from "jsonwebtoken";
import { JWTdata } from "../models/jwt-data";
import * as nodemailer from "nodemailer";

const service = new AuthService();

const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = await service.findUser(email);
    if (user) {
      return handleHttp(
        res,
        409,
        "ERROR_REGISTER_USER",
        `Ya existe un usuario con el email ${email}`,
      );
    }
    const passwordHash = await encrypt(password);
    const newUser = await service.registerUser({
      email,
      password: passwordHash,
      name,
    });
    const response = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
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
    };

    res.send({ success: true, data: response });
  } catch (e) {
    handleHttp(res, 500, "ERROR_LOGIN_USER", e);
  }
};

const recoveryPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const fromEmail = process.env.EMAIL;
    const fromEmailPassword = process.env.EMAIL_PASSWORD;
    const user = await service.findUser(email);
    if (!user) {
      return handleHttp(
        res,
        404,
        "ERROR_RECOVERY_EMAIL",
        `No existe una cuenta con el email ${email}`,
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: fromEmail,
        pass: fromEmailPassword,
      },
    });

    const url = `${
      process.env.FRONTENT_URL
    }/auth/recovery-password?token=${generateTokenRecovery(user.id)}`;

    const html = `
    <h1>Recuperación de contraseña</h1>
    <p>Ingrese al siguiente enlace para cambiar su contraseña.</p>
    <a href="${url}">Restablecer Contraseña</a>
    `;
    const mailOptions = {
      from: fromEmail,
      to: email,
      subject: "Recuperación de contraseña",
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    const response = {
      from: fromEmail,
      to: email,
      message: "Correo enviado exitosamente",
    };
    res.send({
      success: true,
      data: response,
    });
  } catch (e) {
    handleHttp(res, 500, "ERROR_RECOVERY_SEND", e);
  }
};

const changePassword = async (req: Request, res: Response) => {
  const token = req.body.token;
  const password = req.body.password;

  try {
    const validToken = verifyToken(token) as JWTdata;

    if (!validToken) {
      return handleHttp(res, 401, "CHANGE_PASSWORD_TOKEN", "Datos Vencidos");
    }

    const user = await service.findUserId(validToken.id);

    if (!user) {
      return handleHttp(
        res,
        401,
        "CHANGE_PASSWORD_ERROR",
        "Usuario no encontrado",
      );
    }

    const passwordHash = await encrypt(password);
    await service.changePassword(user.id, {
      password: passwordHash,
    });
    const response = {
      message: "Contraseña Cambiada con Exito",
    };
    res.send({ success: true, data: response });
  } catch (e) {
    handleHttp(res, 500, "ERROR_CHANGE_PASSWORD", e);
  }
};

const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.body.refresh_token;

  if (!refreshToken) {
    return handleHttp(
      res,
      400,
      "ERROR_REFRESH_TOKEN",
      "Necesita enviar el Refresh Token",
    );
  }

  try {
    const validRefreshToken = verifyRefreshToken(refreshToken) as JWTdata;

    if (!validRefreshToken) {
      return handleHttp(
        res,
        401,
        "JWT_REFRESH_NOT_VALID",
        "Datos Vencidos, Inicia Sesión Nuevamente",
      );
    }

    const user = await service.findUserId(validRefreshToken.id);

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

export {
  registerUser,
  loginUser,
  recoveryPassword,
  changePassword,
  refreshToken,
};
