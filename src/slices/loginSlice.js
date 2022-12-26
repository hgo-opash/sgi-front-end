// import { useStaticState } from '@material-ui/pickers';
import { createSlice } from '@reduxjs/toolkit';
import { countries } from '../_mock/countries';

const initialState = {
  FirstName: '',
  Email: '',
  LastLogin: '',
  Role: '',
  ProfilePic: '',
  Countries: countries,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogindata: (state, action) => {
      console.log(action.payload);
      state.Email = action.payload.Email;
      state.LastLogin = action.payload.LastLogin;
      state.Role = action.payload.Role;
      state.FirstName = action.payload.FirstName;
      state.ProfilePic = action.payload.ProfilePic;
      return state;
    },
  },
});

export const { setLogindata } = loginSlice.actions;

export default loginSlice.reducer;
