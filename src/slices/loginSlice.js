import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { countries } from '../_mock/countries';
import { GetUserResponse, LoginResponse } from '../services/Service';
import ErrorToast from '../toast/Error';

const initialState = {
  isLoading: false,
  user: {},
  Countries: countries,
};

export const loginUser = createAsyncThunk('auth/login', async (params, { rejectWithValue }) => {
  try {
    const response = await LoginResponse(params);

    if (response.data.success) {
      localStorage.setItem('Jtoken', response.data.token);
    } else {
      ErrorToast(response.data.message);
    }

    return response?.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error?.response ? error.response : error);
  }
});

export const getProfile = createAsyncThunk('auth/getProfile', async (params, {rejectWithValue}) => {
  try {
    const response = await GetUserResponse();
    if(!response.data.success){
      rejectWithValue(response.data)
    }
    return response?.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error?.response ? error.response : error);
  }
})

export const logout = createAsyncThunk('auth/logout', async ()=>{
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    return false;
  }
});

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogindata: (state, action) => {
      console.log(action.payload);
      state.user = {...state.user, ...action.payload.data};
      return state;
    },
    updateLoginData: (state, {payload}) => {
      console.log("this is update payload ====> ",payload);
      state.user.profilePic = payload.data.profilePic
      return state;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.data;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      console.log('Error', payload);
    },
    [getProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [getProfile.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
      state.user = {...state.user, ...payload.data};
    },
    [getProfile.rejected]: (state) => {
      state.isLoading = false;
      localStorage.clear();
    },
    [logout.pending]: (state) => {
      state.isLoading = true;
    },
    [logout.fulfilled]: (state) => {
      state.isLoading = false;
      state.user = {};
    },
    [logout.rejected]: (state) => {
      state.isLoading = false;
    }
  },
});

export const { setLogindata, updateLoginData } = loginSlice.actions;

export default loginSlice.reducer;
