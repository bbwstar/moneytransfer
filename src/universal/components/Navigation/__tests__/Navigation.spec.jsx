import React from 'react';
import { shallow } from 'enzyme';
import Navigation from '../Navigation';

const wrapper = shallow(<Navigation />);

describe('Navigation (Component)', () => {
  it('renders without exploding', () => {
    expect(wrapper).toHaveLength(1);
  });
});
