import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreatePublisherInstitution from '../../component/CreatePublisherInstitution';

import Presenter from '../../../institution/presenter';
import RequestMapper from '../../../institution/utils/request';

class CreateInstitution extends Component {
  onSubmit = data => {
    const payload = {
      ...this,
      ...data
    };

    Presenter.Register(
      RequestMapper.Register(payload, this.onSuccess, this.onFailed)
    );
  };

  onSuccess = (params, response) => {
    this.props.history.push('/manage-institution');
  };

  onFailed = response => {
    console.log(response);
  };

  render() {
    const { onSubmit, onSuccess, onFailed } = this;

    return (
      <CreatePublisherInstitution
        type="institution"
        onSubmit={onSubmit}
        onSuccess={onSuccess}
        onFailed={onFailed}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    SessionReducer: state.SessionReducer,
    TokenReducer: state.TokenReducer,
    ActiveLanguageReducer: state.ActiveLanguageReducer
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
)(CreateInstitution);
