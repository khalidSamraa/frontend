import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

import { changeCurrency } from '../../../../redux/actions/ActiveCurrencyAction.js';

const CurrencyRow = props => {
  const { changeCurrency, LanguageReducer, isOpened, toogle } = props;
  const reducer = LanguageReducer;
  const { name, code, symbol } = props.ActiveCurrencyReducer;

  let element = [];
  let key = 'currencies';

  if (
    reducer.hasOwnProperty('data') &&
    (reducer.data !== null || reducer.data !== undefined) &&
    reducer.data.hasOwnProperty(key)
  ) {
    for (let i = 0; i < reducer.data[key].length; i++) {
      element.push(
        <li key={i} onClick={() => changeCurrency(reducer.data[key][i])}>
          <div>{reducer.data[key][i].name}</div>
          <div className="fb-40">{reducer.data[key][i].code}</div>
          <div className="fb-20 mr-7">{reducer.data[key][i].symbol}</div>
        </li>
      );
    }
  }

  return (
    <div className="ctx-menu-row" onClick={() => toogle(!isOpened)}>
      <div className="ctx-menu-item text-left">{name}</div>
      <div className="ctx-menu-item text-left fb-40">{code}</div>
      <div className="ctx-menu-item text-left fb-20">{symbol}</div>
      <div className="select__arrow ctx-arrow-down" />
      <div
        style={{ zIndex: 8 }}
        className={classnames('ctx-dropdown', {
          'ctx-dropdown-open': isOpened
        })}
      >
        <ul>{element}</ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    LanguageReducer: state.LanguageReducer,
    ActiveCurrencyReducer: state.ActiveCurrencyReducer
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      changeCurrency
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyRow);
