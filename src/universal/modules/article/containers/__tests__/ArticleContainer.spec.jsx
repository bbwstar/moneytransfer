import React from 'react';
import { shallowWithIntl } from 'utils/intl-enzyme-test-helper';
import configureMockStore from 'redux-mock-store';

import Article from '../../components/Article';
import ArticleContainer from '../ArticleContainer';

const mockStore = configureMockStore();
const storeStateMock = {
  articles: {},
};
const match = {
  params: {
    name: 'Name',
  },
};

let store;
let wrapper;
describe('ArticleContainer (Container)', () => {
  beforeEach(() => {
    store = mockStore(storeStateMock);

    wrapper = shallowWithIntl(<ArticleContainer store={store} match={match} />);
  });

  it('should render component', () => {
    expect(wrapper.find(Article)).toHaveLength(1);
  });

  it('dispatches requestArticle action', () => {
    wrapper.find(Article).props().requestArticle();

    expect(store.getActions()).toEqual([{ locale: 'en', name: 'Name', type: 'ARTICLE_REQUEST' }]);
  });
});
