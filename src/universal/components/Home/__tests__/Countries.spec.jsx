import React from 'react';
import { shallowWithIntl } from 'utils/intl-enzyme-test-helper';
import Countries from '../Countries';

const wrapper = shallowWithIntl(<Countries />);

describe('Countries (Component)', () => {
  it('renders without exploding', () => {
    expect(wrapper).toHaveLength(1);
  });
});
