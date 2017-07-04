import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Navigation from 'components/Navigation/Navigation';

export default class ReviewsList extends Component {
  static defaultProps = {
    reviews: [],
  };

  static propTypes = {
    requestReviews: PropTypes.func.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.array.isRequired,
        advantages: PropTypes.array.isRequired,
        disadvantages: PropTypes.array.isRequired,
      }),
    ).isRequired,
  };

  constructor(props) {
    super(props);

    this.props.requestReviews();
  }

  render() {
    return (
      <div>
        <Navigation />
        <div className="hero">
          {this.props.reviews
            ? this.props.reviews.map(review =>
              (<div key={review.title} className="hero-body">
                <div className="container">
                  <div className="columns">
                    <div className="column is-two-thirds-desktop">
                      <div className="content">
                        <h2 className="title is-4">
                          <Link to={`/reviews/${review.title}`}>{review.title}</Link>
                        </h2>
                        <p>{review.description}</p>
                        <h3 className="title is-5">
                          <FormattedMessage id="advantages" defaultMessage="Advantages" />
                        </h3>
                        <ul>
                          {review.advantages.map((value, index) =>
                            (<li key={index}>
                              {value}
                            </li>),
                          )}
                        </ul>
                        <h3 className="title is-5">
                          <FormattedMessage id="disadvantages" defaultMessage="Disadvantages" />
                        </h3>
                        <ul>
                          {review.disadvantages.map((value, index) =>
                            (<li key={index}>
                              {value}
                            </li>),
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>),
            )
            : 'Loading...'}
        </div>
      </div>
    );
  }
}
