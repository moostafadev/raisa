"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronUp } from "lucide-react";

const BtnTop = () => {
  const [scrollPosition, setScrollPosition] = useState(-100);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY > 500 ? 20 : -100;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 z-50 duration-300`}
      style={{ right: `${scrollPosition.toString()}px` }}
      onClick={() =>
        window.scrollTo({
          behavior: "smooth",
          top: 0,
        })
      }
    >
      <Button size={"icon"}>
        <ChevronUp />
      </Button>
    </div>
  );
};

export default BtnTop;
