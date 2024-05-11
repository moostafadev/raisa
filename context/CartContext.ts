import { createContext } from "react";

interface CartContextType {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});
