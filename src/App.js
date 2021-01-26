import React from "react";

import Header from "./components/header/header.component";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./components/cart/cart.component";
import CartSummary from "./components/cart-summary/cart-summary.component";

import "./App.scss";

function App() {
  const styles = {
    wrapper: "shopping_cart-wrapper",
  };
  return (
    <CartProvider>
      <Header />
      <div data-testid="app" className={styles.wrapper}>
        <Cart />
        <CartSummary />
      </div>
    </CartProvider>
  );
}

export default App;