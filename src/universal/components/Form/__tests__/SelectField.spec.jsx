import React from 'react';
import { FormattedMessage } from 'react-intl';
import toJson from 'enzyme-to-json';
import { mountWithIntl } from 'utils/intl-enzyme-test-helper';

import SelectField from '../SelectField';

const handleChange = jest.fn();
const options = [{ name: 'First Option', value: 'First Value' }, { name: 'Second Option' }];
const wrapper = mountWithIntl(
  <SelectField
    name="test"
    nameFormattedMessage={<FormattedMessage id="testMessage" defaultMessage="testMessage" />}
    value="defaultValue"
    handleChange={handleChange}
    options={options}
  />,
);

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
