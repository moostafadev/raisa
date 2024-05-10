import HeadingAdmin from "@/components/AdminHeading";
import CategoryForm from "@/components/CategoryForm";
import React from "react";

const page = () => {
  return (
    <div>
      <HeadingAdmin title="أضافة قسم" />
      <CategoryForm />
    </div>
  );
};

export default page;
