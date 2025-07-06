import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlists: [],
  },
  reducers: {
    // actions..
    setWishlists: (state, action) => {
      state.wishlists = action.payload;
    },
  },
});
export const { setWishlists } = wishlistSlice.actions;
export default wishlistSlice.reducer;
