import { call } from 'redux-saga/effects';

import { ApiOptions } from 'types/api';

import request from '../../../utils/request';

export default function* apiSaga(
  apiOptions: ApiOptions
): Generator<unknown, unknown, Promise<unknown>> {
  let response = null;

  try {
    response = yield call(request, apiOptions);
  } catch (failedResponse) {
    // eslint-disable-next-line no-console
    console.log(failedResponse);
  } finally {
    // eslint-disable-next-line no-console
  }

  return response;
}
