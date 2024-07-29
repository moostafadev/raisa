"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Cart, IMenu } from "@/interfaces";
import { deleteCartAction } from "@/actions/menu.action";
import { CircleCheck } from "lucide-react";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

const OrderSection = ({ order, product }: { order: Cart; product: IMenu }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-md max-w-[800px]">
      <div className="flex flex-col gap-4 lg:justify-between lg:gap-1 lg:flex-row">
        <p className="flex gap-1">
          <span>رقم الطلب:</span>
          <span className="text-base font-bold">{order?.id}</span>
        </p>
        <p className="flex gap-1">
          <span>الأسم:</span>
          <span className="text-base font-bold">{order?.username}</span>
        </p>
        <p className="flex gap-1">
          <span>رقم الهاتف:</span>
          <span className="text-base font-bold">{order?.phone}</span>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">العنوان:</h2>
        <div className="flex flex-col gap-2 lg:justify-between lg:gap-1 lg:flex-row">
          <p className="flex gap-1">
            <span>المدينه:</span>
            <span className="text-base font-bold">
              {order?.address?.city === "Abha" ? "أبها" : "الرياض"}
            </span>
          </p>
          <p className="flex gap-1">
            <span>الحي:</span>
            <span className="text-base font-bold">{order?.address?.state}</span>
          </p>
          <p className="flex gap-1">
            <span>الشارع:</span>
            <span className="text-base font-bold">
              {order?.address?.street}
            </span>
          </p>
          <p className="flex gap-1">
            <span>العمارة:</span>
            <span className="text-base font-bold">{order?.address?.home}</span>
          </p>
          <p className="flex gap-1">
            <span>البيت:</span>
            <span className="text-base font-bold">{order?.address?.house}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">تفاصيل الطلب:</h2>

        <div className="flex flex-col gap-2 lg:justify-between lg:gap-1 lg:flex-row">
          <p className="flex gap-1">
            <span>أسم الوجبة:</span>
            <span className="text-base font-bold">{product?.title}</span>
          </p>
          <p className="flex gap-1">
            <span>الحجم:</span>
            <span className="text-base font-bold">{product?.size}</span>
          </p>
          <p className="flex gap-1">
            <span>الكمية:</span>
            <span className="text-base font-bold">{order?.qyt}</span>
          </p>
        </div>
        <div>
          <p className="flex gap-1">
            <span>القسم:</span>
            <span className="text-base font-bold">
              {product?.category?.title}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:justify-between lg:gap-1 lg:flex-row">
          <p className="flex gap-1">
            <span>سعر الواحدة:</span>
            <span className="text-base font-bold">{product?.price} ريال</span>
          </p>
          <p className="flex gap-1">
            <span>السعر الكلي:</span>
            <span className="text-base font-bold">
              {(product?.price as number) * (order?.qyt as number)} ريال
            </span>
          </p>
          <Button
            className="h-[30px] px-2 bg-green-600 text-white hover:bg-green-500 w-fit"
            onClick={async () => {
              setIsLoading(true);
              if (order?.id) {
                await deleteCartAction({ id: order?.id as string });
                router.back();
              }
              setIsLoading(false);
            }}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : <CircleCheck size={20} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSection;
