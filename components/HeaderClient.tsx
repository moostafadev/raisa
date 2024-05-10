"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "./ToggoleMode";
import Image from "next/image";

interface INavData {
  name: string;
  link: string;
}

const HeaderClient = () => {
  const { user } = useUser();
  const [display, setDisplay] = useState<boolean>(false);
  const navData: INavData[] = [
    {
      name: "المنيو",
      link: "/menu",
    },
  ];

  return (
    <header className="relative flex items-center justify-center h-16 border-b shadow-sm border-neutral-500 dark:border-neutral-800 border-opacity-20">
      <div className="container flex items-center justify-between gap-2">
        <div className="flex items-center gap-8">
          <Link href="/" onClick={() => setDisplay(false)}>
            <Image
              src={"/raisa.png"}
              alt="raisa image"
              width={120}
              height={60}
            />
          </Link>
          <ul className="hidden md:flex text-center">
            {navData.map((item: INavData, idx: number) => (
              <li key={idx}>
                <Link
                  href={{ pathname: item.link }}
                  className="block px-2 font-bold hover:underline"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {user?.publicMetadata?.role === "admin" ? (
              <li>
                <Link
                  href={"/admin"}
                  className="block px-2 font-bold hover:underline"
                >
                  لوحة التحكم
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {user?.publicMetadata?.role === "admin" ? (
            <>
              <UserButton />
            </>
          ) : !user ? (
            <>
              <Link href={"/admin"}>
                <Button
                  className={`md:hidden p-[6px] sm:p-2`}
                  variant={"outline"}
                >
                  سجل كمسئول
                </Button>
              </Link>
            </>
          ) : null}
          <ModeToggle />
          <Button
            className={`md:hidden p-[6px] sm:p-2`}
            variant={"ghost"}
            onClick={() => setDisplay(display === false ? true : false)}
          >
            {display ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      <div
        className={`md:hidden flex justify-center absolute top-16 ${
          display ? "left-0" : "left-[100%]"
        } w-full h-[calc(100vh-64px)] backdrop-blur-sm duration-300 overflow-hidden`}
      >
        <ul className="w-full py-4 px-3 text-center">
          {navData.map((item: INavData, idx: number) => (
            <li key={idx}>
              <Link
                href={{ pathname: item.link }}
                className="block p-4 text-xl font-bold hover:underline duration-300"
                onClick={() => setDisplay(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
          {user?.publicMetadata?.role === "admin" ? (
            <li>
              <Link
                href={"/admin"}
                className="block p-4 text-xl font-bold hover:underline duration-300"
              >
                لوحة التحكم
              </Link>
            </li>
          ) : (
            <li>
              <Link
                href={"/admin"}
                className="block p-4 text-xl font-bold hover:underline duration-300"
              >
                <Button variant={"destructive"} className="text-lg">
                  <SignOutButton />
                </Button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default HeaderClient;
