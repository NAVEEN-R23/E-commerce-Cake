import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // setcart from backend
    setCart: (state, action) => {
      state.items = action.payload;
    },

    // 🛒 Add to Cart
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.productId._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          productId: action.payload,
          quantity: 1
        });
      }
    },


    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.productId._id === action.payload);
      if (item) item.quantity += 1;
    },


    decreaseQuantity: (state, action) => {
  const item = state.items.find(
    (i) => i.productId._id === action.payload
  );

  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      // 🔥 remove item when quantity = 1
      state.items = state.items.filter(
        (i) => i.productId._id !== action.payload
      );
    }
  }
},


    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId._id !== action.payload
      );
    }

  }
});


export const {
  setCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} = cartSlice.actions;


export default cartSlice.reducer;