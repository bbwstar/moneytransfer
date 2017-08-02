import * as axios from 'axios';

// General API constants
export const URL = '/api';
export const AUTH_HEADER = 'Authorization';

const requestConfig = {
  headers: {
    'Content-Type': 'text/plain',
  },
};

//
// API GET
//
export function get(requestUrl, query = {}, config = requestConfig) {
  let urlQuery = Object.keys(query)
    .filter(key => key && query[key] !== '')
    .map((key) => {
      let result = '';
      if (typeof query[key] === 'string' || typeof query[key] === 'number') {
        result = `${key}=${encodeURIComponent(query[key])}`;
      } else if (Array.isArray(query[key])) {
        result = query[key].map(value => `${key}=${encodeURIComponent(value)}`).join('&');
      }
      return result;
    })
    .join('&');

  if (urlQuery !== '') {
    urlQuery = `?${urlQuery}`;
  }

  const promise = new Promise((resolve, reject) => {
    axios
      .get(requestUrl + urlQuery, config)
      .then((response) => {
        const data = response;
        resolve(data);
      })
      .catch((response) => {
        reject(response);
      });
  });

  return promise;
}

export function getFromOwnApi(endpoint) {
  return get(URL + endpoint);
}
