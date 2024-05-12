"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "./ui/button";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "./ToggoleMode";
import Image from "next/image";
import { CartContext } from "@/context/CartContext";
import { getOneCartAction } from "@/actions/menu.action";

interface INavData {
  name: string;
  link: string;
}

const HeaderClient = () => {
  const { user } = useUser();
  const { cart, setCart } = useContext(CartContext);
  const [display, setDisplay] = useState<boolean>(false);
  const navData: INavData[] = [
    {
      name: "المنيو",
      link: "/menu",
    },
  ];

  useEffect(() => {
    try {
      if (user) {
        getOneCartAction({
          email: user?.emailAddresses[0].emailAddress as string,
        }).then((res) => setCart(res));
      }
    } catch (error) {
      console.log(error);
    }
  }, [setCart, user]);

  return (
    <header className="relative flex items-center justify-center h-16 border-b shadow-sm border-neutral-500 dark:border-neutral-800 border-opacity-20">
      <div className="container flex items-center justify-between gap-2">
        <div className="flex items-center gap-16">
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
              <li key={idx} className="text-blue-800 dark:text-white text-xl">
                <Link
                  href={{ pathname: item.link }}
                  className="block px-2 font-bold hover:underline"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {user?.publicMetadata?.role === "admin" ? (
              <li className="text-xl">
                <Link
                  href={"/admin"}
                  className="block px-2 font-bold hover:underline text-red-600"
                >
                  لوحة التحكم
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="flex items-center gap-[2px] sm:gap-6">
          {user?.publicMetadata?.role === "admin" ? (
            <div className="ml-2 flex items-center justify-center">
              <UserButton />
            </div>
          ) : !user ? (
            <>
              <Link href={"/sign-in"} className="hidden md:block">
                <Button
                  className={`p-[6px] sm:p-2 sm:text-base sm:font-bold`}
                  variant={"outline"}
                >
                  تسجيل دخول
                </Button>
              </Link>
            </>
          ) : (
            <SignOutButton signOutOptions={{ redirectUrl: "/" }}>
              <Button
                variant={"destructive"}
                className="text-lg hidden md:flex items-center"
                onClick={() => window.location.replace("/")}
              >
                تسجيل خروج
              </Button>
            </SignOutButton>
          )}

          <Link href={"/cart"} className="relative">
            <ShoppingBag size={30} />
            <span className="absolute top-[-14px] right-[-8px] bg-red-500 bg-opacity-95 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-semibold">
              {cart.length}
            </span>
          </Link>
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
            <li key={idx} className="text-white text-xl">
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
                className="block p-4 text-white text-xl font-bold hover:underline duration-300"
              >
                لوحة التحكم
              </Link>
            </li>
          ) : !user ? (
            <>
              <Link href={"/admin"}>
                <Button
                  className={`p-[6px] sm:p-2 sm:text-base sm:font-bold`}
                  variant={"outline"}
                >
                  تسجيل دخول
                </Button>
              </Link>
            </>
          ) : (
            <li>
              <SignOutButton signOutOptions={{ redirectUrl: "/" }}>
                <Button
                  variant={"destructive"}
                  className="text-lg flex items-center mx-auto"
                  onClick={() => window.location.replace("/")}
                >
                  تسجيل خروج
                </Button>
              </SignOutButton>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default HeaderClient;
