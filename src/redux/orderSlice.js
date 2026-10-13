import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    placeOrder: {
      reducer: (state, action) => {
        state.items.unshift(action.payload);
      },
      prepare: (order) => ({
        payload: {
          ...order,
          id: `SS-${nanoid(6).toUpperCase()}`,
          status: "Preparing",
          placedAt: new Date().toISOString(),
        },
      }),
    },

    clearOrders: (state) => {
      state.items = [];
    },
  },
});

export const { placeOrder, clearOrders } = orderSlice.actions;

export const selectOrders = (state) => state.orders.items;

export default orderSlice.reducer;
