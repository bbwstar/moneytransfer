import { createStore, combineReducers } from 'redux';
import * as Reducers from 'redux/reducers/index';

import reducer, { types, selectors } from '../reducer';

const store = createStore(
  combineReducers({
    ...Reducers,
  }),
);

// check that initial state of the root reducer matches
// what child reducers return given an empty action
describe('(IT) Reviews', () => {
  it('should return quotes the initial state', () => {
    expect(store.getState().quotes).toEqual(reducer(undefined, {}));
  });

  it('should return quotes from the store', () => {
    const title = 'Title';
    const payload = { amount: 1000, fee: 5 };
    const action = { type: types.QUOTES_RECEIVE, title, payload };
    store.dispatch(action);

    expect(selectors.getQuotes(store.getState())).toEqual({ Title: { amount: 1000, fee: 5 } });
  });
});
