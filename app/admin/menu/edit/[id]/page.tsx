import {
  getAllCategoriesAction,
  getProductAction,
} from "@/actions/menu.action";
import HeadingAdmin from "@/components/AdminHeading";
import MenuForm from "@/components/MenuForm";
import React from "react";

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = async ({ params, searchParams }: PageProps) => {
  const product = await getProductAction({ id: params.id });
  const categories = await getAllCategoriesAction();
  return (
    <div>
      <HeadingAdmin title={`تعديل علي اكلة ${product?.title}`} />
      <MenuForm
        pattern="edit"
        categories={categories}
        id={product?.id}
        title={product?.title}
        body={product?.body as string}
        price={product?.price as number}
        size={product?.size as string}
        kcal={product?.kcal as number}
        image={product?.image as string}
        categoryId={product?.categoryId as string}
      />
    </div>
  );
};

export default page;
