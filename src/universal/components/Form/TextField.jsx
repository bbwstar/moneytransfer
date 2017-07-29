import React from 'react';
import PropTypes from 'prop-types';

const TextField = props =>
  (<div className="field">
    <label className="label" htmlFor={props.name.toLowerCase()}>
      {props.name}
    </label>
    <p className="control">
      <input
        type="text"
        id={props.name.toLowerCase()}
        name={props.name.toLowerCase()}
        value={props.value}
        onChange={props.handleChange}
        className="input is-medium is-fullwidth"
      />
    </p>
  </div>);

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default TextField;
