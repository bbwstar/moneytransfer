import reducer, { actions, types, selectors } from '../reducer';

describe('(Reducers/Action Creators) Quote', () => {
  it('should receive quotes default state', () => {
    const result = reducer();

    expect(result).toEqual({});
  });

  it('should receive quotes', () => {
    const action = actions.receiveQuote('Title', { amount: 1000 });
    const result = reducer([], action);

    expect(result).toEqual({ Title: { amount: 1000 } });
  });

  it('should request quotes', () => {
    const params = {
      target: 'Europe',
      amount: 1000,
    };
    expect(actions.requestQuotes(params)).toEqual({
      params,
      type: types.QUOTES_REQUEST,
    });
  });

  it('should get quote from state', () => {
    const quote = { quote: { amount: 1000 } };
    const state = { quotes: quote };
    expect(selectors.getQuotes(state)).toEqual(quote);
  });
});
