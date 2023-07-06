import { createReducer } from '@reduxjs/toolkit';

import { setResultSearchUser, setSearchUserHistory } from '../actions/user';

export const userState: UserState = {
  searchUserHistory: []
};

const userReducer = createReducer(userState, (builder) => {
  builder.addCase(setResultSearchUser, (state, { payload }) => {
    return { ...state, resultSearchUserState: payload };
  });
  builder.addCase(setSearchUserHistory, (state, { payload }) => {
    return { ...state, searchUserHistory: payload };
  });
});

export default userReducer;
