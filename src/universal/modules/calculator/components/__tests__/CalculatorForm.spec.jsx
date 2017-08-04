import React from 'react';
import toJson from 'enzyme-to-json';
import { mountWithIntl } from 'utils/intl-enzyme-test-helper';

import CalculatorForm from '../CalculatorForm';

let wrapper;
const changePage = jest.fn();

describe('CalculatorForm (Component)', () => {
  beforeEach(() => {
    wrapper = mountWithIntl(<CalculatorForm changePage={changePage} />);
  });

  it('renders without exploding', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('match the snaphost', () => {
    const tree = toJson(wrapper);

    expect(tree).toMatchSnapshot();
  });

  it('changes value of from select', () => {
    expect(wrapper.find('#from').props().value).toBe('');
    wrapper.find('#from').simulate('change', { target: { value: 'From new value', name: 'from' } });

    expect(wrapper.find('#from').props().value).toBe('From new value');
  });

  it('changes value of to select', () => {
    expect(wrapper.find('#to').props().value).toBe('');
    wrapper.find('#to').simulate('change', { target: { value: 'To new value', name: 'to' } });

    expect(wrapper.find('#to').props().value).toBe('To new value');
  });

  it('changes value of type select', () => {
    expect(wrapper.find('#type').props().value).toBe('sent');
    wrapper.find('#type').simulate('change', { target: { value: 'Type new value', name: 'type' } });

    expect(wrapper.find('#type').props().value).toBe('Type new value');
  });

  it('changes value of amount text field', () => {
    expect(wrapper.find('#amount').props().value).toBe('1000');
    wrapper.find('#amount').simulate('change', { target: { value: '50', name: 'amount' } });

    expect(wrapper.find('#amount').props().value).toBe('50');
  });

  describe('submit the form', () => {
    it('redirects to result page after submit', () => {
      wrapper.setState({ from: 'Italy', to: 'Czech republic', type: 'Send', amount: '1000' });

      wrapper.find('button').simulate('submit');

      expect(changePage).toBeCalledWith('/send-money/italy/czech-republic/1000');
    });

    it('prevents default action onSubmit', () => {
      const e = { preventDefault: jest.fn() };
      wrapper.find('button').simulate('submit', e);

      expect(e.preventDefault).toBeCalled();
    });
  });
});
