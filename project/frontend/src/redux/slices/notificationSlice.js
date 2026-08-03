import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",

  initialState: {
    notifications: [],
  },

  reducers: {
    addNotification(state, action) {
      state.notifications.push({
        id: Date.now(),
        type: action.payload.type,
        message: action.payload.message,
      });
    },

    removeNotification(state, action) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },

    clearNotifications(state) {
      state.notifications = [];
    },
  },
});

export const {
  addNotification,
  removeNotification,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;