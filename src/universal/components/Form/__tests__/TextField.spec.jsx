import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import TextField from '../TextField';

const handleChange = jest.fn();
const wrapper = mount(<TextField name="test" value="defaultValue" handleChange={handleChange} />);

describe('TextField (Snapshot)', () => {
  it('renders without exploding', () => {
    const tree = toJson(wrapper);

    expect(tree).toMatchSnapshot();
  });

  it('calls handleChange function on input change', () => {
    wrapper.find('input').simulate('change');

    expect(handleChange).toBeCalled();
  });
});
