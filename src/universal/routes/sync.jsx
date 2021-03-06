/* eslint global-require: 0 */

import React from 'react';
import { PropTypes } from 'prop-types';

function syncComponent(chunkName, mod) {
  const Component = mod.default ? mod.default : mod; // es6 module compat

  function SyncComponent(props) {
    if (props.staticContext && props.staticContext.splitPoints) {
      // PropTypes are set and wrong error is shown
      /* eslint react/prop-types: 0 */
      props.staticContext.splitPoints.push(chunkName);
    }

    return <Component {...props} />;
  }

  SyncComponent.defaultProps = {
    staticContext: [],
  };

  SyncComponent.propTypes = {
    staticContext: PropTypes.arrayOf(PropTypes.shape({ splitPoints: PropTypes.array })),
  };

  return SyncComponent;
}

export const Home = syncComponent('Home', require('components/Home/Home'));
export const ReviewsList = syncComponent('ReviewsList', require('modules/review/containers/ReviewsListContainer'));
export const QuotesList = syncComponent('QuotesList', require('modules/quote/containers/QuotesListContainer'));
export const Article = syncComponent('Article', require('modules/article/containers/ArticleContainer'));
