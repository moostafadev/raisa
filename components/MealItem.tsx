"use client";

import React, { useContext, useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { IMenu } from "@/interfaces";
import { CartContext } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createCartAction, updateCartAction } from "@/actions/menu.action";
import { Cart } from "@prisma/client";

interface CartItem {
  id: string;
  productId: string;
  qyt: number;
  email: string;
  username: string | null;
  phone: number | null;
  condition: boolean | null;
  address: {
    city: string;
    state: string;
    street: string;
    home: string;
    house: number;
  } | null;
}

const MealItem = ({
  item,
  cartUser,
}: {
  item: IMenu;
  cartUser: Cart | undefined;
}) => {
  const { isSignedIn, user } = useUser();
  const { cart, setCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();

  const createCart = async () => {
    if (user || isSignedIn) {
      if (cartUser) {
        const updatedCart = cart.map((cartItem) => {
          if (cartItem.id === cartUser.id) {
            return {
              ...cartItem,
              qyt: quantity,
            };
          }
          return cartItem;
        });
        setCart(updatedCart);
        await updateCartAction({
          id: cartUser.id,
          qyt: quantity,
        });
      } else {
        const newK: Cart = {
          id: "",
          productId: item.id,
          qyt: quantity,
          email: user.emailAddresses[0].emailAddress,
          username: null,
          phone: null,
          condition: null,
          address: {
            city: "",
            home: "",
            house: 0,
            state: "",
            street: "",
          },
        };
        await createCartAction(newK);
        setCart([...cart, newK]);
      }
    }
  };

  const onClickHandle = () => {
    if (isSignedIn) {
      createCart();
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
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between bg-white rounded-md">
          <Button onClick={() => setQuantity((prev) => prev + 1)}>
            <Plus />
          </Button>
          <span className="text-black text-lg font-bold">{quantity}</span>
          <Button
            onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            <Minus />
          </Button>
        </div>
        <Button
          className="w-full text-lg font-bold flex gap-2"
          onClick={onClickHandle}
        >
          <ShoppingBag />
          <span>أضافه</span>
        </Button>
      </div>
    </div>
  );
};

export default MealItem;
