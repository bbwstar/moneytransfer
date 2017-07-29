import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectField from 'components/Form/SelectField';
import TextField from 'components/Form/TextField';
import convertToSlug from 'utils/url/convertToSlug';

class CalculatorForm extends Component {
  state = {
    from: '',
    to: '',
    amount: '1000',
    type: 'sent',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { from, to, type, amount } = this.state;
    const fromSlug = convertToSlug(from);
    const toSlug = convertToSlug(to);
    const typeSlug = convertToSlug(type);
    const amountSlug = convertToSlug(amount);

    this.props.changePage(`/${typeSlug}/${fromSlug}/${toSlug}/${amountSlug}`);
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const countriesOptions = [{ name: 'Czech Republic' }, { name: 'United Kingdom' }];
    const typeOptions = [{ name: 'Sent' }, { name: 'Receive' }];

    return (
      <div className="columns">
        <div className="column is-8 is-offset-2">
          <form onSubmit={this.handleSubmit}>
            <div className="columns">
              <div className="column">
                <SelectField
                  name="From"
                  handleChange={this.handleChange}
                  value={this.state.from}
                  options={countriesOptions}
                />
              </div>
              <div className="column">
                <SelectField
                  name="To"
                  handleChange={this.handleChange}
                  value={this.state.to}
                  options={countriesOptions}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <SelectField
                  name="Type"
                  handleChange={this.handleChange}
                  value={this.state.type}
                  options={typeOptions}
                />
              </div>
              <div className="column">
                <TextField name="Amount" handleChange={this.handleChange} value={this.state.amount} />
              </div>
            </div>
            <div className="columns">
              <div className="column is-2 is-offset-5 has-text-centered">
                <div className="tile is-parent">
                  <div className="field is-fullwidth">
                    <p className="control">
                      <button className="button is-primary is-medium is-fullwidth">Submit</button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CalculatorForm.propTypes = {
  changePage: PropTypes.func.isRequired,
};

export default CalculatorForm;
