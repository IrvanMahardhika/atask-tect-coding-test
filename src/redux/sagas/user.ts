import { call, put, takeLatest } from 'redux-saga/effects';

import { ITEMS_PER_PAGE } from 'constants/config';

import { setResultSearchUser, getResultSearchUser } from '../actions/user';

import api from '../sagas/api/api';

export function* fetchResultSearchUser({
  payload
}: {
  payload: { username: string };
}) {
  const apiConfig = {
    path: `https://api.github.com/search/users?per_page=${ITEMS_PER_PAGE}&q=${payload.username}`,
    method: 'GET'
  };
  const res: UserState['resultSearchUserState'] = yield call(api, apiConfig);

  if (res?.status === 200) {
    yield put(setResultSearchUser(res));
  } else {
    yield put(setResultSearchUser(undefined));
  }
}

export default function* userSaga() {
  yield takeLatest(getResultSearchUser, fetchResultSearchUser);
}
