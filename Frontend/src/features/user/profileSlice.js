import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../services/api";

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, thunkAPI) => {
    const res = await API.put("/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data; // ✅ RETURN UPDATED USER DATA
  }
);


const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // ✅ STORE DATA
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
