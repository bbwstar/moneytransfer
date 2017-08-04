import SagaTester from 'redux-saga-tester';

import reducer, { types } from 'modules/quote/reducer';
import watchRequestTransferWise from '../transferWise';

jest.mock('utils/country/countryToCurrency');
const countryToCurrency = require('utils/country/countryToCurrency').default;

describe('TransferWise (IT Saga)', () => {
  it('should received reviews and store them in store', async () => {
    countryToCurrency.mockImplementationOnce(() => 'CZK').mockImplementationOnce(() => 'GBP');

    // Start up the saga tester
    const sagaTester = new SagaTester({
      initialState: { quotes: {} },
      reducers: { quotes: reducer },
    });
    sagaTester.start(watchRequestTransferWise);

    // Dispatch the event to start the saga
    const params = {
      sourceAmount: 1000,
      sourceCountry: 'czech-republic',
      targetCountry: 'united-kingdom',
    };
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

  it('should gracefully fail', async () => {
    // TODO error scenario
  });
});
