import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import QuotesList from '../../components/QuotesList';
import QuotesListContainer from '../QuotesListContainer';

const store = configureMockStore()({});

let wrapper;

describe('(Container) QuotesListContainer', () => {
  beforeEach(() => {
    wrapper = shallow(<QuotesListContainer />, { context: { store } });
  });

  it('should render component', () => {
    expect(wrapper.find(QuotesList)).toHaveLength(1);
  });

  // it('dispatches requestQuotes action', () => {
  //   wrapper.find(QuotesList).props().requestQuotes();

  //   expect(store.getActions()).toEqual([{ params: undefined, type: 'QUOTES_REQUEST' }]);
  // });
});
