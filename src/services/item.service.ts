import { prisma } from "../db/prisma";

export class ItemService {
  constructor() {}

  async find() {
    return await prisma.item.findMany({});
  }

  async findOne(id: string) {
    return await prisma.item.findUnique({
      where: { id: id },
    });
  }

  async create(data: any) {
    return await prisma.item.create({
      data: data,
    });
  }

  async update(id: string, data: any) {
    return await prisma.item.update({
      where: { id: id },
      data: data,
    });
  }

  async delete(id: string) {
    return await prisma.item.delete({
      where: { id: id },
    });
  }
}
