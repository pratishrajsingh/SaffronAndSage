import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,

  reducers: {
    toggleFavorite: (state, action) => {
      const dish = action.payload;
      const exists = state.items.some((item) => item.id === dish.id);

      state.items = exists
        ? state.items.filter((item) => item.id !== dish.id)
        : [...state.items, dish];
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;

export const selectFavorites = (state) => state.favorites.items;
export const selectIsFavorite = (id) => (state) =>
  state.favorites.items.some((item) => item.id === id);

export default favoriteSlice.reducer;
