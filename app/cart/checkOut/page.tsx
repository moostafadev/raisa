import { getOneCartAction } from "@/actions/menu.action";
import CheckOutSection from "@/components/CheckOutSection";
import ClientHeading from "@/components/ClientHeading";
import { Button } from "@/components/ui/button";
import { Cart } from "@/interfaces";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const page = async () => {
  const user = await currentUser();
  const cart = await getOneCartAction({
    email: user?.emailAddresses[0].emailAddress as string,
  });
  console.log(cart);

  return (
    <div className="container py-10">
      <ClientHeading title="مرحلة الدفع" />
      <div className="flex flex-col gap-4">
        <Link href={"/cart"} className="w-fit mr-auto flex">
          <Button className="text-lg font-bold">رجوع</Button>
        </Link>
        <CheckOutSection cart={cart as Cart[]} />
      </div>
    </div>
  );
};

export default page;
