import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { successStatus, URL } from '../../../screens/constants';
import { storage } from '../token/getToken';
const HomeApi = createAsyncThunk(
  'get/home/user',
  async (state, { rejectWithValue }) => {
    const token = storage.getString('token');

    try {
      const [user_data, debitor, creditor, notification] = await axios.all([
        axios.get(URL + '/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(URL + '/home/my?type=debitor', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(URL + '/home/my?type=creditor', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(URL + '/notification/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (
        user_data.status === successStatus &&
        creditor.status === successStatus &&
        debitor.status === successStatus &&
        notification.status
      ) {
        return {
          user: user_data.data,
          home: {
            debitor: debitor.data,
            creditor: creditor.data,
          },
          notification: notification.data?.data,
        };
      }
    } catch (error) {
      console.log({ "Notification-Error-1": error.message })
      rejectWithValue(error.response.data);
    }
  },
);

const getMe = createAsyncThunk('getme', async state => {
  const token = storage.getString('token');
  try {
    const { data } = await axios.get(URL + '/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      user: data,
    };
  } catch (error) {
    console.log({ "Notification-Error-2": error.message })
  }
});

const getNotifications = createAsyncThunk('notification', async () => {
  const token = storage.getString('token');
  try {
    const { data } = await axios.get(URL + '/notification/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      notification: data.data,
    };
  } catch (error) {
    console.log({ "Notification-Error-3": error.message })
  }
});

const getVersionAction = createAsyncThunk('getVersion', async state => {
  const token = storage.getString('token');

  try {
    const { data } = await axios.get(URL + `/version/get?type=${state.type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      data: data,
      error: null,
    };
  } catch (error) {
    console.log({ "Notification-Error-4": error.message })
    throw error;
  }
});

const postDeviceIdAction = createAsyncThunk('postDeviceId', async state => {
  const token = storage.getString('token');

  try {
    const { data } = await axios.post(URL + '/user/active-device', state, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      return {
        success: true,
        data: data,
      };
    }
  } catch (error) {
    console.log({ "Notification-Error-5": error.message })
    throw error;
  }
});

const updateDeviceStatusAction = createAsyncThunk(
  'updateDeviceStatus',
  async state => {
    const token = storage.getString('token');
    try {
      const { } = await axios.put(
        URL + '/user/active-device',
        {
          status: state.status,
          device_id: state.device_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.log({ "Notification-Error-6": error.message })
      throw error;
    }
  },
);

const closeActiveDeviceAction = createAsyncThunk(
  'closeActiveDevice',
  async state => {
    const token = storage.getString('token');
    try {
      const { data } = await axios.delete(
        URL + '/user/close-device',
        {
          data: {
            device_id: state.device_id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        return {
          data: data,
          success: true,
        };
      }
    } catch (error) {
      console.log({ "Notification-Error-7": error.message })
      throw error;
    }
  },
);

const getDevicesAction = createAsyncThunk('getDevicesAction', async () => {
  const token = storage.getString('token');

  try {
    const { data } = await axios.get(URL + '/user/devices', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      return {
        data: data,
        success: true,
      };
    }
  } catch (error) {
    console.log({ "Notification-Error-8": error.message })
    throw error;
  }
});

const onListTimePostAction = createAsyncThunk(
  'onListTimePostAction',
  async ({ device_id }) => {
    try {
      await axios.put(URL + '/user/last-time', {
        device_id,
      });
      return {
        success: true,
      };
    } catch (error) {
      console.log({ "Notification-Error-9": error.message })
      throw error;
    }
  },
);

const onDeleteDevices = createAsyncThunk('onDeleteDevices', async state => {
  const token = storage.getString('token');
  try {
    const { data } = await axios.delete(URL + '/user/close-device', {
      data: {
        device_ids: state.data,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data?.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (error) {
    console.log({ "Notification-Error-10": error.message })
    throw error;
  }
});

export {
  HomeApi,
  onDeleteDevices,
  getMe,
  getNotifications,
  getVersionAction,
  postDeviceIdAction,
  getDevicesAction,
  updateDeviceStatusAction,
  closeActiveDeviceAction,
  onListTimePostAction,
};
