import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL =process.env.REACT_APP_API_URL 

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/login-user`, {
        email,
        password,
      });

      return res.data; // contains user + token
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/register-user`, {
        email,
        password,
      });

      toast.success(
        "Registration successful. Please check your email to verify your account."
      );

      // Don't store JWT until user verifies email
      // if (res.data.token) {
      //   localStorage.setItem("authToken", res.data.token);
      // }

      return res.data; // user + message
    } catch (error) {
      console.error("Axios error:", error.message);

      const message =
        error.response?.data?.message || error.message || "Registration failed";

      toast.error(message);

      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const fetchContents = createAsyncThunk(
  "content/fetchContents",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/content");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch content"
      );
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "content/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken"); // get token from localStorage

      const res = await axios.get(`${API_URL}/get-user-profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // add token to header
        },
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch content"
      );
    }
  }
);

export const getUserContent = createAsyncThunk(
  "content/getUserContent",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken"); // get token from localStorage

        const res = await axios.get(`${API_URL}/get-user-content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.contents;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch content"
      );
    }
  }
);


export const getUserAccount = createAsyncThunk(
  "content/getUserAccount",
  async (_,  thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken"); // get token from localStorage

        const res = await axios.get(`${API_URL}/get-user-account`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.account;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch content"
      );
    }
  }
);


export const getWithdrawalHistory = createAsyncThunk(
  "content/getWithdrawalHistory",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken"); 

      const res = await axios.get(`${API_URL}/get-withdrawal-history`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;

      if (data && data.withdrawals?.length > 0) {
        return data.withdrawals; // return actual history
      } else {
        thunkAPI.dispatch(
          toast.info("No withdrawal history yet. Start by requesting a withdrawal!")
        );
        return [];
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unable to get withdrawal history";

      if (message === "No withdrawal history found") {
        return []; // safe fallback
      }

      thunkAPI.dispatch(toast.error(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

