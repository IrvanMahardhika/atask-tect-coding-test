import { createAction } from '@reduxjs/toolkit';

import { GET_REPOS, SET_REPOS } from './actionsList';

export const getRepos = createAction<{ userList: User[] }>(GET_REPOS);
export const setRepos = createAction<RepoState['resultGetRepo']>(SET_REPOS);
