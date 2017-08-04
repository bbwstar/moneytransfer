import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  searchPlaceholder: {
    id: 'components.home.countries.searchPlaceholder',
    defaultMessage: 'Search all money transfer providers',
  },
});

const Countries = ({ intl: { formatMessage } }) =>
  (<section className="hero is-medium">
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="tile is-vertical">
          <h2 className="title is-primary is-2 is-spaced mb-3">
            <FormattedMessage
              id="components.home.countries.title"
              defaultMessage="Where are you sending your money to?"
            />
          </h2>
          <div className="columns">
            <div className="column">
              <h2 className="title is-3">
                <FormattedMessage id="americas" defaultMessage="Americas" />
              </h2>
            </div>
            <div className="column">
              <h2 className="title is-3">
                <FormattedMessage id="europe" defaultMessage="Europe" />
              </h2>
            </div>
            <div className="column">
              <h2 className="title is-3">
                <FormattedMessage id="asia" defaultMessage="Asia" />
              </h2>
            </div>
            <div className="column">
              <h2 className="title is-3">
                <FormattedMessage id="africa" defaultMessage="Africa" />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="hero-footer mb-3">
      <div className="container">
        <div className="columns">
          <div className="column is-half-tablet is-offset-one-quarter-tablet">
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input is-medium"
                  type="text"
                  placeholder={formatMessage(messages.searchPlaceholder)}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-search" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>);

Countries.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectIntl(Countries);
