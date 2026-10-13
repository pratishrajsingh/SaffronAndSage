import { useEffect, useReducer } from "react";
import { CartContext } from "./contexts.js";
import { cartReducer, initialCartState, CART_ACTIONS } from "../reducers/cartReducer.js";
import { readStorage } from "../hooks/useLocalStorage.js";

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, (initial) =>
    readStorage("ss-cart", initial)
  );

  useEffect(() => {
    localStorage.setItem("ss-cart", JSON.stringify(state));
  }, [state]);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    items: state.items,
    totalItems,
    subtotal,
    addItem: (dish, quantity = 1) =>
      dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { dish, quantity } }),
    removeItem: (id) => dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: id }),
    increase: (id) => dispatch({ type: CART_ACTIONS.INCREASE, payload: id }),
    decrease: (id) => dispatch({ type: CART_ACTIONS.DECREASE, payload: id }),
    clearCart: () => dispatch({ type: CART_ACTIONS.CLEAR }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
