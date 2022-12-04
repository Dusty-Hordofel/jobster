import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  user: null,
}; //initial state

const userSlice = createSlice({ name: "user", initialState }); //create user slice

export default userSlice.reducer; //export userSlice
