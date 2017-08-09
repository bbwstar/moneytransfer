import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import reducer, { types } from 'modules/quote/reducer';
import watchRequestTransferWise from '../transferWise';

jest.mock('utils/country/countryToCurrency');
const countryToCurrency = require('utils/country/countryToCurrency').default;

const params = {
  sourceAmount: 1000,
  sourceCountry: 'czech-republic',
  targetCountry: 'united-kingdom',
};

describe('TransferWise (IT Saga)', () => {
  it('should received quote and store it in the store', async () => {
    countryToCurrency.mockImplementationOnce(() => 'CZK').mockImplementationOnce(() => 'GBP');
    // Start up the saga tester
    const sagaTester = new SagaTester({
      initialState: { quotes: {} },
      reducers: { quotes: reducer },
    });
    sagaTester.start(watchRequestTransferWise);

    // Dispatch the event to start the saga
    sagaTester.dispatch({ type: types.QUOTES_REQUEST, params });

    // Hook into the success action
    await sagaTester.waitFor(types.QUOTES_RECEIVE);

    const state = sagaTester.getState();
    const { targetAmount, rate, fee } = state.quotes.transferWise;

    expect(targetAmount).toBeGreaterThanOrEqual(25);
    expect(targetAmount).toBeLessThanOrEqual(45);

    expect(rate).toBeGreaterThanOrEqual(0.02);
    expect(rate).toBeLessThanOrEqual(0.05);

    expect(fee).toBe(42);
  });

  it('should gracefully fail', () => {
    countryToCurrency.mockImplementationOnce(() => 'CZK').mockImplementationOnce(() => 'GBP');

    const mockAxios = new MockAdapter(axios);
    mockAxios
      .onGet('https://api.transferwise.com/v1/quotes?sourceAmount=1000&source=CZK&target=GBP&rateType=FIXED')
      .networkError();

    // Start up the saga tester
    const sagaTester = new SagaTester({
      initialState: { quotes: {} },
    });
    sagaTester.start(watchRequestTransferWise);

    // Dispatch the event to start the saga
    sagaTester.dispatch({ type: types.QUOTES_REQUEST, params });
  });
});
