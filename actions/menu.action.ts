"use server";

import { City, IMenu } from "@/interfaces";
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

// Delivery Service actions
export const getDeliveryAction = async () => {
  return await prisma.deliveryService.findMany();
};

export const getOneDeliveryAction = async ({ id }: { id: string }) => {
  return await prisma.deliveryService.findMany({
    where: {
      id,
    },
  });
};

export const UpdateDeliveryAction = async ({
  id,
  available,
  price,
}: {
  id: string;
  available: "YES" | "NO";
  price?: number | null;
}) => {
  await prisma.deliveryService.update({
    where: {
      id,
    },
    data: {
      available,
      price,
    },
  });
  revalidatePath("/admin");
};

// Cart actions
export const getCartsAction = async () => {
  return await prisma.cart.findMany();
};

export const getOneIdCartAction = async ({ id }: { id: string }) => {
  return await prisma.cart.findMany({
    where: {
      id,
    },
  });
};

export const getOneCartAction = async ({ email }: { email: string }) => {
  return await prisma.cart.findMany({
    where: {
      email,
    },
  });
};

export const getCartConditionAction = async ({
  condition,
  email,
}: {
  condition: boolean | null;
  email: string;
}) => {
  return await prisma.cart.findMany({
    where: {
      condition,
      email,
    },
  });
};

export const getAllCartConditionAction = async ({
  condition,
}: {
  condition: boolean | null;
}) => {
  return await prisma.cart.findMany({
    where: {
      condition,
    },
  });
};

export const createCartAction = async ({
  email,
  productId,
  qyt = 1,
  condition,
}: {
  productId: string;
  qyt?: number;
  email: string;
  condition?: boolean | null;
}) => {
  await prisma.cart.create({
    data: {
      email,
      productId,
      qyt,
      condition,
    },
  });
};

interface UpdateCartActionParams {
  id: string;
  qyt?: number;
  username?: string | null;
  phone?: number | null;
  condition?: boolean | null;
  address?: {
    city?: City | null;
    state: string;
    street: string;
    home: string;
    house: number;
  } | null;
}

export const updateCartAction = async ({
  id,
  qyt,
  username,
  phone,
  address,
  condition,
}: UpdateCartActionParams) => {
  const dataToUpdate: any = {};
  if (qyt !== undefined) dataToUpdate.qyt = qyt;
  if (username !== undefined) dataToUpdate.username = username;
  if (phone !== undefined) dataToUpdate.phone = phone;
  if (condition !== undefined) dataToUpdate.condition = condition;
  if (address !== undefined) dataToUpdate.address = address;

  await prisma.cart.update({
    where: { id },
    data: dataToUpdate,
  });
  revalidatePath("/cart");
};

export const deleteCartAction = async ({ id }: { id: string }) => {
  await prisma.cart.delete({
    where: {
      id,
    },
  });
  revalidatePath("/cart");
};
