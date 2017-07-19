import reducer, { types } from 'modules/review/reducer';
import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import watchRequestReviews from '../reviews';

const mockAxios = new MockAdapter(axios);

describe('(IT Saga) Reviews', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should received reviews and store them in store', async () => {
    const services = [
      {
        title: 'Title',
        description: 'Description',
        advantages: [
          'Advantage 1',
        ],
        disadvantages: [
          'Disadvatantage 1',
        ],
      },
    ];
    const responseData = [{
      id: '595bdb2204b1aa3a7b737165',
      locale: 'en',
      services,
    }];

    mockAxios.onGet('/api/reviews?filter[where][locale]=en').reply(200, responseData);

    // Start up the saga tester
    const sagaTester = new SagaTester({
      initialState: { reviews: [] },
      reducers: { reviews: reducer },
    });
    sagaTester.start(watchRequestReviews);

    // Dispatch the event to start the saga
    sagaTester.dispatch({ type: types.REVIEWS_REQUEST, locale: 'en' });

    // Hook into the success action
    await sagaTester.waitFor(types.REVIEWS_RECEIVE);

    expect(sagaTester.getState()).toEqual({
      reviews: { en: services },
    });
  });

  it('should gracefully fail', async () => {
    // TODO error scenario
  });
});
