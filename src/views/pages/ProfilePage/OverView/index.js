import { connect } from 'react-redux';

import OverView from './OverView';
import {getAddresses} from '../../../../redux/actions/profilePageActions/addressesActions'
import {getCards} from '../../../../redux/actions/profilePageActions/paymentManagementActions'
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
      cards: state.cards
    };
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
      getAddresses,
      getCards
    }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverView);
  