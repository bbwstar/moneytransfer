import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import reducer, { types } from 'modules/quote/reducer';
import watchRequestCurrencyFair from '../currencyFair';

jest.mock('utils/country/countryToCurrency');
const countryToCurrency = require('utils/country/countryToCurrency').default;

const mockAxios = new MockAdapter(axios);

const params = {
  sourceAmount: 1000,
  sourceCountry: 'czech-republic',
  targetCountry: 'united-kingdom',
};
const url =
  'http://localhost:8080/calculator/quicktrade-quote?amount=1000&depositCurrency=CZK&beneficiaryCurrency=GBP&mode=SELL';

describe('CurrencyFair (Saga)', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should received reviews and store them in store', async () => {
    countryToCurrency.mockImplementationOnce(() => 'CZK').mockImplementationOnce(() => 'GBP');

    const quote = {
      quote: {
        estimate: {
          rate: '0.03433',
        },
        estimatesByTransferType: {
          1: {
            fee: 2.5,
            estimatedAmount: 31.83,
          },
        },
      },
    };

    mockAxios.onGet(url).reply(200, quote);

    // Start up the saga tester
    const sagaTester = new SagaTester({
      initialState: { quotes: {} },
      reducers: { quotes: reducer },
    });
    sagaTester.start(watchRequestCurrencyFair);

    // Dispatch the event to start the saga
    sagaTester.dispatch({ type: types.QUOTES_REQUEST, params });

    // Hook into the success action
    await sagaTester.waitFor(types.QUOTES_RECEIVE);

    const state = sagaTester.getState();
    const { targetAmount, fee } = state.quotes.currencyFair;

    const rate = parseFloat(state.quotes.currencyFair.rate);

    expect(targetAmount).toBeGreaterThanOrEqual(25);
    expect(targetAmount).toBeLessThanOrEqual(45);

    expect(rate).toBeGreaterThanOrEqual(0.02);
    expect(rate).toBeLessThanOrEqual(0.05);

    expect(fee).toBe(2.5);
  });

  it('should gracefully fail', () => {
    countryToCurrency.mockImplementationOnce(() => 'CZK').mockImplementationOnce(() => 'GBP');

    mockAxios.onGet(url).networkError();

    // Start up the saga tester
    const sagaTester = new SagaTester({
      initialState: { quotes: {} },
    });
    sagaTester.start(watchRequestCurrencyFair);

    // Dispatch the event to start the saga
    sagaTester.dispatch({ type: types.QUOTES_REQUEST, params });
  });
});
