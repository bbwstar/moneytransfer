import { createStore, combineReducers } from 'redux';
import * as Reducers from 'redux/reducers/index';

import reducer, { types, selectors } from '../reducer';

const store = createStore(combineReducers({
  ...Reducers,
}));

// check that initial state of the root reducer matches
// what child reducers return given an empty action
describe('(IT) Reviews', () => {
  it('should return reviews the initial state', () => {
    expect(store.getState().reviews).toEqual(reducer(undefined, {}));
  });

  it('should return reviews from the store', () => {
    const review = 'English Reviews';
    const action = { type: types.REVIEWS_RECEIVE, payload: { en: review } };
    store.dispatch(action);

    expect(selectors.getReviews(store.getState(), 'en')).toEqual(review);
  });
});
