/* eslint no-console: 0 */

import { takeLatest, call, put, select } from 'redux-saga/effects';
import { actions, types, selectors } from 'modules/review/reducer';
import * as api from 'api';

export function* requestReviews({ locale }) {
  const cachedReviews = yield select(selectors.getReviews, locale);
  if (!cachedReviews) {
    try {
      const uri = `/reviews/${locale}/servicesRel`;
      const response = yield call(api.get, uri);
      yield put(actions.receiveReviews(locale, response.data));
    } catch (error) {
      console.log('Reviews request failed');
    }
  }
}

// Saga Helper
export default function* watchRequestReviews() {
  yield takeLatest(types.REVIEWS_REQUEST, requestReviews);
}
