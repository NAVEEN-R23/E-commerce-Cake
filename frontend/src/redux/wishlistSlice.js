// src/redux/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: JSON.parse(localStorage.getItem("wishlist")) || []
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishlist: (state, action) => {
            state.items = action.payload;
        },

        toggleWishlist: (state, action) => {
            const exists = state.items.find(
                (item) => item._id === action.payload._id
            );

            if (exists) {
                state.items = state.items.filter(
                    (item) => item._id !== action.payload._id
                );
            } else {
                state.items.push(action.payload);
            }
        }
    }
});

export const { setWishlist, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;