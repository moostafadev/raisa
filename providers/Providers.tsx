"use client";

import { CartContext } from "@/context/CartContext";
import { arSA } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React, { ReactNode, useState } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState([]);
  return (
    <>
      <ClerkProvider
        localization={arSA}
        appearance={{
          baseTheme: dark,
        }}
      >
        <CartContext.Provider value={{ cart, setCart }}>
          {children}
        </CartContext.Provider>
      </ClerkProvider>
    </>
  );
};

export default Providers;
