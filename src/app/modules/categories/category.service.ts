import { Category } from "@prisma/client";
import { prisma } from "../../share/prismaClient";

const categoryCreateData = async (payload: Category) => {
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};
const categoryGetData = async () => {
  const result = await prisma.category.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });
  return result;
};

const categorySingleGetData = async (categoryId: string) => {
  const result = await prisma.category.findUniqueOrThrow({
    where: {
      id: categoryId,
    },
  });
  return result;
};
const categoryUpdateGetData = async (name: string, categoryId: string) => {
  const existing = await prisma.category.findUniqueOrThrow({
    where: { id: categoryId },
  });
  const result = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name: name,
    },
  });
  return result;
};
const categoryDeletedGetData = async (categoryId: string) => {
  const result = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
  return result;
};
export const categoryService = {
  categoryCreateData,
  categoryGetData,
  categorySingleGetData,
  categoryDeletedGetData,
  categoryUpdateGetData,
};
