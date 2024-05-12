"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  CircleDollarSign,
  CookingPot,
  Flame,
  Minus,
  Plus,
  Salad,
  ShoppingBag,
  Utensils,
} from "lucide-react";
import { IMenu } from "@/interfaces";
import { CartContext } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  createCartAction,
  getOneCartAction,
  updateCartAction,
} from "@/actions/menu.action";
import { Cart } from "@prisma/client";
import Spinner from "./Spinner";

const MealItem = ({ item }: { item: IMenu }) => {
  const { isSignedIn, user } = useUser();
  const { cart, setCart } = useContext(CartContext);
  const [cartUser, setCartUser] = useState<Cart | null>(null);
  const [tmp, setTmp] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      if (user) {
        getOneCartAction({
          email: user.emailAddresses[0].emailAddress,
        }).then((res) => setCartUser(res[0]));
      }
    } catch (error) {
      console.log(error);
    }
  }, [setCartUser, user, tmp]);

  const createCart = async () => {
    if (user || isSignedIn) {
      setIsLoading(true);
      if (cartUser) {
        if (cart.length > 2) {
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
          console.log("doen");
          const newK: Cart = {
            id: "",
            productId: item.id,
            qyt: quantity,
            email: user.emailAddresses[0].emailAddress,
            username: null,
            phone: null,
            condition: null,
            address: {
              city: null,
              home: "",
              house: 0,
              state: "",
              street: "",
            },
          };
          await createCartAction({
            email: user.emailAddresses[0].emailAddress,
            productId: item.id,
            qyt: quantity,
          });
          setCart([...cart, newK]);
          setTmp((prev) => prev + 1);
        }
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
            city: null,
            home: "",
            house: 0,
            state: "",
            street: "",
          },
        };
        await createCartAction({
          email: user.emailAddresses[0].emailAddress,
          productId: item.id,
          qyt: quantity,
        });
        setCart([...cart, newK]);
        setTmp((prev) => prev + 1);
      }
      setIsLoading(false);
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
          <p className="flex items-center gap-[2px]">
            <Utensils size={22} />
            <span className="flex gap-1">
              <span className="text-base font-bold">الاسم:</span>
              <span className="text-lg font-extrabold">{item.title}</span>
            </span>
          </p>
          <p className="flex gap-[2px] items-center">
            <CircleDollarSign size={22} />
            <span className="flex gap-1">
              <span className="text-base font-bold">السعر:</span>
              <span className="text-lg font-extrabold text-blue-800">
                {item.price} ريال
              </span>
            </span>
          </p>
        </div>
        <div>
          <p className="flex gap-[2px] items-center">
            <CookingPot size={22} />
            <span className="flex gap-1">
              <span className="text-base font-bold">مكونات:</span>
              <span className="text-base font-semibold">{item.body}</span>
            </span>
          </p>
        </div>
        <div className="flex justify-between flex-col gap-4 sm:flex-row sm:gap-0">
          <p className="flex items-center gap-[2px]">
            <Salad size={22} />
            <span className="flex gap-1">
              <span className="text-base font-bold">الحجم:</span>
              <span className="font-semibold">{item.size}</span>
            </span>
          </p>
          <p className="flex items-center">
            <Flame size={22} />
            <span className="flex gap-1">
              <span className="text-base font-bold">السعرات:</span>
              <span className="font-semibold">{item.kcal} كالوري</span>
            </span>
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
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <ShoppingBag />
              <span>أضافه</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MealItem;
