// import { takeLatest } from 'redux-saga/effects';
import reducer, { types } from 'modules/review/reducer';
import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import watchRequestReviews from '../reviews';

const mockAxios = new MockAdapter(axios);

describe('(Saga) Reviews', () => {
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

  // https://github.com/redux-saga/redux-saga/issues/1077
  // it('should not fetch reviews when in store', async () => {
  //   const data = { locale: 'en' };
  //   const gen = watchRequestReviews();
  //   expect(gen.next().value).toEqual(takeLatest('REVIEWS_REQUEST', requestReviews()));
  //   // console.log(gen.next().value);

  //   // Start up the saga tester
  //   // const sagaTester = new SagaTester({
  //   //   initialState: { reviews: [] },
  //   //   reducers: { reviews: reducer },
  //   // });
  //   // sagaTester.start(watchRequestReviews);
  //   // sagaTester.dispatch({ type: types.REVIEWS_REQUEST, locale: 'en' });
  //   // console.log(sagaTester.getState());
  // });
});
