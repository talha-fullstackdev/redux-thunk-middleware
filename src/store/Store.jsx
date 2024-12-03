import { configureStore } from "@reduxjs/toolkit";
import MoviesSlice from "../slices/MoviesSlice";
const Store = configureStore({
  reducer: {
    MoviesSlice,
  },
});

export default Store;
