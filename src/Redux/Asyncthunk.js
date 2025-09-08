import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      return res.data; // contains user + token
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

export const createUser = createAsyncThunk(
  'auth/createUser',
  async ({ email, password }, thunkAPI) => {
    console.log(API_URL)
    try {
      const res = await axios.post(`${API_URL}/register-user`, { email, password });

      console.log('res:',res)
      return res.data; // contains user + token
    } catch (error) {
        console.log(error)
      return thunkAPI.rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

export const fetchContents = createAsyncThunk(
  'content/fetchContents',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/api/content');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch content');
    }
  }
);
