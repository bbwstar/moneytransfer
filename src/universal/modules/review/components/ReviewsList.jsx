import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Review from './Review';

export default class ReviewsList extends Component {
  static defaultProps = {
    reviews: [],
  };

  static propTypes = {
    requestReviews: PropTypes.func.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
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
      <div className="hero">
        {this.props.reviews
          ? this.props.reviews.map(review =>
            (<Review
              key={review.title}
              title={review.title}
              description={review.description}
              disadvantages={review.disadvantages}
              advantages={review.advantages}
            />),
          )
          : 'Loading...'}
      </div>
    );
  }
}
