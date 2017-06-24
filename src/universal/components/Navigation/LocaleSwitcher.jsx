import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Cookie from 'js-cookie';

class LocaleSwitcher extends Component {
  handleClick = () => {
    Cookie.set('locale', this.props.intl.locale === 'en' ? 'cs' : 'en');
    window.location.reload();
  };

  render() {
    return (
      <a className="nav-item" onClick={this.handleClick} role="menuitem" tabIndex="0">
        {this.props.intl.locale === 'en' ? 'Čeština' : 'English'}
      </a>
    );
  }
}

LocaleSwitcher.propTypes = {
  intl: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
};

export default injectIntl(LocaleSwitcher);
