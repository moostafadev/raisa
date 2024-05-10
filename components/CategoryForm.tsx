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
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createCategoryAction } from "@/actions/menu.action";

const CategoryForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit({ title }: z.infer<typeof CategorySchema>) {
    setIsLoading(true);
    await createCategoryAction({
      title,
    });
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

export default CategoryForm;
