import { getAllCategories } from "@/actions/menu.action";
import HeadingAdmin from "@/components/AdminHeading";
import MenuForm from "@/components/MenuForm";
import React from "react";

const page = async () => {
  const categories = await getAllCategories();
  return (
    <div>
      <HeadingAdmin title="أضافة أكلة" />
      <MenuForm categories={categories} />
    </div>
  );
};

export default page;
