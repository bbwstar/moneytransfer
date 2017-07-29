import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import CalculatorForm from '../components/CalculatorForm';

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  changePage: url => dispatch(push(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorForm);
