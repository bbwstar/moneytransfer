/* eslint no-console: 0 */

import { takeLatest, call, put } from 'redux-saga/effects';
import { actions, types } from 'modules/quote/reducer';
import countryToCurrency from 'utils/country/countryToCurrency';
import * as api from 'api';

const transferWiseConfig = {
  headers: {
    'Content-Type': 'text/plain',
    'x-authorization-key': 'dad99d7d8e52c2c8aaf9fda788d8acdc',
  },
};

export function* requestTransferWise({ params }) {
  const { sourceAmount, sourceCountry, targetCountry } = params;
  const query = {
    sourceAmount,
    source: countryToCurrency(sourceCountry),
    target: countryToCurrency(targetCountry),
    rateType: 'FIXED',
  };
  const uri = 'https://api.transferwise.com/v1/quotes';
  try {
    const response = yield call(api.get, uri, query, transferWiseConfig);
    const data = response.data;
    const payload = {
      targetAmount: data.targetAmount,
      rate: data.rate,
      fee: data.fee,
    };

    yield put(actions.receiveQuote('transferWise', payload));
  } catch (error) {
    console.log(`TransferWise request failed ${error}`);
  }
}

// Saga Helper
export default function* watchRequestTransferWise() {
  yield takeLatest(types.QUOTES_REQUEST, requestTransferWise);
}
