import reducer, { actions, types, selectors } from '../reducer';

describe('Article (Reducers/Action Creators) ', () => {
  it('should receive articles default state', () => {
    const result = reducer();

    expect(result).toEqual([]);
  });

  it('should receive article', () => {
    const action = actions.receiveArticle('Name', 'Very long article.');
    const result = reducer([], action);

    expect(result).toEqual({ Name: 'Very long article.' });
  });

  it('should request article', () => {
    expect(actions.requestArticle('cs', 'Name')).toEqual({
      locale: 'cs',
      name: 'Name',
      type: types.ARTICLE_REQUEST,
    });
  });

  it('should get article from state by name', () => {
    const state = { articles: { Name: 'Very long article' } };
    expect(selectors.getArticle(state, 'Name')).toEqual('Very long article');
  });
});
