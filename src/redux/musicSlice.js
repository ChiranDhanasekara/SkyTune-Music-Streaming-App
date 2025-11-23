// 🎵 Music Slice - Music Data Management

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  musicList: [],
  trendingSongs: [],
  newReleases: [],
  loading: false,
  error: null,
  searchQuery: '',
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    fetchMusicStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMusicSuccess: (state, action) => {
      state.loading = false;
      state.musicList = action.payload;
      // Categorize music
      state.trendingSongs = action.payload.filter((song, index) => index % 3 === 0);
      state.newReleases = action.payload.filter((song, index) => index % 3 === 1);
      state.error = null;
    },
    fetchMusicFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearMusicData: (state) => {
      state.musicList = [];
      state.trendingSongs = [];
      state.newReleases = [];
      state.searchQuery = '';
    },
  },
});

export const {
  fetchMusicStart,
  fetchMusicSuccess,
  fetchMusicFailure,
  setSearchQuery,
  clearMusicData,
} = musicSlice.actions;

export default musicSlice.reducer;
