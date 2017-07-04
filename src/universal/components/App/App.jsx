import React from 'react';
import PropTypes from 'prop-types';

import Navigation from 'components/Navigation/Navigation';
import 'styles/global.css';
import styles from './App.css';

const App = props =>
  (<div className={styles.app}>

    {props.location.pathname === '' ? <Navigation /> : ''}
    {props.children}

  </div>);

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
