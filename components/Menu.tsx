import { IMenu } from "@/interfaces";
import React from "react";
import MealItem from "./MealItem";
import { currentUser } from "@clerk/nextjs/server";
import { getOneCartAction } from "@/actions/menu.action";
import { Cart } from "@prisma/client";

const Menu = async ({ products }: { products: IMenu[] }) => {
  const user = await currentUser();
  const cartData = user
    ? await getOneCartAction({
        email: user.emailAddresses[0].emailAddress,
      })
    : null;

  console.log(cartData);

  console.log(user);

  const cart: Cart | undefined = cartData ? cartData[0] : undefined;

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <h1 className="text-[#e58a25] text-4xl md:text-5xl font-bold text-center">
          المنيو
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map((item) => (
            <MealItem item={item} key={item.id} cartUser={cart} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
