import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { logoutUser } from "../user/userSlice";

import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk("job/createJob", createJobThunk);

export const deleteJob = createAsyncThunk("job/deleteJob", deleteJobThunk);

export const editJob = createAsyncThunk("job/editJob", editJobThunk);
// export const createJob = createAsyncThunk(
//   "job/createJob",
//   async (job, thunkAPI) => {
//     try {
//       const resp = await customFetch.post("/jobs", job, {
//         headers: {
//           authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
//         },
//       });
//       thunkAPI.dispatch(clearValues()); //thunkAPI access to dispatch
//       return resp.data;
//     } catch (error) {
//       // basic setup
//       // return thunkAPI.rejectWithValue(error.response.data.msg);
//       // logout user
//       if (error.response.status === 401) {
//         thunkAPI.dispatch(logoutUser());
//         return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
//       }
//       return thunkAPI.rejectWithValue(error.response.data.msg);
//     }
//   }
// );

// export const deleteJob = createAsyncThunk(
//   "job/deleteJob",
//   async (jobId, thunkAPI) => {
//     thunkAPI.dispatch(showLoading());
//     try {
//       const resp = await customFetch.delete(`/jobs/${jobId}`, {
//         headers: {
//           authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
//         },
//       });
//       thunkAPI.dispatch(getAllJobs());
//       return resp.data;
//     } catch (error) {
//       thunkAPI.dispatch(hideLoading());
//       return thunkAPI.rejectWithValue(error.response.data.msg);
//     }
//   }
// );

// export const editJob = createAsyncThunk(
//   "job/editJob",
//   async ({ jobId, job }, thunkAPI) => {
//     try {
//       const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
//         headers: {
//           authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
//         },
//       });
//       thunkAPI.dispatch(clearValues());
//       return resp.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.msg);
//     }
//   }
// );

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },

    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },

    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },

  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success("Job Created");
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job Modified...");
    },
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
