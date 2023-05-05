import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image } = action.payload;
      const existingCartItem = state.cartItems.find((item) => item.id === id);
      if (existingCartItem) {
        existingCartItem.quantity++;
        existingCartItem.total = existingCartItem.quantity * existingCartItem.price;
      } else {
        const newItem = {
          id,
          name,
          price,
          image,
          quantity: 1,
          total: price,
        };
        state.cartItems.push(newItem);
      }
      state.cartTotalQuantity++;
      state.cartTotalAmount += price;
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const existingCartItem = state.cartItems.find((item) => item.id === id);
      if (existingCartItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.cartTotalQuantity -= existingCartItem.quantity;
        state.cartTotalAmount -= existingCartItem.total;
      }
    },
    decreaseCart: (state, action) => {
      const { id } = action.payload;
      const existingCartItem = state.cartItems.find((item) => item.id === id);
      if (existingCartItem) {
        existingCartItem.quantity--;
        existingCartItem.total = existingCartItem.quantity * existingCartItem.price;
        state.cartTotalQuantity--;
        state.cartTotalAmount -= existingCartItem.price;
        if (existingCartItem.quantity === 0) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;