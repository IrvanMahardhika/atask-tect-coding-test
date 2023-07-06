import { createAction } from '@reduxjs/toolkit';

import { SET_LOADER } from './actionsList';

export const setLoader = createAction<boolean>(SET_LOADER);
