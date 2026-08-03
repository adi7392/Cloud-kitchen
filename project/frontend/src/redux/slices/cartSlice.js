import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    kitchenId: null,
    kitchenName: "",
  },
  reducers: {
    addToCart(state, action) {
      const { menuItem, name, price, kitchenId, kitchenName } = action.payload;

      // If adding from a different kitchen, clear cart
      if (state.kitchenId && state.kitchenId !== kitchenId) {
        state.items = [];
      }

      state.kitchenId = kitchenId;
      state.kitchenName = kitchenName;

      const existing = state.items.find((item) => item.menuItem === menuItem);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ menuItem, name, price, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.menuItem !== action.payload,
      );
      if (state.items.length === 0) {
        state.kitchenId = null;
        state.kitchenName = "";
      }
    },
    updateQuantity(state, action) {
      const { menuItem, quantity } = action.payload;
      const item = state.items.find((i) => i.menuItem === menuItem);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.menuItem !== menuItem);
        } else {
          item.quantity = quantity;
        }
      }
      if (state.items.length === 0) {
        state.kitchenId = null;
        state.kitchenName = "";
      }
    },
    clearCart(state) {
      state.items = [];
      state.kitchenId = null;
      state.kitchenName = "";
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;