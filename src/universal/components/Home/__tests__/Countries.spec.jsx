import React from 'react';
import { shallow } from 'enzyme';
import Countries from '../Countries';

const wrapper = shallow(<Countries />);

describe('Countries (Component)', () => {
  it('renders without exploding', () => {
    expect(wrapper).toHaveLength(1);
  });
});
