import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import QuotesList from '../../components/QuotesList';
import QuotesListContainer from '../QuotesListContainer';

const store = configureMockStore()({});
const params = {
  sourceCountry: 'UK',
  targetCountry: 'Germany',
  sourceAmou: 1000,
};
const match = {
  params,
};

let wrapper;

describe('(Container) QuotesListContainer', () => {
  beforeEach(() => {
    wrapper = shallow(<QuotesListContainer match={match} />, { context: { store } });
  });

  it('should render component', () => {
    expect(wrapper.find(QuotesList)).toHaveLength(1);
  });

  it('dispatches requestQuotes action', () => {
    wrapper.find(QuotesList).props().requestQuotes();

    expect(store.getActions()).toEqual([{ params, type: 'QUOTES_REQUEST' }]);
  });
});
