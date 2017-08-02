import React from 'react';
import { shallow } from 'enzyme';

import Quote from '../Quote';

let wrapper;

describe('Quote (Component)', () => {
  beforeEach(() => {
    wrapper = shallow(<Quote title={'title'} targetAmount={100.1} />);
  });

  it('renders without exploding', () => {
    expect(wrapper).toHaveLength(1);
  });
});
