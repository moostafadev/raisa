import { IMenu } from "@/interfaces";
import React from "react";
import MealItem from "./MealItem";
import { currentUser } from "@clerk/nextjs/server";

const Menu = async ({ products }: { products: IMenu[] }) => {
  const user = await currentUser();

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <h1 className="text-[#e58a25] text-4xl md:text-5xl font-bold text-center">
          المنيو
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map((item) => (
            <MealItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
