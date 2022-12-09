import { configureStore } from '@reduxjs/toolkit';
import subscriptionSlice from '../slices/subscriptionSlice';
import loginSlice from '../slices/loginSlice';
import companiesSlice from '../slices/companiesSlice';

export const store = configureStore({
  reducer: { login: loginSlice, subscription: subscriptionSlice, companies: companiesSlice },
});
