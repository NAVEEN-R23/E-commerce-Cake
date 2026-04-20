import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import aiReducer from "./aiSlice";


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        ai:aiReducer
    }
});
store.subscribe(() => {
    localStorage.setItem("cart", JSON.stringify(store.getState().cart.items));
    localStorage.setItem("wishlist", JSON.stringify(store.getState().wishlist.items))
})