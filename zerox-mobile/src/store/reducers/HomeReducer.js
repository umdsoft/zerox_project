import { createSlice } from '@reduxjs/toolkit';
import { HomeApi, getDevicesAction, getMe, getNotifications } from '../api/home';

const initialState = {
  error: false,
  loading: false,
  home: [],
  user: [],
  notification: {
    bild: [],
    news: [],
  },
  devices: [],
  isActive: false,
  contract: false,
  internet: true,
  update: false,
  currect_device: {},
  usd: 1,
};

const HomeReducer = createSlice({
  initialState,
  name: 'HomeReducer',
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    filter_notification(state, { payload }) {
      let a = state.notification?.bild?.filter(item => item.id != payload);
      return {
        ...state,
        notification: {
          bild: a,
          news: [],
        },
      };
    },
    showModal: (state, action) => {
      state.isActive = action.payload.show;
    },
    setError: state => {
      state.error = false;
    },
    contractModalShow: (state, action) => {
      state.contract = action.payload.show;
    },
    checkingInternet: (state, action) => {
      state.internet = action.payload.internet;
    },
    checkUpdate: (state, action) => {
      state.update = action.payload.update;
    },
    setNotification: (state, action) => {
      state.notification.bild = action.payload.notification.filter(
        v => v.reciver === state.user.data.id,
      );
    },
    setUsd: (state, action) => {
      state.usd = action.payload.usd;
    },
  },

  extraReducers: builder => {
    builder.addCase(HomeApi.pending, state => {
      state.loading = true;
    });
    builder.addCase(HomeApi.fulfilled, (state, action) => {
      state.home = action.payload?.home;
      state.user = action.payload?.user;
      state.notification.bild = action.payload.notification.filter(
        v => v.reciver === action.payload?.user.data.id,
      );
      state.loading = false;
    });
    builder.addCase(HomeApi.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload?.user;
    });
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.notification.bild = action?.payload?.notification;
    });
    builder.addCase(getDevicesAction.fulfilled, (state, action) => {
      state.devices = action.payload.data?.data;
    });
  },
});
export const {
  startLoading,
  stopLoading,
  filter_notification,
  showModal,
  contractModalShow,
  checkingInternet,
  checkUpdate,
  setNotification,
  setUsd,
} = HomeReducer.actions;
export default HomeReducer.reducer;
