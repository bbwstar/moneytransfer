/* eslint global-require: 0 */
/* eslint no-underscore-dangle: 0*/
/* eslint import/no-extraneous-dependencies:0 */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import acceptLanguage from 'accept-language';
import * as axios from 'axios';
import Cookie from 'js-cookie';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import cs from 'react-intl/locale-data/cs';

import App from 'client/containers/AppContainer';
import createStore from 'universal/redux/createStore';
import rootSaga from 'universal/sagas/index';

acceptLanguage.languages(['en', 'cs']);
addLocaleData([...en, ...cs]);
const locale = Cookie.get('locale') || 'en';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__INITIAL_STATE__;
const splitPoints = window.__SPLIT_POINTS__ || [];

const history = createHistory();
const store = createStore(history, preloadedState);
store.rootTask = store.runSaga(rootSaga);

let renderApp;

axios
  .get(`/lang/${locale}.json`)
  .then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.data;
  })
  .then((localeData) => {
    addLocaleData(window.ReactIntlLocaleData[locale]);

    renderApp = (Component) => {
      render(
        <AppContainer>
          <IntlProvider locale={locale} messages={localeData}>
            <Provider store={store}>
              <Component history={history} />
            </Provider>
          </IntlProvider>
        </AppContainer>,
        document.getElementById('root'),
      );
    };

    const PROD = process.env.NODE_ENV === 'production';
    if (PROD) {
      // RouteMap can not be accessible outside of production
      // otherwise Hot Module Replacement wouldn't work as we would get async routes
      const RouteMap = require('universal/routes/RouteMap').default;
      // Wait for all promises to resolve before rendering.
      // These promises are returned by the loadComponent function on asyncComponent.
      Promise.all(splitPoints.map(chunk => RouteMap[chunk].loadComponent())).then(() => {
        renderApp(App);
      });
    } else {
      renderApp(App);
    }

    if (module.hot) {
      // Hot module replacement of components and containers
      module.hot.accept('client/containers/AppContainer', () => {
        const newApp = require('client/containers/AppContainer').default;
        renderApp(newApp);
      });

      module.hot.accept('universal/sagas', () => {
        // Dumm hot module replacement of sagas (running sagas are just cancelled)
        store.closeSagas();
        store.rootTask = store.runSaga(require('universal/sagas').default);
      });
    }
  })
  .catch((error) => {
    /* eslint no-console: 0 */
    console.error(error);
  });
