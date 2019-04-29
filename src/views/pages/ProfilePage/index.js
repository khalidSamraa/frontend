import { connect } from 'react-redux';

import ProfilePage from './ProfilePage';
import * as profilePageActions from '../../../redux/actions/profilePageActions'
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
    return {
      SessionReducer: state.SessionReducer,
      TokenReducer: state.TokenReducer,
      EnsembleReducer: state.EnsembleReducer,
      InstitutionReducer: state.InstitutionReducer,
      ActiveLanguageReducer: state.ActiveLanguageReducer,
      PublisherReducer: state.PublisherReducer,
      userDetails: state.userDetails
    };
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
      ...profilePageActions
    }, dispatch)
  });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);
  