import { call, put, takeLatest } from 'redux-saga/effects';

import { ITEMS_PER_PAGE } from '../../constants/config';

import { store } from '../../redux/store';

import {
  setResultSearchUser,
  getResultSearchUser,
  setSearchUserHistory
} from '../actions/user';
import { getRepos } from '../actions/repo';
import { setLoader } from '../actions/loader';

import api from '../sagas/api/api';

export function* fetchResultSearchUser({
  payload
}: {
  payload: { username: string };
}) {
  yield put(setLoader(true));

  const { searchUserHistory }: UserState = store.getState().userReducer;
  yield put(setSearchUserHistory([...searchUserHistory, payload.username]));

  const searchUserApiConfig = {
    path: `https://api.github.com/search/users?per_page=${ITEMS_PER_PAGE}&q=${payload.username}`,
    method: 'GET'
  };

  const resultSearchUserState: UserState['resultSearchUserState'] = yield call(
    api,
    searchUserApiConfig
  );

  if (resultSearchUserState?.status === 200) {
    yield put(setResultSearchUser(resultSearchUserState));

    if (
      resultSearchUserState?.data?.items &&
      resultSearchUserState?.data?.items.length > 0
    ) {
      yield put(getRepos({ userList: resultSearchUserState?.data?.items }));
    }
  } else {
    yield put(setResultSearchUser(undefined));
  }
  yield put(setLoader(false));
}

export default function* userSaga() {
  yield takeLatest(getResultSearchUser, fetchResultSearchUser);
}
