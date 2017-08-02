import React from 'react';
import PropTypes from 'prop-types';

const Quote = props =>
  (<div>
    <div>
      {props.title}
    </div>
    <div>
      {props.targetAmount}
    </div>
  </div>);

Quote.propTypes = {
  title: PropTypes.string.isRequired,
  targetAmount: PropTypes.number.isRequired,
};

export default Quote;
