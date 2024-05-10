"use server";

import { IMenu } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const createProductAction = async ({
  title,
  body,
  price,
  kcal,
  size,
  authorId,
  image,
}: IMenu) => {
  await prisma.product.create({
    data: {
      title,
      body,
      price,
      kcal,
      size,
      image,
      category: {
        connect: {
          id: authorId as string,
        },
      },
    },
  });
  revalidatePath("/admin/menu");
};

export const createCategoryAction = async ({ title }: { title: string }) => {
  await prisma.category.create({
    data: {
      title,
    },
  });
};

export const getAllProducts = async () => {
  return prisma.product.findMany({
    include: { category: true },
  });
};

export const getAllCategories = async () => {
  return prisma.category.findMany({
    include: { products: true },
  });
};
