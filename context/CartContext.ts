import { Cart } from "@prisma/client";
import { Dispatch, SetStateAction, createContext } from "react";

interface CartContextType {
  cart: Cart[];
  setCart: Dispatch<SetStateAction<Cart[]>>;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});
