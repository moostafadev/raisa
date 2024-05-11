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
import { DeliverySchema } from "@/schema";
import { useForm } from "react-hook-form";
import Spinner from "./Spinner";
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import { UpdateDeliveryAction } from "@/actions/menu.action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface IProp {
  id: string;
  available: "NO" | "YES";
  price?: number | null;
}

const DelivaryForm = ({ id, available, price }: IProp) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof DeliverySchema>>({
    resolver: zodResolver(DeliverySchema),
    defaultValues: {
      available,
      price,
    },
  });

  async function onSubmit({
    available,
    price,
  }: z.infer<typeof DeliverySchema>) {
    setIsLoading(true);
    await UpdateDeliveryAction({
      id,
      available,
      price,
    });
    setIsLoading(false);
    router.push("/admin");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">القسم</FormLabel>
              <Select
                value={field.value ?? ""}
                onValueChange={(value: string) => field.onChange(value)}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px] text-base">
                    <SelectValue placeholder="الرسوم" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="NO">مجاناً</SelectItem>
                  <SelectItem value="YES">مدفوع</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues("available") === "YES" ? (
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-bold">
                  رسوم التوصيل
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-base max-w-[180px]"
                    placeholder="رسوم التوصيل"
                    type="number"
                    value={form.getValues("price") ?? 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = parseFloat(e.target.value);
                      form.setValue("price", isNaN(value) ? 0 : value);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  سعر خدمة التوصيل يكون{" "}
                  {form.getValues("price") ? form.getValues("price") : 0} ريال
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
              <Pen size={18} />
              <span className="text-lg font-bold">تعديل</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default DelivaryForm;
