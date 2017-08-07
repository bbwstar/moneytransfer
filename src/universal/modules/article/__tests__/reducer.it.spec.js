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
describe('Article (IT)', () => {
  it('should return articles the initial state', () => {
    expect(store.getState().articles).toEqual(reducer(undefined, {}));
  });

  it('should return article from the store', () => {
    const article = 'Very long article';
    const action = { type: types.ARTICLE_RECEIVE, name: 'Name', payload: article };
    store.dispatch(action);

    expect(selectors.getArticle(store.getState(), 'Name')).toEqual(article);
  });
});
