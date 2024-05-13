import { Category, IMenu } from "@/interfaces";
import React from "react";
import MealItem from "./MealItem";
import ClientHeading from "./ClientHeading";

const Menu = async ({
  products,
  categories,
}: {
  products: IMenu[];
  categories: Category[];
}) => {
  return (
    <div className="container py-10">
      <div className="flex flex-col">
        <ClientHeading title="المنيو" />
        <div className="flex flex-col gap-8">
          {categories?.map((category) => (
            <div className="flex flex-col gap-2" key={category?.id}>
              <ClientHeading
                title={category?.title}
                className="ml-auto mr-0 mb-5"
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {category?.products?.map((item) => (
                  <MealItem item={item} key={item?.id} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
