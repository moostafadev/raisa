"use client";

import Link from "next/link";
import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./ToggoleMode";
import Sidebar from "./Sidebar";
import Image from "next/image";

const Header = () => {
  const [display, setDisplay] = useState<boolean>(false);
  return (
    <>
      <header className="fixed top-0 left-0 flex items-center justify-center h-16 w-full border-b shadow-sm border-neutral-500 dark:border-neutral-800 bg-[hsl(var(--background)/.8)] backdrop-blur-sm z-20">
        <div className="w-full px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-8">
            <Link href="/admin/" onClick={() => setDisplay(false)}>
              <Image
                src={"/raisa.png"}
                alt="raisa image"
                width={120}
                height={60}
              />
            </Link>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <UserButton
              userProfileMode="navigation"
              userProfileUrl="/user-profile"
            />
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
      </header>
      <Sidebar Sidestate={display} setDisplay={setDisplay} />
    </>
  );
};

export default Header;
