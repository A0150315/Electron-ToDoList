import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Editor from '../components/Editor';
import * as viewbroadcastActions from '../actions/viewbroadcast';

function mapStateToProps(state) {
  return {
    viewbroadcast: state.viewbroadcast
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(viewbroadcastActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
