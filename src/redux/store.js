import { configureStore } from "@reduxjs/toolkit";
import reservationReducer from "./reservationSlice.js";
import orderReducer from "./orderSlice.js";
import favoriteReducer from "./favoriteSlice.js";
import { readStorage } from "../hooks/useLocalStorage.js";

const STORAGE_KEY = "ss-redux-state";

const store = configureStore({
  reducer: {
    reservations: reservationReducer,
    orders: orderReducer,
    favorites: favoriteReducer,
  },
  preloadedState: readStorage(STORAGE_KEY, undefined),
});

// Persist reservations, orders and favorites between visits
store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
  } catch {
    // Ignore storage errors
  }
});

export default store;
