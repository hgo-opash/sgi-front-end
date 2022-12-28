import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  SubscriptionData: [],
};

export const businessSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscriptions: (state, action) => {
      state.SubscriptionData = action.payload.subscriptions;
      return state;
    },

    deleteSubscription: (state, action) => {
      const newState = state.SubscriptionData.filter((el) => action.payload.indexOf(el._id) < 0);
      state.SubscriptionData = newState;
      return state;
    },

    // deleteSubscriptionArray: (state, action) => {
    //   console.log('pload ==> ', action.payload);
    //   const newState = state.SubscriptionData.filter((el) => action.payload.indexOf(el._id) < 0);
    //   state.SubscriptionData = newState;
    //   return state;
    // },
  },
});

export const { setSubscriptions, deleteSubscription } = businessSlice.actions;

export default businessSlice.reducer;
