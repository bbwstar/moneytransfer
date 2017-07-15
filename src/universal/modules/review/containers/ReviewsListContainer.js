import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { injectIntl } from 'react-intl';

import ReviewsList from '../components/ReviewsList';
import { actions, selectors } from '../reducer';

const mapStateToProps = (state, { intl }) => ({
  reviews: selectors.getReviews(state, intl.locale),
});

const mapDispatchToProps = (dispatch, { intl }) => ({
  requestReviews: () => dispatch(actions.requestReviews(intl.locale)),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ReviewsList));
