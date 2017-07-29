import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../Loading';

const wrapper = shallow(<Loading />);

describe('Loading (Component)', () => {
  it('renders without exploding', () => {
    expect(wrapper).toHaveLength(1);
  });
});
