import { createSlice } from '@reduxjs/toolkit';
import { Notification } from '../components/Notifications/index.types';

const initialState = {
  notifications: [] as Notification[]
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification: ((state, action) => {
      const { notification } = action.payload;
      state.notifications = [...state.notifications, notification];
    })
  }
});

export const { showNotification } = notificationSlice.actions;
export default notificationSlice.reducer;