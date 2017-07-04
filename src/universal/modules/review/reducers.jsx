export const types = {
  REVIEWS_REQUEST: 'REVIEWS_REQUEST',
  REVIEWS_RECEIVE: 'REVIEWS_RECEIVE',
};

export default (state = [], action = {}) => {
  switch (action.type) {
    case types.REVIEWS_RECEIVE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const actions = {
  requestReviews: locale => ({ type: types.REVIEWS_REQUEST, locale }),
  receiveReviews: (locale, payload) => ({ type: types.REVIEWS_RECEIVE, payload: { [locale]: payload } }),
};

export const selectors = {
  getReviews: (state, locale) => state.reviews[locale],
};
