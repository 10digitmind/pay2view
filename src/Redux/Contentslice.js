// src/redux/slices/contentSlice.js
import { createSlice } from '@reduxjs/toolkit';

import { fetchContents } from '../Redux/Asyncthunk';

// Fetch contents API

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contentSlice.reducer;
