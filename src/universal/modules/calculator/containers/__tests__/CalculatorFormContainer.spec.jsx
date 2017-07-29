import React from 'react';
import { shallow } from 'enzyme';
import { push } from 'react-router-redux';
import configureMockStore from 'redux-mock-store';

import CalculatorForm from '../../components/CalculatorForm';
import CalculatorFormContainer from '../CalculatorFormContainer';

const store = configureMockStore()({});

let wrapper;
describe('(Container) CalculatorFormContainer', () => {
  beforeEach(() => {
    wrapper = shallow(<CalculatorFormContainer />, { context: { store } });
  });

  it('renders without exploding', () => {
    expect(wrapper.find(CalculatorForm)).toHaveLength(1);
  });

  it('dispatches push action on changePage', () => {
    wrapper.find(CalculatorForm).props().changePage('/test');

    expect(store.getActions()).toEqual([push('/test')]);
  });
});
