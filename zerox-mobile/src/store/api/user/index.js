import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {successStatus, URL} from '../../../screens/constants';
import {storage} from '../token/getToken';
const UserSearch = createAsyncThunk(
  'get/user/search',
  async (state, {rejectWithValue}) => {
    const {id, birthday, type, stir} = state;
    if (type == 1) {
      try {
        const {data, status} = await axios.post(URL + '/user/search', {
          id: id,
          birthday,
          type,
        });
        if (status == successStatus) {
          return {
            user: data,
          };
        }
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    } else {
      try {
        const {data, status} = await axios.post(URL + '/user/search', {
          id: id,
          stir,
          type,
        });
        if (status == successStatus) {
          return {
            user: data,
          };
        }
      } catch (error) {
        rejectWithValue(error.response.data);
      }
    }
  },
);

const createFmtTokenAction = createAsyncThunk(
  'createFmtTokenAction',
  async state => {
    const token = storage.getString('token');
    try {
      const {data} = await axios.put(
        URL + '/user/fmt-token',
        {
          fmt_token: state.fmt_token,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log(data, 'dasasdasd');
    } catch (error) {
      throw error;
    }
  },
);

export {UserSearch, createFmtTokenAction};
