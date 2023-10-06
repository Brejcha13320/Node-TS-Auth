import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma";
import { User } from "../interface/user.interface";

export class AuthService {
  constructor() {}

  async registerUser(data: any) {
    return await prisma.user.create({
      data: data,
    });
  }

  async findUser(email: string): Promise<Prisma.Prisma__UserClient<User>> {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return user as unknown as Prisma.Prisma__UserClient<User>;
  }

  async findUserId(id: string): Promise<Prisma.Prisma__UserClient<User>> {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    return user as unknown as Prisma.Prisma__UserClient<User>;
  }

  async changePassword(
    id: string,
    data: any,
  ): Promise<Prisma.Prisma__UserClient<User>> {
    const user = await prisma.user.update({
      where: { id: id },
      data: data,
    });
    return user as unknown as Prisma.Prisma__UserClient<User>;
  }
}
