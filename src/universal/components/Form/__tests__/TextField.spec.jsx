import React from 'react';
import { FormattedMessage } from 'react-intl';
import { mountWithIntl } from 'utils/intl-enzyme-test-helper';
import toJson from 'enzyme-to-json';

import TextField from '../TextField';

const handleChange = jest.fn();
const wrapper = mountWithIntl(
  <TextField
    name="test"
    nameFormattedMessage={<FormattedMessage id="testMessage" defaultMessage="testMessage" />}
    value="defaultValue"
    handleChange={handleChange}
  />,
);

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
