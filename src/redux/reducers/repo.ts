import { createReducer } from '@reduxjs/toolkit';

import { setRepos } from '../actions/repo';

export const repoState: RepoState = {};

const repoReducer = createReducer(repoState, (builder) => {
  builder.addCase(setRepos, (state, { payload }) => {
    return { ...state, resultGetRepo: payload };
  });
});

export default repoReducer;
