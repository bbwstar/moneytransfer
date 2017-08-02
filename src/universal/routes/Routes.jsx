// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import AppContainer from 'containers/App/AppContainer';
import RouteMap from './RouteMap';

const Routes = (props, { router }) => {
  const location = router.route.location;

  return (
    <AppContainer location={location}>
      <div>
        <Route exact location={location} path="/" component={RouteMap.Home} />
        <Route exact location={location} path="/reviews" component={RouteMap.ReviewsList} />
        <Route
          exact
          location={location}
          path="/send-money/:sourceCountry/:targetCountry/:sourceAmount"
          component={RouteMap.QuotesList}
        />
      </div>
    </AppContainer>
  );
};

Routes.contextTypes = {
  router: PropTypes.shape({
    route: PropTypes.object.isRequired,
  }),
};

export default Routes;
