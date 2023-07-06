import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../sagas/api/api';
import { getRepos, setRepos } from '../actions/repo';
import { setLoader } from '../actions/loader';

export function* fetchGetRepos({ payload }: { payload: { userList: User[] } }) {
  yield put(setLoader(true));
  const fetchRepos = payload.userList.map((u) => {
    const fetchRepoApiConfig = {
      path: u.repos_url,
      method: 'GET'
    };
    return call(api, fetchRepoApiConfig);
  });

  const resultGetRepos: RepoState['resultGetRepo'] = yield all(fetchRepos);

  yield put(setRepos(resultGetRepos));
  yield put(setLoader(false));
}

export default function* repoSaga() {
  yield takeLatest(getRepos, fetchGetRepos);
}
