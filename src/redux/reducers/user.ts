import { createReducer } from '@reduxjs/toolkit';

import { setResultSearchUser } from '../actions/user';

export const userState: UserState = {};

const userReducer = createReducer(userState, (builder) => {
  builder.addCase(setResultSearchUser, (state, { payload }) => {
    return { ...state, resultSearchUserState: payload };
  });
});

export default userReducer;
