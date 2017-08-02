import reducer, { actions, types, selectors } from '../reducer';

describe('(Reducers/Action Creators) Review', () => {
  it('should receive reviews default state', () => {
    const result = reducer();

    expect(result).toEqual([]);
  });

  it('should receive reviews', () => {
    const action = actions.receiveReviews('en', 'English Review');
    const result = reducer([], action);

    expect(result).toEqual({ en: 'English Review' });
  });

  it('should request reviews', () => {
    expect(actions.requestReviews('en')).toEqual({
      locale: 'en',
      type: types.REVIEWS_REQUEST,
    });
  });

  it('should get review from state by locale', () => {
    const state = { reviews: { en: 'English Review' } };
    expect(selectors.getReviews(state, 'en')).toEqual('English Review');
  });
});
