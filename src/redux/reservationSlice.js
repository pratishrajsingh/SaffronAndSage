import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const reservationSlice = createSlice({
  name: "reservations",
  initialState,

  reducers: {
    // Create
    addReservation: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (reservation) => ({
        payload: {
          ...reservation,
          id: nanoid(8),
          status: "confirmed",
          createdAt: new Date().toISOString(),
        },
      }),
    },

    // Update
    updateReservation: (state, action) => {
      const { id, changes } = action.payload;
      const reservation = state.items.find((item) => item.id === id);

      if (reservation) {
        Object.assign(reservation, changes);
      }
    },

    cancelReservation: (state, action) => {
      const reservation = state.items.find((item) => item.id === action.payload);

      if (reservation) {
        reservation.status = "cancelled";
      }
    },

    // Delete
    deleteReservation: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  addReservation,
  updateReservation,
  cancelReservation,
  deleteReservation,
} = reservationSlice.actions;

// Read
export const selectReservations = (state) => state.reservations.items;

export default reservationSlice.reducer;
