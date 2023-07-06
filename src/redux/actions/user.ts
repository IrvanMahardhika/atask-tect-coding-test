import { createAction } from '@reduxjs/toolkit';

import { GET_RESULT_SEARCH_USER, SET_RESULT_SEARCH_USER } from './actionsList';

export const getResultSearchUser = createAction<{ username: string }>(
  GET_RESULT_SEARCH_USER
);
export const setResultSearchUser = createAction<
  UserState['resultSearchUserState']
>(SET_RESULT_SEARCH_USER);
