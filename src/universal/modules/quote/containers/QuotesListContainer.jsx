import { connect } from 'react-redux';

import QuotesList from '../components/QuotesList';
import { actions, selectors } from '../reducer';

const mapStateToProps = state => ({
  quotes: selectors.getQuotes(state),
});

const mapDispatchToProps = (dispatch, { match }) => ({
  requestQuotes: () => dispatch(actions.requestQuotes(match.params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuotesList);
