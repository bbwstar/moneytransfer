import React from 'react';
import { shallow } from 'enzyme';
import Description from '../Description';

const wrapper = shallow(<Description />);

describe('Description (Component)', () => {
  it('renders without exploding', () => {
    expect(wrapper).toHaveLength(1);
  });
});
