import SagaTester from 'redux-saga-tester';

import reducer, { types } from 'modules/article/reducer';
import watchRequestArticle from '../article';

describe('Article (IT Saga)', () => {
  it('should received reviews and store them in store', async () => {
    // Start up the saga tester
    const sagaTester = new SagaTester({
      initialState: { articles: {} },
      reducers: { articles: reducer },
    });
    sagaTester.start(watchRequestArticle);

    // Dispatch the event to start the saga
    sagaTester.dispatch({ type: types.ARTICLE_REQUEST, name: 'TransferWise', locale: 'cs' });

    // Hook into the success action
    await sagaTester.waitFor(types.ARTICLE_RECEIVE);

    const state = sagaTester.getState();
    const transferWiseArticle = state.articles.TransferWise;

    expect(transferWiseArticle).not.toBe(undefined);
    expect(transferWiseArticle).not.toBe('');
  });

  it('should gracefully fail', async () => {
    // TODO error scenario
  });
});
