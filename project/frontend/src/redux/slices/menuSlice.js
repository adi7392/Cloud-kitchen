import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Get all menu items
export const fetchMenu = createAsyncThunk(
  "menu/fetchMenu",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/menu");
      return data.menu;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch menu"
      );
    }
  }
);

// Get menu of a specific kitchen
export const fetchKitchenMenu = createAsyncThunk(
  "menu/fetchKitchenMenu",
  async (kitchenId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/menu/kitchen/${kitchenId}`);
      return data.menu;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch kitchen menu"
      );
    }
  }
);

const menuSlice = createSlice({
  name: "menu",

  initialState: {
    menu: [],
    loading: false,
    error: null,
    search: "",
  },

  reducers: {
    clearMenuError(state) {
      state.error = null;
    },

    setSearch(state, action) {
      state.search = action.payload;
    },

    clearMenu(state) {
      state.menu = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch all menu
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload;
      })

      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch kitchen menu
      .addCase(fetchKitchenMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchKitchenMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload;
      })

      .addCase(fetchKitchenMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearMenuError,
  setSearch,
  clearMenu,
} = menuSlice.actions;

export default menuSlice.reducer;