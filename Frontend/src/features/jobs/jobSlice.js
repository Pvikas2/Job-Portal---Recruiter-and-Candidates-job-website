import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// Fetch all jobs
export const fetchJobs = createAsyncThunk("jobs/fetch", async () => {
  const res = await API.get("/jobs");
  return res.data;
});

// Fetch single job
export const fetchJobById = createAsyncThunk(
  "jobs/fetchById",
  async (id) => {
    const res = await API.get(`/jobs/${id}`);
    return res.data;
  }
);

// Apply to job
export const applyJob = createAsyncThunk(
  "jobs/apply",
  async (jobId, thunkAPI) => {
    const res = await API.post(`/applications/apply/${jobId}`);
    return res.data;
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    job: null,
    isLoading: false,
    success: null,
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.job = action.payload;
      })
      .addCase(applyJob.fulfilled, (state) => {
        state.success = "Applied successfully";
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = jobSlice.actions;
export default jobSlice.reducer;
