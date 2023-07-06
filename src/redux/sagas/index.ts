import { fork } from 'redux-saga/effects';

import userSaga from './user';
import repoSaga from './repo';

export default function* () {
  yield fork(userSaga);
  yield fork(repoSaga);
}
