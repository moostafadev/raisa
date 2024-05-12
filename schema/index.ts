import { z } from "zod";

export const MenuSchema = z.object({
  title: z
    .string()
    .min(1, { message: "يجب ادخال اسم مناسب." })
    .max(30, { message: "الاسم لا يصلح لانه أكثر من 30 حرفاً" }),
  body: z.string().optional().nullable(),
  price: z.number(),
  size: z.string().optional().nullable(),
  kcal: z.number().optional().nullable(),
  category: z.string().optional(),
});

export type MenuValues = z.infer<typeof MenuSchema>;

export const CategorySchema = z.object({
  title: z
    .string()
    .min(1, { message: "يجب ادخال اسم مناسب." })
    .max(30, { message: "الاسم لا يصلح لانه أكثر من 30 حرفاً" }),
});

export type CategoryValues = z.infer<typeof CategorySchema>;

export const DeliverySchema = z.object({
  available: z.enum(["NO", "YES"]),
  price: z.number().optional().nullable(),
});

export type DeliveryValues = z.infer<typeof DeliverySchema>;

export const CheckOutSchema = z.object({
  username: z.string().min(1, {
    message: "أدخل الأسم كامل",
  }),
  phone: z.number().min(9, {
    message: "أدخل رقم الهاتف صحيح و يبدأ ب 0",
  }),
  city: z.enum(["Riyad", "Abha"]),
  state: z.string().min(1, {
    message: "أدخل أسم الحي صحيحياً",
  }),
  street: z.string().min(1, {
    message: "أدخل أسم الشارع صحيحاً",
  }),
  home: z.string().min(1, {
    message: "أدخل عنوان العمارة صحيحاً",
  }),
  house: z.number().min(1, {
    message: "أدخل رقم المنزل",
  }),
});

export type CheckOutValues = z.infer<typeof CheckOutSchema>;
