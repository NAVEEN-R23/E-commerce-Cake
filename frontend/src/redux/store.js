import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice"


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer
    }
});
store.subscribe(() => {
    localStorage.setItem("cart", JSON.stringify(store.getState().cart.items));
    localStorage.setItem("wishlist", JSON.stringify(store.getState().wishlist.items))
})