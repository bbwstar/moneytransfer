/* eslint no-console: 0 */

import { takeLatest, call, put, select } from 'redux-saga/effects';
import { actions, types, selectors } from 'modules/article/reducer';
import * as api from 'api';

export function* requestArticle({ locale, name }) {
  console.log(locale);
  const cachedArticle = yield select(selectors.getArticle, name);
  if (!cachedArticle) {
    try {
      const uri = `http://transfermoney.cz/wp-json/wp/v2/pages?slug=${name}`;
      const response = yield call(api.get, uri);
      // console.log(response.data[0].content.rendered);
      yield put(actions.receiveArticle(name, response.data[0].content.rendered));
    } catch (error) {
      console.log(`Article request failed ${error}`);
    }
  }
}

// Saga Helper
export default function* watchRequestArticle() {
  yield takeLatest(types.ARTICLE_REQUEST, requestArticle);
}
