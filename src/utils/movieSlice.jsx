import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    searchResults: [],
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addFavorite: (state, action) => {
      const movieExists = state.favorites.find(
        (movie) => movie.imdbID === action.payload.id
      );
      if (!movieExists) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      console.log("payload", action.payload);
      state.favorites = state.favorites.filter(
        (movie) => movie.imdbID !== action.payload.id
      );
    },
  },
});

export const {
  setSearchResults,
  setLoading,
  setError,
  addFavorite,
  removeFavorite,
} = movieSlice.actions;
export default movieSlice.reducer;
