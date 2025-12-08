// src/redux/slices/authSlice.js
import { createSlice,} from '@reduxjs/toolkit';
import { loginUser,createUser,getCurrentUser,getUserContent,getUserAccount,getWithdrawalHistory } from '../Redux/Asyncthunk';


// Login API call

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    content:[],
    account:[],
    withdrawalsHistory:[]
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.content = [];
    state.withdrawalsHistory = [];
    state.account = [];
    },
     removeContent: (state, action) => {
    state.content = state.content.filter((c) => c._id !== action.payload);
  },
  },
  extraReducers: (builder) => {
    builder
    // login user 
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

 

       .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //get user content

        .addCase(getUserContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
        state.token =null
      })
      .addCase(getUserContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
//get user account 
        .addCase(getUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload;
        state.token =null
      })
      .addCase(getUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //withdwwals

       .addCase(getWithdrawalHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWithdrawalHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.withdrawalsHistory = action.payload;
        state.token =null
      })
      .addCase(getWithdrawalHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
  
});

export const { logout,removeContent} = authSlice.actions;
export default authSlice.reducer;
