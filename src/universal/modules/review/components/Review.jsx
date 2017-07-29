import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const Review = ({ title, description, advantages, disadvantages }) =>
  (<div className="hero-body">
    <div className="container">
      <div className="columns">
        <div className="column is-two-thirds-desktop">
          <div className="content">
            <h2 className="title is-4">
              <Link to={`/reviews/${title}`}>
                {title}
              </Link>
            </h2>
            <p>
              {description}
            </p>
            <h3 className="title is-5">
              <FormattedMessage id="advantages" defaultMessage="Advantages" />
            </h3>
            <ul>
              {advantages.map((value, index) =>
                (<li key={index}>
                  {value}
                </li>),
              )}
            </ul>
            <h3 className="title is-5">
              <FormattedMessage id="disadvantages" defaultMessage="Disadvantages" />
            </h3>
            <ul>
              {disadvantages.map((value, index) =>
                (<li key={index}>
                  {value}
                </li>),
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>);

Review.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  advantages: PropTypes.arrayOf(PropTypes.string).isRequired,
  disadvantages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Review;
