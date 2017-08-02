export const types = {
  QUOTES_REQUEST: 'QUOTES_REQUEST',
  QUOTES_RECEIVE: 'QUOTES_RECEIVE',
};

export default (state = {}, action = {}) => {
  switch (action.type) {
    case types.QUOTES_RECEIVE:
      return {
        ...state,
        [action.title]: {
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export const actions = {
  requestQuotes: params => ({ type: types.QUOTES_REQUEST, params }),
  receiveQuote: (title, payload) => ({ type: types.QUOTES_RECEIVE, title, payload }),
};

export const selectors = {
  getQuotes: state => state.quotes,
};
