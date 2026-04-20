 import { createSlice } from "@reduxjs/toolkit";

 const aiSlice = createSlice({
     name: "ai",
     initialState: {
         products: []
     },
     reducers: {
         setAiproducts: (state, action) => {
            console.log("REDUCER HIT:",action.payload);
             state.products = action.payload;
         },
         clearAiproducts: (state) => {
             state.products = [];
         }
     }
 });
export const { setAiproducts, clearAiproducts } = aiSlice.actions;
export default aiSlice.reducer;