import React from 'react';
import { shallowWithIntl } from 'utils/intl-enzyme-test-helper';
import configureMockStore from 'redux-mock-store';

import ReviewsList from '../../components/ReviewsList';
import ReviewsListContainer from '../ReviewsListContainer';

const mockStore = configureMockStore();
const storeStateMock = {
  reviews: {
    en: [],
  },
};

let store;
let wrapper;
describe('ReviewsListContainer (Container)', () => {
  beforeEach(() => {
    store = mockStore(storeStateMock);
    wrapper = shallowWithIntl(<ReviewsListContainer store={store} />);
  });

  it('should render component', () => {
    expect(wrapper.find(ReviewsList)).toHaveLength(1);
  });
});
