import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import SelectField from '../SelectField';

const handleChange = jest.fn();
const options = [{ name: 'First Option', value: 'First Value' }, { name: 'Second Option' }];
const wrapper = mount(<SelectField name="test" value="defaultValue" handleChange={handleChange} options={options} />);

describe('TextField (Snapshot)', () => {
  it('renders without exploding', () => {
    const tree = toJson(wrapper);

    expect(tree).toMatchSnapshot();
  });

  it('calls handleChange function on input change', () => {
    wrapper.find('select').simulate('change');

    expect(handleChange).toBeCalled();
  });
});
