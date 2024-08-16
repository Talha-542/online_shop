import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    },
    clearCart: (state) => {
      return {
        ...state,
        items: [],
      };
    },
    increment: (state, action) => {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    },
    decrement: (state, action) => {
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : null
              : item
          )
          .filter(Boolean),
      };
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increment, decrement } =
  cartSlice.actions;
export default cartSlice.reducer;
