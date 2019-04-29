import { connect } from 'react-redux';

import OrderHistory from './OrderHistory';

import * as orderHistoryActions from '../../../../redux/actions/profilePageActions/orderHistoryActions';

import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
    return {
      SessionReducer: state.SessionReducer,
      TokenReducer: state.TokenReducer,
      EnsembleReducer: state.EnsembleReducer,
      InstitutionReducer: state.InstitutionReducer,
      ActiveLanguageReducer: state.ActiveLanguageReducer,
      PublisherReducer: state.PublisherReducer,
      ordersHistory: state.ordersHistory
    };
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...orderHistoryActions
    }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderHistory);
  