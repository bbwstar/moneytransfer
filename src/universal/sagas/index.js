import { all, fork } from 'redux-saga/effects';

import watchRequestReviews from 'sagas/reviews';
import watchRequestPhotos from 'sagas/photos';

export default function* rootSaga() {
  yield all([fork(watchRequestReviews), fork(watchRequestPhotos)]);
}
