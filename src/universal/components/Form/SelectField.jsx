import React from 'react';
import PropTypes from 'prop-types';

const SelectField = props =>
  (<div className="field">
    <label className="label" htmlFor={props.name}>
      {props.nameFormattedMessage}
    </label>
    <p className="control">
      <span className="select is-medium is-fullwidth">
        <select
          name={props.name.toLowerCase()}
          value={props.value}
          onChange={props.handleChange}
          id={props.name.toLowerCase()}
        >
          <option />
          {props.options.map(option =>
            (<option key={option.name} value={option.value ? option.value : option.name}>
              {option.name}
            </option>),
          )}
        </select>
      </span>
    </p>
  </div>);

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  nameFormattedMessage: PropTypes.element.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
};

export default SelectField;
