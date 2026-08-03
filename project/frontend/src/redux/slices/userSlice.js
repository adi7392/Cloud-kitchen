import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/users/profile", userData);
      return data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",

  initialState: {
    profile: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearUserError(state) {
      state.error = null;
    },

    setProfile(state, action) {
      state.profile = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserError, setProfile } = userSlice.actions;

export default userSlice.reducer;