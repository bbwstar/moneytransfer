/* eslint global-require: 0 */

// Node Modules
import fs from 'fs';
import { basename, join } from 'path';

// Libraries
import React from 'react';
import { renderToString } from 'react-dom/server';
import createHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import acceptLanguage from 'accept-language';
import { addLocaleData, IntlProvider } from 'react-intl';

import en from 'react-intl/locale-data/en';
import cs from 'react-intl/locale-data/cs';
// Redux
// import {push} from 'react-router-redux';
import createStore from 'universal/redux/createStore';
import rootSaga from 'universal/sagas/index';

// Components
import Html from 'server/Html';

acceptLanguage.languages(['en', 'cs']);
addLocaleData([...en, ...cs]);
const messages = {};
const localeData = {};
['en', 'cs'].forEach((locale) => {
  localeData[locale] = fs
    .readFileSync(join(__dirname, `../../node_modules/react-intl/locale-data/${locale}.js`))
    .toString();
  /* eslint import/no-dynamic-require: 0 */
  messages[locale] = require(`../../public/lang/${locale}.json`);
  /* eslint import/no-dynamic-require: 1 */
});

function renderApp(url, res, locale, assets) {
  const PROD = process.env.NODE_ENV === 'production';
  const Layout = PROD ? require('../../build/prerender.js').default : () => {};
  const context = {
    splitPoints: [], // Create an empty array should be filled in StaticRouter
  };

  const history = createHistory();
  const store = createStore(history);

  const rootComponent = PROD
    ? (<Provider store={store}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <StaticRouter location={url} context={context}>
          <Layout />
        </StaticRouter>
      </IntlProvider>
    </Provider>)
    : null;

  store.runSaga(rootSaga).done.then(() => {
    // get state from store after sagas were run and strigify it for rendering in HTML
    const state = store.getState();
    const initialState = `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`;
    const splitPoints = `window.__SPLIT_POINTS__ = ${JSON.stringify(context.splitPoints)}`;

    const html = renderToString(
      <Html
        PROD={PROD}
        assets={assets}
        rootComponent={rootComponent}
        initialState={initialState}
        splitPoints={splitPoints}
        localeData={localeData[locale]}
      />,
    );

    res.cookie('locale', locale, { maxAge: new Date().getTime() + 31536000 });
    res.send(`<!DOCTYPE html>${html}`);
  });
  if (PROD) {
    // Do first render, trigger sagas for component to run
    renderToString(rootComponent);
  }

  // Dispatch a close event so sagas stop listening after they're resolved
  store.closeSagas();
}

function detectLocale(req) {
  const cookieLocale = req.cookies.locale;

  return acceptLanguage.get(cookieLocale || req.headers['accept-language']) || 'en';
}

export const renderPage = (req, res) => {
  const locale = detectLocale(req);

  const assets = require('../../build/assets.json');
  assets.manifest.text = fs.readFileSync(join(__dirname, '..', '..', 'build', basename(assets.manifest.js)), 'utf-8');

  renderApp(req.url, res, locale, assets);
};

export const renderDevPage = (req, res) => {
  const locale = detectLocale(req);
  renderApp(req.url, res, locale);
};

export default renderPage;
