import { useState } from "react";

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import { CartConetxtProvider } from "../store/shopping-cart-context.jsx";
function App() {
  

  return (
    <>
      <CartConetxtProvider>
        <Header
        />
        <Shop  />
      </CartConetxtProvider>
    </>
  );
}

export default App;
