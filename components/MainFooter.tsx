"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MainFooter = () => {
  const pathName = usePathname();
  return (
    <div
      className={`bg-blue-800 dark:bg-blue-900 border-t border-white py-4 text-white ${
        pathName.startsWith("/admin") ? "mr-0 md:mr-[300px]" : ""
      }`}
    >
      <div className="container">
        <div className="text-center tracking-wider text-sm sm:text-base">
          جميع الحقوق محفوظة لدي{" "}
          <Link
            href={"https://mostafasasa010.github.io/Mostafa_Website"}
            target="_blank"
            className="sm:text-lg font-bold duration-300 hover:text-red-600"
          >
            Mostafa Ahmed
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
