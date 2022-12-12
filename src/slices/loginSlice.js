// import { useStaticState } from '@material-ui/pickers';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  FirstName: '',
  Email: '',
  LastLogin: '',
  Role: '',
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
      return state;
    },
  },
});

export const { setLogindata } = loginSlice.actions;

export default loginSlice.reducer;