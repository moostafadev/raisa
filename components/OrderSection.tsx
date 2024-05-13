"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Cart, IMenu } from "@/interfaces";
import { deleteCartAction } from "@/actions/menu.action";
import { CircleCheck, Trash } from "lucide-react";
import Spinner from "./Spinner";

const OrderSection = ({ order, product }: { order: Cart; product: IMenu }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-4 p-4 bg-zinc-100 rounded-md max-w-[800px]">
      <div className="flex flex-col gap-2 lg:justify-between lg:gap-1 lg:flex-row">
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
          className="h-[30px] px-2 bg-green-600 text-white hover:bg-green-500"
          onClick={async () => {
            setIsLoading(true);
            if (order?.id) await deleteCartAction({ id: order?.id as string });
            setIsLoading(false);
          }}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : <CircleCheck size={20} />}
        </Button>
      </div>
    </div>
  );
};

export default OrderSection;
