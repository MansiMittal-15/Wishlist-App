import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlists: [],
    singleWishlist: null,
  },
  reducers: {
    // actions..
    setWishlists: (state, action) => {
      state.wishlists = action.payload;
    },
    setSingleWishlist: (state, action) => {
      state.singleWishlist = action.payload;
    },
  },
});
export const { setWishlists, setSingleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
