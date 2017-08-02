import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Quote from './Quote';

export default class QuotesList extends Component {
  static defaultProps = {
    quotes: {},
  };

  static propTypes = {
    requestQuotes: PropTypes.func.isRequired,
    quotes: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);

    this.props.requestQuotes();
  }

  render() {
    const quotes = this.props.quotes;
    return (
      <div className="hero">
        {Object.keys(quotes).map(key =>
          (<Quote
            key={key}
            title={key}
            fee={quotes[key].fee}
            rate={quotes[key].rate}
            targetAmount={quotes[key].targetAmount}
          />),
        )}
      </div>
    );
  }
}
