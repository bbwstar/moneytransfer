/* eslint no-console: 0 */

import { takeLatest, call, put, select } from 'redux-saga/effects';
import { actions, types, selectors } from 'modules/review/reducer';
import * as api from 'api';

export function* requestReviews({ locale }) {
  const cachedReviews = yield select(selectors.getReviews, locale);
  if (!cachedReviews) {
    const uri = `/reviews/${locale}/servicesRel`;
    try {
      console.log(uri);
      const response = yield call(api.getOwnApi, uri);
      yield put(actions.receiveReviews(locale, response.data));
    } catch (error) {
      console.log(`Reviews request failed ${error}`);
    }
  }
}

// Saga Helper
export default function* watchRequestReviews() {
  yield takeLatest(types.REVIEWS_REQUEST, requestReviews);
}
