import { select } from 'redux-saga/effects';
import { selectors } from 'modules/review/reducer';

import { requestReviews } from '../reviews';

describe('(Saga) Reviews', () => {
  it('should not fetch reviews when in store', () => {
    const gen = requestReviews({ locale: 'en' });

    expect(gen.next().value).toEqual(select(selectors.getReviews, 'en'));
    expect(gen.next({ reviews: { en: 'English Review' } }).done).toBeTruthy();
  });
});
