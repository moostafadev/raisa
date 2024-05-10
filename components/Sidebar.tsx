"use client";

import {
  LineChart,
  Newspaper,
  Plus,
  Soup,
  TableProperties,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

interface IProp {
  Sidestate: boolean;
  setDisplay: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ Sidestate, setDisplay }: IProp) => {
  const pathname = usePathname();

  const linkStyle = "flex items-center gap-2 p-4 pl-0";
  const activeClassName =
    "text-white bg-blue-800 dark:bg-blue-950 rounded-r-lg";

  return (
    <aside
      className={`w-full md:w-[300px] h-[calc(100%-64px)] fixed bottom-0 ${
        Sidestate ? "right-0" : "right-[-100%]"
      } md:right-0 border-l shadow-sm border-neutral-500 dark:border-neutral-800 backdrop-blur-sm duration-300 md:bg-zinc-100 md:dark:bg-zinc-900 z-10`}
    >
      <ul className="py-4 pr-4">
        <li>
          <Link
            href={"/admin/"}
            className={`${linkStyle} ${
              pathname === "/admin" ? activeClassName : ""
            }`}
            onClick={() => setDisplay(false)}
          >
            <LineChart />
            <span className="font-bold">لوحة التحكم</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/admin/menu/"}
            className={`${linkStyle} ${
              pathname.startsWith("/admin/menu") ? activeClassName : ""
            }`}
            onClick={() => setDisplay(false)}
          >
            <Newspaper />
            <span className="font-bold">المنيو</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/admin/category/"}
            className={`${linkStyle} ${
              pathname.startsWith("/admin/category") ? activeClassName : ""
            }`}
            onClick={() => setDisplay(false)}
          >
            <TableProperties />
            <span className="font-bold">الاقسام</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/admin/addMeal/"}
            className={`${linkStyle} ${
              pathname.startsWith("/admin/addMeal") ? activeClassName : ""
            }`}
            onClick={() => setDisplay(false)}
          >
            <Soup />
            <span className="font-bold">أضافة أكله</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/admin/addCategory/"}
            className={`${linkStyle} ${
              pathname.startsWith("/admin/addCategory") ? activeClassName : ""
            }`}
            onClick={() => setDisplay(false)}
          >
            <Plus />
            <span className="font-bold">أضافة قسم</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
