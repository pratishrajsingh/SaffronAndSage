import { useContext } from "react";
import { ThemeContext, UserContext, CartContext } from "../context/contexts.js";

function useRequiredContext(context, name) {
  const value = useContext(context);
  if (!value) {
    throw new Error(`${name} must be used inside its provider.`);
  }
  return value;
}

export const useTheme = () => useRequiredContext(ThemeContext, "useTheme");
export const useUser = () => useRequiredContext(UserContext, "useUser");
export const useCart = () => useRequiredContext(CartContext, "useCart");
