/* eslint no-console: 0 */

import { takeLatest, call, put, select } from 'redux-saga/effects';
import { actions, types, selectors } from 'modules/review/reducers';
import * as api from 'api';

function* requestReviews({ locale }) {
  const cachedReviews = yield select(selectors.getReviews, locale);
  if (!cachedReviews) {
    try {
      const uri = `/reviews?filter[where][locale]=${locale}`;
      const response = yield call(api.get, uri);
      yield put(actions.receiveReviews(locale, response.data[0].services));
    } catch (error) {
      console.log('Reviews request failed');
    }
  } else {
    console.log('Reviews already in store');
  }
}

export default function* watchRequestReviews() {
  yield takeLatest(types.REVIEWS_REQUEST, requestReviews);
}
