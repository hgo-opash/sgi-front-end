import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  SubscriptionData: [],
};

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscriptions: (state, action) => {
      state.SubscriptionData = action.payload.subscriptions;
      return state;
    },

    deleteSubscription: (state, action) => {
      console.log('pload ', action.payload);
      const newState = state.SubscriptionData.filter((val) => val._id !== action.payload.row._id);
      state.SubscriptionData = newState;

      return state;
    },
  },
});

export const { setSubscriptions, deleteSubscription } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
