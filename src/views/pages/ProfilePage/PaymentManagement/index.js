import { connect } from 'react-redux';

import PaymentManagement from './PaymentManagement';
import * as paymentManagementActions from '../../../../redux/actions/profilePageActions/paymentManagementActions'
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
    return {
      SessionReducer: state.SessionReducer,
      TokenReducer: state.TokenReducer,
      EnsembleReducer: state.EnsembleReducer,
      InstitutionReducer: state.InstitutionReducer,
      ActiveLanguageReducer: state.ActiveLanguageReducer,
      PublisherReducer: state.PublisherReducer,
      cards: state.cards
    };
};



const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
      ...paymentManagementActions
    }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentManagement);
  