import SagaTester from 'redux-saga-tester';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import { select } from 'redux-saga/effects';

import reducer, { types, selectors } from 'modules/review/reducer';

import watchRequestReviews, { requestReviews } from '../reviews';

const host = 'http://localhost:3000';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

describe('(Saga) Reviews', () => {
  it('should not fetch reviews when in store', () => {
    const gen = requestReviews({ locale: 'en' });

    expect(gen.next().value).toEqual(select(selectors.getReviews, 'en'));
    expect(gen.next({ reviews: { en: 'English Review' } }).done).toBeTruthy();
  });
});

describe('(IT Saga) Reviews', () => {
  it('should received reviews and store them in store', async () => {
    const services = [
      {
        title: 'Title',
        description: 'Description',
        advantages: ['Advantage 1'],
        disadvantages: ['Disadvatantage 1'],
      },
    ];

    nock(host).get('/api/reviews/en/servicesRel').reply(200, services);

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
    nock(host).get('/api/reviews/en/servicesRel').replyWithError('There was a network error');

    // Start up the saga tester
    const sagaTester = new SagaTester({
      initialState: { reviews: [] },
    });
    sagaTester.start(watchRequestReviews);

    // Dispatch the event to start the saga
    sagaTester.dispatch({ type: types.REVIEWS_REQUEST, locale: 'en' });
  });
});
