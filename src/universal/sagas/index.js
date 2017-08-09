import { all, fork } from 'redux-saga/effects';

import watchRequestReviews from 'sagas/reviews';
import watchRequestArticle from 'sagas/article';
import watchRequestCurrencyFair from 'sagas/currencyFair';
import watchRequestTransferWise from 'sagas/transferWise';

export default function* rootSaga() {
  yield all([
    fork(watchRequestReviews),
    fork(watchRequestArticle),
    fork(watchRequestCurrencyFair),
    fork(watchRequestTransferWise),
  ]);
}
