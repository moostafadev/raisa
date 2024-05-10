import { getAllCategoriesAction } from "@/actions/menu.action";
import HeadingAdmin from "@/components/AdminHeading";
import { CategoryTable } from "@/components/CategoryTable";
import React from "react";

const page = async () => {
  const categories = await getAllCategoriesAction();
  return (
    <div>
      <HeadingAdmin title="الاقسام" />
      <CategoryTable categories={categories} />
    </div>
  );
};

export default page;
