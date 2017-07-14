import React from 'react';
import { shallow } from 'enzyme';
import Home from '../Home';

const wrapper = shallow(<Home />);

describe('Home (Component)', () => {
  it('renders without exploding', () => {
    expect(wrapper).toHaveLength(1);
  });
});
