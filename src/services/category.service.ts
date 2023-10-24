import { prisma } from "../db/prisma";

export class CategoryService {
  constructor() {}

  async find(id_user: string) {
    return await prisma.category.findMany({
      where: {
        id_user: id_user,
      },
    });
  }

  async findSearch(id_user: string, term: string) {
    return await prisma.category.findMany({
      where: {
        id_user: id_user,
        name: {
          contains: term,
        },
      },
    });
  }

  async findOne(id: string, id_user: string) {
    return await prisma.category.findUnique({
      where: {
        id: id,
        id_user: id_user,
      },
    });
  }

  async create(data: any) {
    return await prisma.category.create({
      data: data,
    });
  }

  async update(id: string, id_user: string, data: any) {
    return await prisma.category.update({
      where: {
        id: id,
        id_user: id_user,
      },
      data: data,
    });
  }

  async delete(id: string, id_user: string) {
    return await prisma.category.delete({
      where: {
        id: id,
        id_user: id_user,
      },
    });
  }
}
