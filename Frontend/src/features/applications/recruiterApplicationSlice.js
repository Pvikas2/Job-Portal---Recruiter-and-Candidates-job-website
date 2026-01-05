import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchApplicants = createAsyncThunk(
  "applications/applicants",
  async (jobId) => {
    const res = await API.get(`/applications/job/${jobId}`);
    return res.data;
  }
);

export const updateStatus = createAsyncThunk(
  "applications/status",
  async ({ id, status }) => {
    const res = await API.put(`/applications/${id}/status`, { status });
    return res.data;
  }
);
