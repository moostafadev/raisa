"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Eye, Pen, Trash } from "lucide-react";
import Spinner from "./Spinner";
import {
  deleteCategoryAction,
  deleteProductAction,
} from "@/actions/menu.action";

const TableActions = ({
  id,
  type,
}: {
  id?: string;
  type: "product" | "category";
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="flex gap-1 items-center">
      <Link href={`/admin/`}>
        <Button className="h-[30px] px-2 bg-teal-600 text-white hover:bg-teal-500">
          <Eye size={20} />
        </Button>
      </Link>
      <Link href={`/admin/`}>
        <Button className="h-[30px] px-2 bg-sky-600 text-white hover:bg-sky-500">
          <Pen size={20} />
        </Button>
      </Link>
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
    </div>
  );
};

export default TableActions;
