/* eslint no-console: 0 */

import { takeLatest, call, put } from 'redux-saga/effects';
import { actions, types } from 'modules/quote/reducer';
import countryToCurrency from 'utils/country/countryToCurrency';
import * as api from 'api';

export function* requestCurrencyFair({ params }) {
  const { sourceAmount, sourceCountry, targetCountry } = params;
  const query = {
    amount: sourceAmount,
    depositCurrency: countryToCurrency(sourceCountry),
    beneficiaryCurrency: countryToCurrency(targetCountry),
    mode: 'SELL',
  };
  const uri = 'http://localhost:8080/calculator/quicktrade-quote';
  try {
    const response = yield call(api.get, uri, query);
    const quote = response.data.quote;
    const { estimatedAmount, fee } = quote.estimatesByTransferType['1'];
    const rate = quote.estimate.rate;

    const payload = {
      targetAmount: estimatedAmount,
      fee,
      rate,
    };

    yield put(actions.receiveQuote('currencyFair', payload));
  } catch (error) {
    console.log(`CurrencyFair request failed ${error}`);
  }
}

// Saga Helper
export default function* watchRequestCurrencyFair() {
  yield takeLatest(types.QUOTES_REQUEST, requestCurrencyFair);
}
