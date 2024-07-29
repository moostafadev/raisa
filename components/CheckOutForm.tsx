"use client";

import React, { useContext, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckOutSchema } from "@/schema";
import { useForm } from "react-hook-form";
import Spinner from "./Spinner";
import { Home, Info, MessageCircle, Send, Truck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { updateCartAction } from "@/actions/menu.action";
import { Cart, City, IMenu } from "@/interfaces";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CheckOutSchema {
  username: string;
  phone: number;
  city: City | null;
  state: string;
  street: string;
  home: string;
  house: number;
}

const CheckOutForm = ({
  id,
  cart,
  meals,
  finalPrice,
}: {
  id: string[];
  cart: Cart[];
  meals: IMenu[];
  finalPrice: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const { setCart } = useContext(CartContext);
  const router = useRouter();

  const form = useForm<z.infer<typeof CheckOutSchema>>({
    resolver: zodResolver(CheckOutSchema),
    defaultValues: {
      username: "",
      phone: 0,
      city: City.Riyad,
      home: "",
      house: 0,
      state: "",
      street: "",
    },
  });

  async function onSubmit(data: {
    username: string;
    phone: number;
    city: "Riyad" | "Abha";
    state: string;
    street: string;
    home: string;
    house: number;
  }) {
    setIsLoading(true);
    try {
      await Promise.all(
        id.map(async (i) => {
          await updateCartAction({
            id: i,
            username: data.username,
            phone: +data.phone,
            condition: true,
            address: {
              city: data.city as City,
              state: data.state,
              street: data.street,
              home: data.home,
              house: +data.house,
            },
          });
        })
      );
      setIsDone(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setCart([]);
    }

    const result = `
الأسم: ${data.username}
الرقم: ${data.phone}
العنوان: ${data.city === "Riyad" ? "ألرياض" : "أبها"}, ${data.state}, ${
      data.street
    }, ${data.home}, ${data.house}
--- الطلبات ---
${cart
  .map((item: Cart, idx) => {
    const meal = meals.find((meal) => meal.id === item.productId);
    return `
-- الطلب ${idx + 1} --
الصنف: ${meal?.title}
الكمية: ${item.qyt}
الحجم: ${meal?.size} 
السعر: ${meal?.price} ريال
`.trim();
  })
  .join("\n")}
---
السعر الكلي: ${finalPrice}`;

    const encodedResult = encodeURIComponent(result);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=966556171648&text=${encodedResult}`;
    router.replace(whatsappUrl);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">الأسم</FormLabel>
                  <FormControl>
                    <Input
                      className="text-base"
                      placeholder="الأسم"
                      defaultValue={field.value ?? ""}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">
                    رقم الهاتف
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-base"
                      placeholder="556171648"
                      value={field.value === 0 ? "" : field.value}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        field.onChange(value);
                      }}
                      onBlur={field.onBlur}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">المدينه</FormLabel>
              <Select
                value={field.value ?? ""}
                onValueChange={(value: string) => field.onChange(value)}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px] text-base">
                    <SelectValue placeholder="المدينه" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Riyad">الرياض</SelectItem>
                  <SelectItem value="Abha">أبها</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2 items-center text-orange-600 hover:-translate-x-1 duration-300 mt-1">
                <Info />
                <p className="text-sm sm:text-base font-semibold">
                  يوجد خدمة التوصيل فقط في مدينتي (ألرياض) (أبها).
                </p>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">الحي</FormLabel>
                  <FormControl>
                    <Input
                      className="text-base"
                      placeholder="الحي"
                      defaultValue={field.value ?? ""}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">الشارع</FormLabel>
                  <FormControl>
                    <Input
                      className="text-base"
                      placeholder="الشارع"
                      defaultValue={field.value ?? ""}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="home"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">العمارة</FormLabel>
                  <FormControl>
                    <Input
                      className="text-base"
                      placeholder="العمارة"
                      defaultValue={field.value ?? ""}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="house"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">المنزل</FormLabel>
                  <FormControl>
                    <Input
                      className="text-base"
                      placeholder="المنزل"
                      value={field.value === 0 ? "" : field.value}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        field.onChange(value);
                      }}
                      onBlur={field.onBlur}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {isDone ? (
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 py-2 px-3 bg-red-600 dark:bg-red-700 text-white rounded-md w-fit">
              <span>
                <Info />
              </span>
              <p>
                <span className="text-lg font-bold">تنبيه</span> لكي يتم تأكيد
                علي طلبك يجب أرسال رسالة تحتوي علي{" "}
                <span className="text-lg font-bold">رقم الهاتف</span> الذي تم
                تسجليه.
              </p>
            </div>
            <div className="flex gap-1 py-2 px-3 bg-blue-600 dark:bg-blue-700 text-white rounded-md w-fit">
              <span>
                <Truck />
              </span>
              <p>تم أرسال طلبك بنجاح و سوف يصلك خلال 40 - 50 دقيقة.</p>
            </div>
            <div className="flex gap-2 items-center">
              <Link
                href={"https://api.whatsapp.com/send?phone=966556171648"}
                target="_blank"
                className="flex gap-1 items-center text-lg font-bold bg-red-600 dark:bg-red-700 py-[6px] px-4 rounded-md text-white hover:bg-red-500 dark:hover:bg-red-600 duration-300"
              >
                <Send size={20} />
                <span>هنا</span>
              </Link>
              <Button type="button">
                <Link
                  href={"/order"}
                  className="flex gap-1 items-center text-lg font-bold"
                >
                  <Home />
                  <span>صفحة طلبك</span>
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <Button
            type="submit"
            disabled={isLoading || isDone}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <MessageCircle size={20} />
                <span className="text-lg font-bold">أرسال</span>
              </>
            )}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CheckOutForm;
