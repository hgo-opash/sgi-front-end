import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allCompaniesData: [],
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompanies: (state, action) => {
      state.allCompaniesData = action.payload.allCompaniesData;
      return state;
    },
  },
});

export const { setCompanies } = companiesSlice.actions;

export default companiesSlice.reducer;
