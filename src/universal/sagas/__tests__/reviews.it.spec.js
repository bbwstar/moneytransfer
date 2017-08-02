import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { select } from 'redux-saga/effects';

import reducer, { types, selectors } from 'modules/review/reducer';

import watchRequestReviews, { requestReviews } from '../reviews';

const mockAxios = new MockAdapter(axios);

describe('(Saga) Reviews', () => {
  it('should not fetch reviews when in store', () => {
    const gen = requestReviews({ locale: 'en' });

    expect(gen.next().value).toEqual(select(selectors.getReviews, 'en'));
    expect(gen.next({ reviews: { en: 'English Review' } }).done).toBeTruthy();
  });
});

describe('(IT Saga) Reviews', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should received reviews and store them in store', async () => {
    const services = [
      {
        title: 'Title',
        description: 'Description',
        advantages: ['Advantage 1'],
        disadvantages: ['Disadvatantage 1'],
      },
    ];

    mockAxios.onGet('/api/reviews/en/servicesRel').reply(200, services);

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
