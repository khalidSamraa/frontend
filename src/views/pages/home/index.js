import {connect} from "react-redux"

import HomeScreen from './home';

const mapStateToProps = (state) => {
    return {
      SessionReducer        : state.SessionReducer,
      Token                 : state.TokenReducer,
      SearchReducer         : state.SearchReducer,
      ActiveLanguageReducer : state.ActiveLanguageReducer,
      ActiveCurrencyReducer : state.ActiveCurrencyReducer,
      ActiveLocationReducer : state.ActiveLocationReducer,
      LanguageReducer       : state.LanguageReducer
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      RunRedux: (data) => {
        dispatch(data)
      }
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)