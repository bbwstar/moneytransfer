import React from 'react';
import { shallow } from 'enzyme';

import Review from '../Review';

const wrapper = shallow(
  <Review
    title={'title'}
    description={'description'}
    advantages={[]}
    disadvantages={[]}
  />,
);

describe('Review (Component)', () => {
  it('renders without exploding', () => {
    expect(wrapper).toHaveLength(1);
  });
});
