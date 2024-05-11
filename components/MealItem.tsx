"use client";

import React, { useContext } from "react";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { IMenu } from "@/interfaces";
import { CartContext } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const MealItem = ({ item }: { item: IMenu }) => {
  const { isSignedIn } = useUser();
  const { cart, setCart } = useContext(CartContext);
  const router = useRouter();

  const onClickHandle = () => {
    if (isSignedIn) {
      setCart([...cart, item.id]);
    } else {
      router.push("/sign-in");
    }
  };
  return (
    <div className="flex flex-col gap-4 py-3 px-4 bg-[#ff9800] text-white rounded-md duration-300 hover:scale-105 hover:bg-[#e58a25]">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="flex gap-1">
            <span className="text-base font-bold">الاسم:</span>
            <span className="text-base font-semibold">{item.title}</span>
          </p>
          <p className="flex gap-1">
            <span className="text-base font-bold">السعر:</span>
            <span className="text-base font-semibold">{item.price} ريال</span>
          </p>
        </div>
        <div>
          <p className="flex gap-1">
            <span className="text-base font-bold">مكونات:</span>
            <span className="text-base font-semibold">{item.body}</span>
          </p>
        </div>
        <div className="flex justify-between">
          <p className="flex gap-1">
            <span className="text-base font-bold">الحجم:</span>
            <span className="font-semibold">{item.size}</span>
          </p>
          <p className="flex gap-1">
            <span className="text-base font-bold">السعرات:</span>
            <span className="font-semibold">{item.kcal} كالوري</span>
          </p>
        </div>
      </div>
      <Button
        className="w-full text-lg font-bold flex gap-2"
        onClick={onClickHandle}
      >
        <ShoppingBag />
        <span>أضافه</span>
      </Button>
    </div>
  );
};

export default MealItem;
