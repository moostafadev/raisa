"use client";

import { getDeliveryAction, getProductAction } from "@/actions/menu.action";
import { Cart, IMenu } from "@/interfaces";
import React, { useEffect, useState } from "react";
import CheckOutForm from "./CheckOutForm";

const CheckOutSection = ({ cart }: { cart: Cart[] }) => {
  const [meals, setMeals] = useState<IMenu[]>([]);
  const [delivery, setDelivery] = useState<
    { available: "YES" | "NO"; id: string; price: number | null }[]
  >([]);

  useEffect(() => {
    setMeals([]);
    cart.forEach(async (item) => {
      try {
        const res = await getProductAction({ id: item.productId });
        setMeals((prev) => [...prev, res as IMenu]);
      } catch (error) {
        console.log(error);
      }
    });
    try {
      getDeliveryAction().then((res) => setDelivery(res));
    } catch (error) {
      console.log(error);
    }
  }, [cart]);

  const filteredMeals = ({ item }: { item: Cart }) => {
    return meals.filter((meal) => meal.id === item?.productId);
  };

  const filteredMealsTo = () => {
    const filteredMeals = cart.flatMap((item) => {
      return meals.filter((meal) => meal.id === item.productId);
    });
    return filteredMeals;
  };

  const idiesCart = () => {
    return cart.map((item) => item.id);
  };

  const sumPrices = () => {
    let notD = 0;
    let sum = 0;
    cart.forEach((item) => {
      const meal = meals.find((meal) => meal.id === item.productId);
      if (meal) {
        sum += (meal.price || 0) * (item.qyt || 0);
        notD += (meal.price || 0) * (item.qyt || 0);
      }
    });
    delivery[0]?.available === "YES"
      ? (sum += delivery[0]?.price as number)
      : null;
    return { sum, notD };
  };

  return (
    <div className="flex flex-col p-4 bg-zinc-100 dark:bg-zinc-900 rounded-md gap-2">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex flex-col p-4 bg-zinc-200 dark:bg-zinc-950 rounded-md gap-2 sm:text-lg"
        >
          <div className="flex justify-between flex-col gap-2 sm:flex-row sm:gap-0">
            <p className="flex gap-2">
              <span>أسم الاكلة:</span>
              <span>{filteredMeals({ item: item as Cart })[0]?.title}</span>
            </p>
            <p className="flex gap-2">
              <span>السعر الكلي:</span>
              <span>
                {filteredMeals({ item: item as Cart })[0]?.price *
                  (item.qyt as number)}{" "}
                ريال
              </span>
            </p>
          </div>
          <div className="flex justify-between">
            <p className="flex gap-2">
              <span>الكمية:</span>
              <span>{item.qyt}</span>
            </p>
            <p className="flex gap-2">
              <span>الحجم:</span>
              <span>{filteredMeals({ item: item as Cart })[0]?.size}</span>
            </p>
          </div>
        </div>
      ))}
      <div className="mr-auto bg-blue-800 rounded-md">
        {delivery[0]?.available === "YES" ? (
          <>
            <div className="rounded-md py-2 px-3 sm:py-3 sm:px-4 text-white text-base sm:text-lg flex gap-2 items-center w-fit">
              <span>سعر الطلب:</span>
              <span className="text-lg sm:text-xl font-bold">
                {sumPrices().notD} ريال
              </span>
            </div>
            <div className="rounded-md py-2 px-3 sm:py-3 sm:px-4 text-white text-base sm:text-lg flex gap-2 items-center w-fit">
              <span>سعر التوصيل:</span>
              <span className="text-lg sm:text-xl font-bold">
                {delivery[0]?.price} ريال
              </span>
            </div>
          </>
        ) : null}
        <div className="rounded-md py-2 px-3 sm:py-3 sm:px-4 text-white text-base sm:text-lg flex gap-2 items-center w-fit">
          <span>الثمن الكلي:</span>
          <span className="text-lg sm:text-xl font-bold">
            {sumPrices().sum} ريال
          </span>
        </div>
      </div>
      <CheckOutForm
        id={idiesCart() as string[]}
        cart={cart as Cart[]}
        meals={filteredMealsTo() as IMenu[]}
      />
    </div>
  );
};

export default CheckOutSection;
