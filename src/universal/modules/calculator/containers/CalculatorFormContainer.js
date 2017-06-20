import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CalculatorForm from '../components/CalculatorForm';
import { actions, selectors } from '../reducer';

const mapStateToProps = state => ({
  albums: selectors.getAlbums(state),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorForm);
