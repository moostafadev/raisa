"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { CircleCheck, Eye, Pen, Trash } from "lucide-react";
import Spinner from "./Spinner";
import {
  deleteCartAction,
  deleteCategoryAction,
  deleteProductAction,
} from "@/actions/menu.action";

const TableActions = ({
  id,
  type,
}: {
  id?: string;
  type: "product" | "category" | "order";
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="flex gap-1 items-center">
      {type === "product" || type === "category" ? (
        <Link
          href={`/admin/${
            type === "product" ? `menu/edit/${id}` : `category/edit/${id}`
          }`}
        >
          <Button className="h-[30px] px-2 bg-sky-600 text-white hover:bg-sky-500">
            <Pen size={20} />
          </Button>
        </Link>
      ) : (
        <Link href={`/admin/orders/${id}`}>
          <Button className="h-[30px] px-2 bg-sky-600 text-white hover:bg-sky-500">
            <Eye size={20} />
          </Button>
        </Link>
      )}
      {type === "order" ? (
        <Button
          className="h-[30px] px-2 bg-green-600 text-white hover:bg-green-500"
          onClick={async () => {
            setIsLoading(true);
            if (id && type === "order") await deleteCartAction({ id });
            setIsLoading(false);
          }}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : <CircleCheck size={20} />}
        </Button>
      ) : (
        <Button
          className="h-[30px] px-2 bg-rose-600 text-white hover:bg-rose-500"
          onClick={async () => {
            setIsLoading(true);
            if (id && type === "product") await deleteProductAction({ id });
            if (id && type === "category") await deleteCategoryAction({ id });
            setIsLoading(false);
          }}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : <Trash size={20} />}
        </Button>
      )}
    </div>
  );
};

export default TableActions;
