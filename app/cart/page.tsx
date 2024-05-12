import CartSection from "@/components/CartSection";
import ClientHeading from "@/components/ClientHeading";
import React from "react";

const page = () => {
  return (
    <div className="container py-10">
      <ClientHeading title="الطلب" />
      <CartSection />
    </div>
  );
};

export default page;
