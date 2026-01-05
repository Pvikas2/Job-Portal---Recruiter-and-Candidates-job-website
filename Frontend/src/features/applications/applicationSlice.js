import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchMyApplications = createAsyncThunk(
  "applications/my",
  async () => {
    const res = await API.get("/applications/my-applications");
    return res.data;
  }
);

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyApplications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = action.payload;
      });
  },
});

export default applicationSlice.reducer;
