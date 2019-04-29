import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Institution from './institution';
import { loadInterests } from '../../../redux/actions/InterestsAction';
import * as institutionAction from '../../../redux/actions/institutionAction';

const mapStateToProps = state => {
  return {
    SessionReducer: state.SessionReducer,
    TokenReducer: state.TokenReducer,
    InstitutionReducer: state.InstitutionReducer,
    ActiveLanguageReducer: state.ActiveLanguageReducer,
    interests: state.InterestsReducer.interests
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      loadInterests,
      ...institutionAction
    },
    dispatch
  ),
  RunRedux: data => {
    dispatch(data);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Institution);
