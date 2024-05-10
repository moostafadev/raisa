"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MenuSchema } from "@/schema";
import { useForm } from "react-hook-form";
import Spinner from "./Spinner";
import { Plus, Trash } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { Category } from "@/interfaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createProductAction } from "@/actions/menu.action";

const MenuForm = ({ categories }: { categories: Category[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [imageURL, setImageURL] = useState<string | null | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof MenuSchema>>({
    resolver: zodResolver(MenuSchema),
    defaultValues: {
      title: "",
      body: "",
      price: 0,
      size: "",
      kcal: 0,
      category: "",
    },
  });

  async function onSubmit({
    title,
    body,
    price,
    size,
    kcal,
    category,
  }: z.infer<typeof MenuSchema>) {
    setIsLoading(true);
    console.log({
      title,
      body,
      price,
      size,
      kcal,
      category,
    });
    console.log(imageURL);
    await createProductAction({
      title,
      price,
      body,
      kcal,
      size,
      categoryId: category,
      image: imageURL,
      id: "",
    });
    setImageURL("");
    setIsImage(true);
    setIsLoading(false);
    router.push("/admin/menu");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">أسم الاكله*</FormLabel>
              <FormControl>
                <Input
                  className="text-base max-w-[600px]"
                  placeholder="أسم الاكله"
                  {...field}
                />
              </FormControl>
              <FormDescription>هذا ألاسم الأساسي للوجبه</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">مكونات الاكله</FormLabel>
              <FormControl>
                <Textarea
                  className="text-base max-w-[600px]"
                  placeholder="مكونات الاكله"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormDescription>
                هذا الذي يظهر تحت أسم الاكله (مكونات الاكله)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">سعر الاكله*</FormLabel>
              <FormControl>
                <Input
                  className="text-base max-w-[600px]"
                  placeholder="سعر الاكله"
                  type="number"
                  value={form.getValues("price") ?? 0}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = parseFloat(e.target.value);
                    form.setValue("price", isNaN(value) ? 0 : value);
                  }}
                />
              </FormControl>
              <FormDescription>
                سعر الاكله يكون{" "}
                {form.getValues("price") ? form.getValues("price") : 0} ريال
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">حجم الاكله*</FormLabel>
              <FormControl>
                <Input
                  className="text-base max-w-[600px]"
                  placeholder="حجم الاكله"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>هذا حجم الاكله</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kcal"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">سعرات الاكله</FormLabel>
              <FormControl>
                <Input
                  className="text-base max-w-[600px]"
                  placeholder="سعرات الاكله"
                  type="number"
                  value={field.value ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = parseFloat(e.target.value);
                    field.onChange(isNaN(value) ? "" : value);
                  }}
                />
              </FormControl>
              <FormDescription>سعرات الاكلة بالكالوري (kcal)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">القسم</FormLabel>
              <Select
                value={field.value ?? ""}
                onValueChange={(value: string) => field.onChange(value)}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px] text-base">
                    <SelectValue placeholder="القسم" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>الاكله ضمن اي قسم</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid max-w-[600px] items-center gap-1.5">
          <label className="text-xl font-bold">صورة الاكله</label>
          <CldUploadWidget
            uploadPreset="nhru5gzp"
            onSuccess={({ info }: CloudinaryUploadWidgetResults) => {
              if (typeof info === "object" && info !== null) {
                setImageURL(info.url);
                setIsImage(true);
              }
            }}
          >
            {({ open }) => {
              return (
                <Button onClick={() => open()} type="button" disabled={isImage}>
                  أرفع الصورة
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>
        {isImage || imageURL ? (
          <div className="max-w-[600px] flex flex-col gap-2">
            <Button
              variant={"destructive"}
              size={"icon"}
              className="mr-auto"
              onClick={() => {
                setIsImage(false);
                setImageURL("");
              }}
            >
              <Trash />
            </Button>
            <Image
              className="rounded-md"
              alt="image"
              src={imageURL as string}
              width={600}
              height={1000}
            />
          </div>
        ) : null}
        <Button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <Plus size={20} />
              <span className="text-lg font-bold">اضافة</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default MenuForm;
