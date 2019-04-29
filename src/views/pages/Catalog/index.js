import { connect } from 'react-redux';

import Catalog from './Catalog';

import { getProducts } from '../../../redux/actionCreators';

const mapStateToProps = state => {
  return {
    ActiveLanguageReducer: state.ActiveLanguageReducer,
    Product: state.Product
  };
};

const mapDispatchToProps = {
  getProducts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog);
