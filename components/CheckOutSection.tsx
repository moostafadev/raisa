"use client";

import { getProductAction } from "@/actions/menu.action";
import { Cart, IMenu } from "@/interfaces";
import React, { useEffect, useState } from "react";
import CheckOutForm from "./CheckOutForm";

const CheckOutSection = ({ cart }: { cart: Cart[] }) => {
  const [meals, setMeals] = useState<IMenu[]>([]);

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
    let sum = 0;
    cart.forEach((item) => {
      const meal = meals.find((meal) => meal.id === item.productId);
      if (meal) {
        sum += (meal.price || 0) * (item.qyt || 0);
      }
    });
    return sum;
  };

  return (
    <div className="flex flex-col p-4 bg-zinc-100 rounded-md gap-2">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex flex-col p-4 bg-zinc-200 rounded-md gap-2"
        >
          <div className="flex justify-between">
            <p className="flex gap-2">
              <span>أسم الاكلة:</span>
              <span>{filteredMeals({ item: item as Cart })[0]?.title}</span>
            </p>
            <p>
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
            <p>
              <span>الحجم:</span>
              <span>{filteredMeals({ item: item as Cart })[0]?.size}</span>
            </p>
          </div>
        </div>
      ))}
      <div className="mr-auto bg-blue-800 rounded-md py-3 px-4 text-white text-lg flex gap-2 items-center w-fit">
        <span>الثمن الكلي:</span>
        <span className="text-xl font-bold">{sumPrices()} ريال</span>
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
