import { connect } from 'react-redux';

import AddressForm from './AddressForm';


const mapStateToProps = state => {
    return {
      SessionReducer: state.SessionReducer,
      TokenReducer: state.TokenReducer,
      EnsembleReducer: state.EnsembleReducer,
      InstitutionReducer: state.InstitutionReducer,
      ActiveLanguageReducer: state.ActiveLanguageReducer,
      PublisherReducer: state.PublisherReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        RunRedux: data => {
            dispatch(data);
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddressForm);
  