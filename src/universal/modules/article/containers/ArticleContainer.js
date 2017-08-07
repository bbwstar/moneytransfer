import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Article from '../components/Article';
import { actions, selectors } from '../reducer';

const mapStateToProps = (state, { match }) => ({
  article: selectors.getArticle(state, match.params.name),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestArticle: () => dispatch(actions.requestArticle(ownProps.intl.locale, ownProps.match.params.name)),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Article));
