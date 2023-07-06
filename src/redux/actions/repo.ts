import { createAction } from '@reduxjs/toolkit';

import { GET_REPOS, SET_REPOS } from './actionsList';

export const getRepos = createAction(GET_REPOS);
export const setRepos = createAction<RepoItem[]>(SET_REPOS);
