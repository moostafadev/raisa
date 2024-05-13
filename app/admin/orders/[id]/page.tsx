import { getOneIdCartAction, getProductAction } from "@/actions/menu.action";
import HeadingAdmin from "@/components/AdminHeading";
import OrderSection from "@/components/OrderSection";
import { Cart, IMenu } from "@/interfaces";
import React from "react";

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = async ({ params }: PageProps) => {
  const [order] = await getOneIdCartAction({ id: params.id });
  const product = await getProductAction({ id: order?.productId });

  return (
    <div>
      <HeadingAdmin title={`الطلب بأسم ${order.username}`} />
      <OrderSection order={order as Cart} product={product as IMenu} />
    </div>
  );
};

export default page;
