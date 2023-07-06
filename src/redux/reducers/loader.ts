import { createReducer } from '@reduxjs/toolkit';

import { setLoader } from '../actions/loader';

export const loaderState = {
  loader: false
};

const loaderReducer = createReducer(loaderState, (builder) => {
  builder.addCase(setLoader, (state, { payload }) => {
    return { ...state, loader: payload };
  });
});

export default loaderReducer;
