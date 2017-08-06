import * as axios from 'axios';

// General API constants
export const URL = 'http://localhost:3000/api';
export const AUTH_HEADER = 'Authorization';

const requestConfig = {
  headers: {
    'Content-Type': 'text/plain',
  },
};

const requestConfigJSON = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const requestConfigFormData = {
  headers: {
    'Content-Type': 'multipart/form-data',
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

export function getOwnApi(endpoint) {
  return get(URL + endpoint);
}

//
// API POST
//
export function post(endpoint, body) {
  let config = requestConfig;
  let requestBody = body;

  if (body instanceof FormData) {
    config = Object.assign(config, requestConfigFormData);
  } else if (typeof body === 'object') {
    config = Object.assign(config, requestConfigJSON);
    requestBody = JSON.stringify(body);
  }

  // setAuthHeaders(config.headers);

  const promise = new Promise((resolve, reject) => {
    axios
      .post(endpoint, requestBody, config)
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

export function postOwnApi(endpoint) {
  return get(URL + endpoint);
}
