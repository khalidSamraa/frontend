import { connect } from 'react-redux';

import ContactsManagment from './ContactsManagment';
import * as contactsActions from '../../../../redux/actions/profilePageActions/contactsActions';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
    return {
      SessionReducer: state.SessionReducer,
      TokenReducer: state.TokenReducer,
      EnsembleReducer: state.EnsembleReducer,
      InstitutionReducer: state.InstitutionReducer,
      ActiveLanguageReducer: state.ActiveLanguageReducer,
      PublisherReducer: state.PublisherReducer,
      contacts: state.contacts
    };
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
      ...contactsActions
    }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactsManagment);
  