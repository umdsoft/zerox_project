import { createAsyncThunk } from '@reduxjs/toolkit';
import { successStatus, URL } from '../../../screens/constants';
import axios from 'axios';

const CreatePasswordSendApi = createAsyncThunk(
  'user/phone/createPassword',
  async (state, { rejectWithValue }) => {
    const { phone, password, code } = state;
    try {
      const { data, status } = await axios.post(URL + '/user/register', {
        phone: '+998' + phone,
        password: password.password,
        code: code,
        step: 3,
        type: 2,
      });
      if (status === successStatus) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
const LoginWithPhoneSendPasswordApi = createAsyncThunk(
  'user/phone/password',
  async (state, { rejectWithValue }) => {
    const { phone, password } = state;

    try {
      const { data, status } = await axios.post(URL + '/user/login', {
        phone: '+998' + phone,
        password: password,
      });

      if (status === successStatus) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
const SmsCheckCodeApi = createAsyncThunk(
  'user/sms/check/code',
  async (state, { rejectWithValue }) => {
    const { phone, code } = state;
    try {
      const { data, status } = await axios.post(URL + '/user/register', {
        phone: '+998' + phone,
        code: code,
        type: 2,
        step: 2,
      });
      if (status === successStatus) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
const UserDataPostApi = createAsyncThunk(
  'user/register',
  async (number, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(URL + '/user/register', {
        phone: '+998' + number,
        type: 2,
        step: 1,
      });
      if (data.success) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(
        'Ushbu telefon raqami tizimda muqaddam ro’yxatga olingan. Iltimos, ro’yxatdan o’tish uchun boshqa telefon raqamidan foydalaning',
      );
    }
  },
);

export {
  CreatePasswordSendApi,
  LoginWithPhoneSendPasswordApi,
  SmsCheckCodeApi,
  UserDataPostApi,
};
