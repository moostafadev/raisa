"use server";

import { IMenu } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// Product actions
export const getAllProductsAction = async () => {
  return prisma.product.findMany({
    include: { category: true },
  });
};

export const getProductAction = async ({ id }: { id: string }) => {
  return prisma.product.findUnique({
    where: {
      id,
    },
  });
};

export const createProductAction = async ({
  title,
  body,
  price,
  kcal,
  size,
  categoryId,
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
          id: categoryId as string,
        },
      },
    },
  });
  revalidatePath("/admin/menu");
};

export const updateProductAction = async ({
  id,
  title,
  body,
  price,
  size,
  kcal,
  image,
  categoryId,
}: {
  id?: string;
  title?: string;
  body?: string | null;
  price?: number;
  size?: string | null;
  kcal?: number | null;
  image?: string | null;
  categoryId?: string;
}) => {
  await prisma.product.update({
    where: {
      id,
    },
    data: {
      title,
      body,
      price,
      size,
      kcal,
      image,
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  });
  revalidatePath("/admin/menu");
};

export const deleteProductAction = async ({ id }: { id: string }) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
  revalidatePath("/admin/menu");
};

// Category actions
export const getAllCategoriesAction = async () => {
  return prisma.category.findMany({
    include: { products: true },
  });
};

export const getCategoryAction = async ({ id }: { id: string }) => {
  return prisma.category.findUnique({
    where: {
      id,
    },
  });
};

export const createCategoryAction = async ({ title }: { title: string }) => {
  await prisma.category.create({
    data: {
      title,
    },
  });
  revalidatePath("/admin/category");
};

export const updateCategoryAction = async ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => {
  await prisma.category.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });
  revalidatePath("/admin/category");
};

export const deleteCategoryAction = async ({ id }: { id: string }) => {
  await prisma.category.delete({
    where: {
      id,
    },
  });
  revalidatePath("/admin/category");
};
