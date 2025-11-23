// ⭐ Favourite Slice - Manage Favourite Songs

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favourites: [],
};

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      const exists = state.favourites.find(song => song.id === action.payload.id);
      if (!exists) {
        state.favourites.push(action.payload);
      }
    },
    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter(
        song => song.id !== action.payload
      );
    },
    clearFavourites: (state) => {
      state.favourites = [];
    },
  },
});

export const { addFavourite, removeFavourite, clearFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;
