import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

const initialState = {
  isLoading: false,
  user: null,
}; //initial state

// communicate with our backend
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user);
      console.log("🚀 ~ file: userSlice.js:16 ~ resp", resp);
    } catch (error) {
      toast.error(error.message.data.msg);
      console.log("🚀 ~ file: userSlice.js:18 ~ error", error.response);
    }

    // console.log(`Register User: ${JSON.stringify(user)}`);
  }
);
// communicate with our backend
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    console.log(`Login User: ${JSON.stringify(user)}`);
  }
);

const userSlice = createSlice({ name: "user", initialState }); //create user slice

export default userSlice.reducer; //export userSlice
