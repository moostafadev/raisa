import {
  getCategoryAction,
  getDeliveryAction,
  getOneDeliveryAction,
} from "@/actions/menu.action";
import HeadingAdmin from "@/components/AdminHeading";
import CategoryForm from "@/components/CategoryForm";
import DelivaryForm from "@/components/DelivaryForm";
import React from "react";

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = async ({ params, searchParams }: PageProps) => {
  const delivary = await getOneDeliveryAction({ id: params.id });
  return (
    <div>
      <HeadingAdmin title={`تعديل علي خدمة التوصيل`} />
      <DelivaryForm
        id={delivary[0].id}
        available={delivary[0].available}
        price={delivary[0].price}
      />
    </div>
  );
};

export default page;
