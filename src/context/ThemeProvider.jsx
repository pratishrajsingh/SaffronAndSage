import { useEffect } from "react";
import { ThemeContext } from "./contexts.js";
import useLocalStorage from "../hooks/useLocalStorage.js";

const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("ss-theme", prefersDark ? "dark" : "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
