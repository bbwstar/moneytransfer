export const types = {
  ARTICLE_REQUEST: 'ARTICLE_REQUEST',
  ARTICLE_RECEIVE: 'ARTICLE_RECEIVE',
};

export default (state = [], action = {}) => {
  switch (action.type) {
    case types.ARTICLE_RECEIVE:
      return {
        ...state,
        [action.name]: action.payload,
      };

    default:
      return state;
  }
};

export const actions = {
  requestArticle: (locale, name) => ({ type: types.ARTICLE_REQUEST, locale, name }),
  receiveArticle: (name, payload) => ({ type: types.ARTICLE_RECEIVE, name, payload }),
};

export const selectors = {
  getArticle: (state, name) => state.articles[name],
};
