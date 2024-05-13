import {
  getAllCartConditionAction,
  getAllProductsAction,
} from "@/actions/menu.action";
import HeadingAdmin from "@/components/AdminHeading";
import { OrderTable } from "@/components/OrderTable";
import { Cart } from "@/interfaces";
import React from "react";

const page = async () => {
  const products = await getAllProductsAction();
  const orders = await getAllCartConditionAction({ condition: true });
  return (
    <div>
      <HeadingAdmin title="الطلبات" />
      <OrderTable products={products} orders={orders as Cart[]} />
    </div>
  );
};

export default page;
