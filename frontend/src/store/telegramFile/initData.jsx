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
  console.log("🚀 Starting CheckUser with initData:", initData);
  console.log("🌐 API URL:", `${import.meta.env.VITE_BASE_URL}/api/check/user`);
  
  try {
    if (initData) {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/check/user`,
        { initData },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      console.log("📡 Full response:", response);
      console.log("📡 Response status:", response.status);
      console.log("📡 Response headers:", response.headers);
      console.log("📡 Response data:", response.data);
      console.log("📡 Response data type:", typeof response.data);
      console.log("📡 Response data length:", response.data?.length || 'N/A');
      
      // Check if response.data is empty string
      if (response.data === "") {
        console.error("❌ Empty response data received!");
        throw new Error("Empty response from server");
      }
      
      console.log("👤 User data from response:", response.data?.user);
      console.log("✅ Response status:", response.data?.ok);
      
      // Return the data property which contains the actual response from server
      return response.data;
    }
  } catch (error) {
    console.error("❌ Error in CheckUser:", error);
    console.error("❌ Error response:", error.response?.data);
    console.error("❌ Error status:", error.response?.status);
    console.error("❌ Error headers:", error.response?.headers);
    throw error; // Re-throw to trigger the rejected case
  }
});

const TelegramSlice = createSlice({
  name: "TG",
  initialState,
  reducers: {
    UserData: (state, action) => {
      //console.log(action.payload,"action Payload");
      
      state.testUser=action.payload
    },
    DemoData: (state, action) => {
      state.userList = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(CheckUser.fulfilled, (state, action) => {
        console.log("🎉 CheckUser fulfilled with payload:", action.payload);
        if (action.payload.ok && action.payload.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
          console.log("✅ User authenticated:", action.payload.user);
        } else {
          console.warn("⚠️ Authentication failed - invalid response");
          state.isAuthenticated = false;
        }
        state.loading = false;
      })
      .addCase(CheckUser.rejected, (state, action) => {
        console.error("❌ CheckUser rejected:", action.error);
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(CheckUser.pending, (state, action) => {
        console.log("⏳ CheckUser pending...");
        state.loading = true;
        state.error = null;
      });
  },
});

export const { UserData, DemoData } = TelegramSlice.actions;
export default TelegramSlice.reducer;
