import { configureStore } from "@reduxjs/toolkit";

import moviesReducer from "./movieSlice";

const appStore = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export default appStore;
