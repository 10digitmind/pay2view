// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Redux/AuthSlice';
import contentReducer from '../Redux/Contentslice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
  },
});

export default store;
