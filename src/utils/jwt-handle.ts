import { sign, verify } from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET || "auth.key.token";
const token_time = process.env.TOKEN_TIME || "5h";
const token_time_recovery = process.env.TOKEN_TIME_RECOVERY || "600000";

const generateToken = (id: string) => {
  const jwt = sign({ id }, jwt_secret, {
    expiresIn: token_time,
  });
  return jwt;
};

const generateTokenRecovery = (id: string) => {
  const jwt = sign({ id }, jwt_secret, {
    expiresIn: token_time_recovery,
  });
  return jwt;
};

const verifyToken = (jwt: string) => {
  try {
    const isUser = verify(jwt, jwt_secret);
    return isUser;
  } catch (error) {
    return false;
  }
};

export { generateToken, generateTokenRecovery, verifyToken };
