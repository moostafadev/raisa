import { getAllProductsAction } from "@/actions/menu.action";
import HeadingAdmin from "@/components/AdminHeading";
import { MenuTable } from "@/components/MenuTable";
import React from "react";

const page = async () => {
  const products = await getAllProductsAction();
  return (
    <div>
      <HeadingAdmin title="المنيو" />
      <MenuTable products={products} />
    </div>
  );
};

export default page;
