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
import { CategorySchema } from "@/schema";
import { useForm } from "react-hook-form";
import Spinner from "./Spinner";
import { Pen, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  createCategoryAction,
  updateCategoryAction,
} from "@/actions/menu.action";

interface IProp {
  id?: string;
  title?: string;
  pattern: "add" | "edit";
}

const CategoryForm = ({ id, title, pattern }: IProp) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      title,
    },
  });

  async function onSubmit({ title }: z.infer<typeof CategorySchema>) {
    setIsLoading(true);
    if (pattern === "add") await createCategoryAction({ title });
    if (pattern === "edit" && id) await updateCategoryAction({ title, id });
    setIsLoading(false);
    router.push("/admin/category");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">أسم القسم*</FormLabel>
              <FormControl>
                <Input
                  className="text-base max-w-[600px]"
                  placeholder="أسم القسم"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                هذا ألاسم القسم الذي ينتمي اليه الوجبات
              </FormDescription>
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
          ) : pattern === "add" ? (
            <>
              <Plus size={20} />
              <span className="text-lg font-bold">اضافة</span>
            </>
          ) : (
            <>
              <Pen size={18} />
              <span className="text-lg font-bold">تعديل</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
