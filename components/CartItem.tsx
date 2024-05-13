import {
  Utensils,
  CircleDollarSign,
  CookingPot,
  Salad,
  Flame,
  Plus,
  Minus,
  ShoppingBag,
  Trash,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Cart, IMenu } from "@/interfaces";
import { deleteCartAction, updateCartAction } from "@/actions/menu.action";
import Spinner from "./Spinner";
import { CartContext } from "@/context/CartContext";

const CartItem = ({ item, meal }: { item: Cart; meal: IMenu }) => {
  const { cart, setCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(item.qyt);
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  useEffect(() => {
    setPrice(meal?.price * (item.qyt as number));
  }, [item.qyt, meal?.price]);

  const handleClickEdit = async () => {
    setIsLoading(true);
    await updateCartAction({
      id: item?.id as string,
      qyt: quantity,
    });
    setPrice(meal?.price * (quantity as number));
    setIsLoading(false);
  };

  if (Number.isNaN(price)) return;

  return (
    <div className="flex flex-col">
      <Button
        className="mr-auto rounded-b-none"
        variant={"destructive"}
        size={"icon"}
        onClick={async () => {
          setIsLoadingDelete(true);
          await deleteCartAction({ id: item?.id as string });
          const filterCart = cart.filter((c) => c.id !== item?.id);
          setCart(filterCart);
          setIsLoadingDelete(false);
        }}
      >
        {isLoadingDelete ? <Spinner /> : <Trash />}
      </Button>
      <div className="px-4 py-3 bg-zinc-100 dark:bg-zinc-900 rounded-md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 sm:justify-between">
            <p className="flex items-center gap-[2px]">
              <Utensils size={22} />
              <span className="flex gap-1">
                <span className="text-base font-bold">الاسم:</span>
                <span className="text-lg font-extrabold">{meal?.title}</span>
              </span>
            </p>
            <p className="flex gap-[2px] items-center">
              <CircleDollarSign size={22} />
              <span className="flex gap-1">
                <span className="text-base font-bold">السعر:</span>
                <span className="text-lg font-extrabold text-blue-800">
                  {meal?.price} ريال
                </span>
              </span>
            </p>
            {(item?.qyt as number) > 1 ? (
              <p className="flex gap-[2px] items-center sm:hidden">
                <CircleDollarSign size={22} />
                <span className="flex gap-1">
                  <span className="text-base font-bold">السعر الكلي: </span>
                  <span className="text-lg font-extrabold text-blue-800">
                    {meal?.price * (item?.qyt as number)} ريال
                  </span>
                </span>
              </p>
            ) : null}
          </div>
          <div className="flex justify-between">
            <p className="flex gap-[2px] items-center">
              <CookingPot size={22} />
              <span className="flex gap-1">
                <span className="text-base font-bold">مكونات:</span>
                <span className="text-base font-semibold">{meal?.body}</span>
              </span>
            </p>
            {(item?.qyt as number) > 1 ? (
              <p className="hidden gap-[2px] items-center sm:flex">
                <CircleDollarSign size={22} />
                <span className="flex gap-1">
                  <span className="text-base font-bold">السعر الكلي: </span>
                  <span className="text-lg font-extrabold text-blue-800">
                    {Number.isNaN(price) ? "00" : price} ريال
                  </span>
                </span>
              </p>
            ) : null}
          </div>
          <div className="flex justify-between flex-col gap-4 sm:flex-row sm:gap-0">
            <p
              className={`flex items-center gap-[2px] ${
                (quantity as number) * meal?.price !== price &&
                !Number.isNaN(price)
                  ? "sm:self-start"
                  : ""
              }`}
            >
              <Salad size={22} />
              <span className="flex gap-1">
                <span className="text-base font-bold">الحجم:</span>
                <span className="font-semibold">{meal?.size}</span>
              </span>
            </p>
            <p
              className={`flex items-center ${
                (quantity as number) * meal?.price !== price &&
                !Number.isNaN(price)
                  ? "sm:self-start"
                  : ""
              }`}
            >
              <Flame size={22} />
              <span className="flex gap-1">
                <span className="text-base font-bold">السعرات:</span>
                <span className="font-semibold">{meal?.kcal} كالوري</span>
              </span>
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between bg-white rounded-md">
                <Button
                  onClick={() => setQuantity((prev) => (prev as number) + 1)}
                >
                  <Plus />
                </Button>
                <span className="text-black text-lg font-bold block px-4">
                  {quantity}
                </span>
                <Button
                  onClick={() =>
                    setQuantity((prev) =>
                      (prev as number) > 1 ? (prev as number) - 1 : 1
                    )
                  }
                >
                  <Minus />
                </Button>
              </div>
              {(quantity as number) * meal?.price !== price &&
              !Number.isNaN(price) ? (
                <Button
                  className="w-full text-lg font-bold flex gap-2"
                  onClick={handleClickEdit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                    </>
                  ) : (
                    <>
                      <ShoppingBag />
                      <span>تعديل</span>
                    </>
                  )}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
