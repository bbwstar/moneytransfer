import React from 'react';
import { shallow } from 'enzyme';

import QuotesList from '../QuotesList';
import Quote from '../Quote';

describe('QuotesList', () => {
  let props;
  let shallowedComponent;

  const requestQuotes = jest.fn();
  const quoteList = () => {
    if (!shallowedComponent) {
      shallowedComponent = shallow(<QuotesList {...props} />);
    }
    return shallowedComponent;
  };

  beforeEach(() => {
    props = {
      requestQuotes,
    };
    shallowedComponent = undefined;
  });

  it('should render without quotes', () => {
    const wrapper = quoteList();
    expect(wrapper).toHaveLength(1);
  });

  it('should request quotes', () => {
    quoteList();
    expect(requestQuotes).toBeCalled();
  });

  it('should render Quotes component', () => {
    props.quotes = {
      quote1: { title: '1', targetAmount: 1, fee: 5.5, rate: 26.77 },
      quote2: { title: '2', targetAmount: 3 },
      quote3: { title: '3', targetAmount: 120, fee: 10 },
    };

    const wrapper = quoteList();

    expect(wrapper.find(Quote)).toHaveLength(3);
  });
});
