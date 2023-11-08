import { createContext } from "react";

export const CartConetxt = createContext({
  items: [],
  addItemToCart: () => {},
});
