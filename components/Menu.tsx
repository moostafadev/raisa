import { IMenu } from "@/interfaces";
import React from "react";
import MealItem from "./MealItem";
import ClientHeading from "./ClientHeading";

const Menu = async ({ products }: { products: IMenu[] }) => {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <ClientHeading title="المنيو" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((item) => (
            <MealItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
