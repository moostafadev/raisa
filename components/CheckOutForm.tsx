"use client";

import React, { useState } from "react";
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
import { Info, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { updateCartAction } from "@/actions/menu.action";
import { Cart, City, IMenu } from "@/interfaces";

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
}: {
  id: string[];
  cart: Cart[];
  meals: IMenu[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
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
    id.map((i) => {
      try {
        updateCartAction({
          id: i,
          username: data.username,
          phone: data.phone,
          address: {
            city: data.city as City,
            state: data.state,
            street: data.street,
            home: data.home,
            house: data.house,
          },
        });
      } catch (error) {
        console.log(error);
      }
    });
    const result = `
      الأسم: ${data.username}
      الرقم: ${data.phone}
      العنوان: ${data.city === "Riyad" ? "ألرياض" : "أبها"}, ${data.state}, ${
      data.street
    }, ${data.home}, ${data.house}
      --- الطلبات ---
      ${cart.map((item: Cart, idx) => {
        return `
          -- الطلب ${idx + 1} --
          الصنف: ${meals.filter((meal) => meal.id === item.productId)[0].title}
          الكمية: ${item.qyt}
          الحجم: ${meals.filter((meal) => meal.id === item.productId)[0].title}
          السعر: ${
            meals.filter((meal) => meal.id === item.productId)[0].price
          } ريال
        `;
      })}
    `;
    try {
      // توثيق
      fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cart[0].email,
          userFirstname: cart[0].username,
          result: result,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">الأسم</FormLabel>
              <FormControl>
                <Input
                  className="text-base max-w-[300px]"
                  placeholder="الأسم"
                  defaultValue={field.value ?? ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">رقم الهاتف</FormLabel>
              <FormControl>
                <Input
                  className="text-base max-w-[300px]"
                  placeholder="0556171648"
                  value={field.value ?? ""}
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
              <div className="flex gap-2 items-center text-red-600 hover:-translate-x-1 duration-300 mt-1">
                <Info />
                <p className="text-base font-semibold">
                  يوجد خدمة التوصيل فقط في مدينتي (ألرياض) (أبها).
                </p>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">الحي</FormLabel>
              <FormControl>
                <Input
                  className="text-base max-w-[300px]"
                  placeholder="الحي"
                  defaultValue={field.value ?? ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">الشارع</FormLabel>
              <FormControl>
                <Input
                  className="text-base max-w-[300px]"
                  placeholder="الشارع"
                  defaultValue={field.value ?? ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="home"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">العمارة</FormLabel>
              <FormControl>
                <Input
                  className="text-base max-w-[300px]"
                  placeholder="العمارة"
                  defaultValue={field.value ?? ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="house"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">المنزل</FormLabel>
              <FormControl>
                <Input
                  className="text-base max-w-[300px]"
                  placeholder="المنزل"
                  value={typeof field.value === "number" ? field.value : ""}
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

        <Button
          type="submit"
          disabled={isLoading}
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

        <div className="flex gap-2 items-center text-red-600 hover:-translate-x-1 duration-300">
          <Info size={28} />
          <p className="text-lg font-semibold">
            سوف يتم ارسال الطلب من رقمك الي رقم المطعم عن طريق الواتس أب.
          </p>
        </div>
      </form>
    </Form>
  );
};

export default CheckOutForm;
