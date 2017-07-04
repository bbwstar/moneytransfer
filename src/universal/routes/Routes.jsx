// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import AppContainer from 'containers/App/AppContainer';
import RouteMap from './RouteMap';

const Routes = (props) => {
  const { location } = props;

  return (
    <AppContainer location={location}>
      <div>
        <Route exact location={location} path="/" component={RouteMap.Home} />
        <Route exact location={location} path="/counter" component={RouteMap.Counter} />
        <Route exact location={location} path="/reviews" component={RouteMap.ReviewsList} />
      </div>
    </AppContainer>
  );
};

Routes.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default Routes;
