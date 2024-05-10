import { getCategoryAction } from "@/actions/menu.action";
import HeadingAdmin from "@/components/AdminHeading";
import CategoryForm from "@/components/CategoryForm";
import React from "react";

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = async ({ params, searchParams }: PageProps) => {
  const category = await getCategoryAction({ id: params.id });
  return (
    <div>
      <HeadingAdmin title={`تعديل علي قسم ${category?.title}`} />
      <CategoryForm pattern="edit" id={category?.id} title={category?.title} />
    </div>
  );
};

export default page;
