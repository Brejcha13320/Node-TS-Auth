import { sign, verify } from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET || "token.01010101";
const expires_token_time = process.env.EXPIRES_TOKEN_TIME || "1h";

const generateToken = (id: string) => {
  const jwt = sign({ id }, jwt_secret, {
    expiresIn: expires_token_time,
  });
  return jwt;
};

const verifyToken = (jwt: string) => {
  const isUser = verify(jwt, jwt_secret);
  return isUser;
};

export { generateToken, verifyToken };
