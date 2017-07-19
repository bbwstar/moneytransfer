import { all, fork } from 'redux-saga/effects';

import watchRequestReviews from 'sagas/reviews';

export default function* rootSaga() {
  yield all([fork(watchRequestReviews)]);
}
