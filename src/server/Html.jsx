/* eslint global-require: 0 */
/* eslint react/no-danger: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { renderToString } from 'react-dom/server';

const Html = (props) => {
  const { initialState, rootComponent, assets, PROD, splitPoints } = props;

  const { manifest, app, vendor } = assets || {};

  return (
    <html lang="en">
      <head>
        <title>title2</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.2/css/bulma.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        {PROD && <link rel="stylesheet" href="/static/prerender.css" type="text/css" />}
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: initialState }} />
        <script dangerouslySetInnerHTML={{ __html: splitPoints }} />
        {PROD
          ? <div id="root" dangerouslySetInnerHTML={{ __html: renderToString(rootComponent) }} />
          : <div id="root" />}
        {PROD && <script dangerouslySetInnerHTML={{ __html: manifest.text }} />}
        {PROD && <script src={vendor.js} />}
        <script src={PROD ? app.js : '/static/app.js'} />
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container content has-text-centered is-medium">
              <p>© 2015-2017. All rights reserved.</p>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
};

Html.defaultProps = {
  assets: undefined,
  rootComponent: null,
};

Html.propTypes = {
  initialState: PropTypes.string.isRequired,
  splitPoints: PropTypes.string.isRequired,
  rootComponent: PropTypes.element,
  assets: PropTypes.shape({
    manifest: PropTypes.object,
    app: PropTypes.object,
    vendor: PropTypes.object,
  }),
  PROD: PropTypes.bool.isRequired,
};

export default Html;
