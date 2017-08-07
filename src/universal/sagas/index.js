import { all, fork } from 'redux-saga/effects';

import watchRequestReviews from 'sagas/reviews';
import watchRequestTransferWise from 'sagas/transferWise';
import watchRequestArticle from 'sagas/article';

export default function* rootSaga() {
  yield all([fork(watchRequestReviews), fork(watchRequestTransferWise), fork(watchRequestArticle)]);
}
