import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const createPaymentOrder = createAsyncThunk(
  "payment/createOrder",
  async (amountData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/payments/create-order", amountData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Payment order failed"
      );
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "payment/verify",
  async (paymentData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/payments/verify", paymentData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Payment verification failed"
      );
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",

  initialState: {
    payment: null,
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    clearPayment(state) {
      state.payment = null;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createPaymentOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })

      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })

      .addCase(verifyPayment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearPayment } = paymentSlice.actions;

export default paymentSlice.reducer;