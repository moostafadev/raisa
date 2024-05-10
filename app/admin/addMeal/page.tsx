import { getAllCategoriesAction } from "@/actions/menu.action";
import HeadingAdmin from "@/components/AdminHeading";
import MenuForm from "@/components/MenuForm";
import React from "react";

const page = async () => {
  const categories = await getAllCategoriesAction();
  return (
    <div>
      <HeadingAdmin title="أضافة أكلة" />
      <MenuForm pattern="add" categories={categories} />
    </div>
  );
};

export default page;
