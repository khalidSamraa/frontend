import { connect } from 'react-redux';

import ManageAddresses from './ManageAddresses';

import * as addressesActions from '../../../../redux/actions/profilePageActions/addressesActions'
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
    return {
      SessionReducer: state.SessionReducer,
      TokenReducer: state.TokenReducer,
      EnsembleReducer: state.EnsembleReducer,
      InstitutionReducer: state.InstitutionReducer,
      ActiveLanguageReducer: state.ActiveLanguageReducer,
      PublisherReducer: state.PublisherReducer,
      addresses: state.addressesStatus,
      setAddressToDefaultStatus: state.setAddressToDefaultStatus,
      deleteAddressStatus: state.deleteAddressStatus
    };
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
      ...addressesActions
    }, dispatch)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageAddresses);
  