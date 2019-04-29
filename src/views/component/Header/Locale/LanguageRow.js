import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

import { changeLanguage } from '../../../../redux/actions/ActiveLanguageAction.js';

const LanguageRow = props => {
  const {
    changeLanguage,
    ActiveLanguageReducer,
    LanguageReducer,
    isOpened,
    toogle
  } = props;
  const { name, native } = ActiveLanguageReducer;
  const reducer = LanguageReducer;

  let element = [];
  let key = 'languages';

  if (
    reducer.hasOwnProperty('data') &&
    (reducer.data !== null || reducer.data !== undefined) &&
    reducer.data.hasOwnProperty(key)
  ) {
    for (let i = 0; i < reducer.data[key].length; i++) {
      element.push(
        <li key={i} onClick={() => changeLanguage(reducer.data[key][i])}>
          <div>{reducer.data[key][i].native}</div>
          <div className="fb-70">{reducer.data[key][i].name}</div>
        </li>
      );
    }
  }

  // css = 'ctx-dropdown-lang';
  return (
    <div className="ctx-menu-row" onClick={() => toogle(!isOpened)}>
      <div className="ctx-menu-item text-left">{native}</div>
      <div className="ctx-menu-item text-left fb-60">{name}</div>
      <div className="select__arrow ctx-arrow-down" />
      <div
        className={classnames('ctx-dropdown header__ctx-dropdown', {
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
    ActiveLanguageReducer: state.ActiveLanguageReducer
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      changeLanguage
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageRow);
