import React from 'react';
import { shallow } from 'enzyme';

import Review from '../Review';

let wrapper;

describe('Review (Component)', () => {
  beforeEach(() => {
    wrapper = shallow(
      <Review
        title={'title'}
        description={'description'}
        advantages={['First advantage', 'Second advantage']}
        disadvantages={['First disadvantage']}
      />,
    );
  });

  it('renders without exploding', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders advantages', () => {
    expect(wrapper.find('ul').first().children()).toHaveLength(2);
  });

  it('renders disadvantages', () => {
    expect(wrapper.find('ul').at(1).children()).toHaveLength(1);
  });
});
