import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { AuthService } from "../services/auth.service";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt-handle";

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
    const response = {
      token,
      user,
    };

    res.send({ success: true, data: response });
  } catch (e) {
    handleHttp(res, 500, "ERROR_LOGIN_USER", e);
  }
};

export { registerUser, loginUser };
