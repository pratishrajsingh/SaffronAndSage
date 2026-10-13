import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store.js";
import ThemeProvider from "./context/ThemeProvider.jsx";
import UserProvider from "./context/UserProvider.jsx";
import CartProvider from "./context/CartProvider.jsx";
import App from "./App.jsx";

import "./styles/base.css";
import "./styles/components.css";
import "./styles/pages.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <UserProvider>
          <CartProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
