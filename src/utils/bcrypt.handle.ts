import { hash, compare, genSaltSync } from "bcryptjs";

const encrypt = async (password: string) => {
  const salt = genSaltSync();
  const passwordHash = await hash(password, salt);
  return passwordHash;
};

const verified = async (password: string, passwordHast: string) => {
  const isCorrect = await compare(password, passwordHast);
  return isCorrect;
};

export { encrypt, verified };
