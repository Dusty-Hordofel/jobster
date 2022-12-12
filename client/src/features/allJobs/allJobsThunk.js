import customFetch from "../../utils/axios";

export const getAllJobsThunk = async (_, thunkAPI) => {
  // let url = `/jobs`;
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;

  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }

  try {
    const resp = await customFetch.get(
      url

      //   , {
      //   headers: {
      //     authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      //   },
      // }
    );

    console.log("🚀 ~ file: allJobsSlice.js:40 ~ resp.data", resp.data);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/jobs/stats");
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
