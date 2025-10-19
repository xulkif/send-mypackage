import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  testUser:null,
  user: null,
  isAuthenticated: false,
  loading: false,
  userList: [],
  error: null,
};

export const CheckUser = createAsyncThunk("checkUser", async (initData) => {
  console.log("aaaa");
  try {
   
    
    if (initData) {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/check/user`,
        { initData },
        {
          withCredentials: true,
        }
      );

      return response;
    }
  } catch (e) {
    console.log(e)
  }
});

const TelegramSlice = createSlice({
  name: "TG",
  initialState,
  reducers: {
    UserData: (state, action) => {
      console.log(action.payload,"action Payload");
      
      state.testUser=action.payload
    },
    DemoData: (state, action) => {
      state.userList = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(CheckUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(CheckUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(CheckUser.pending, (state, action) => {
        state.loading = true;
      });
  },
});

export const { UserData, DemoData } = TelegramSlice.actions;
export default TelegramSlice.reducer;
