import React, { useContext, useState, useEffect, useCallback } from "react";
import { getItems } from "../api";
import { getTotal } from "../utils";

const CartContext = React.createContext({});

export const useCartContext = () => useContext(CartContext);


export function CartProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const synchronise = async () => {
    !isLoading && setIsLoading(true);
    setItems(await getItems());
    setIsLoading(false);
  };

  useEffect(() => {
    synchronise();
  });

  useEffect(() => {
    if (items && !items.length) return;
    sessionStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const reset = () => {
    sessionStorage.clear();
    synchronise();
  };

  const deleteItem = useCallback((id) => setItems((prevItems) => prevItems.filter((item) => item.id !== id)), [
    setItems,
  ]);

  const updateQuantity = useCallback(
    (id, quantity) => {
      const newItems = [...items];
      const selectedItem = newItems.find((item) => item.id === id);
      if (!selectedItem) return;
      selectedItem.quantity = quantity > 0 ? quantity : 0;
      setItems(newItems);
    },
    [items, setItems]
  );

  const getSummary = useCallback(() => getTotal(items), [items]);

  return (
    <CartContext.Provider value={{ isLoading, items, deleteItem, updateQuantity, total: getSummary(), reset }}>
      {children}
    </CartContext.Provider>
  );
}
