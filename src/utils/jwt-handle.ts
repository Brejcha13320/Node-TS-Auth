import { sign, verify } from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET || "token.01010101";
const jwt_secret_refresh = process.env.JWT_SECRET_REFRESH || "token.01010101";
const expires_token_time = process.env.EXPIRES_TOKEN_TIME || "60000";
const expires_token_time_refresh =
  process.env.EXPIRES_TOKEN_TIME_REFRESH || "120000";
const expires_token_time_recovery =
  process.env.EXPIRES_TOKEN_TIME_RECOVERY || "300000";

const generateToken = (id: string) => {
  const jwt = sign({ id }, jwt_secret, {
    expiresIn: expires_token_time,
  });
  return jwt;
};

const generateRefreshToken = (id: string) => {
  const jwt = sign({ id }, jwt_secret_refresh, {
    expiresIn: expires_token_time_refresh,
  });
  return jwt;
};

const generateTokenRecovery = (id: string) => {
  const jwt = sign({ id }, jwt_secret, {
    expiresIn: expires_token_time_recovery,
  });
  return jwt;
};

const verifyToken = (jwt: string) => {
  const isUser = verify(jwt, jwt_secret);
  return isUser;
};

const verifyRefreshToken = (jwt: string) => {
  const isUser = verify(jwt, jwt_secret_refresh);
  return isUser;
};

export {
  generateToken,
  generateRefreshToken,
  generateTokenRecovery,
  verifyToken,
  verifyRefreshToken,
};
