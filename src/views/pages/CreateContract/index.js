import React, { Component } from 'react';
import { connect } from 'react-redux';

import DropDown from '../../component/DropDown';
import { InfoModal } from '../../component/Modal';

import PublisherPresenter from '../../../publisher/presenter';
import PublisherRequest from '../../../publisher/utils/request';
import Request from '../../../utils/Request';

import './styles.css';

class CreateContract extends Component {
  state = {
    page: 1,
    publishers: [],
    publisherId: '',
    contractName: '',
    comment: '',
    showModal: false
  };

  toggleModal = infoMsg =>
    this.setState({ showModal: !this.state.showModal, infoMsg });

  handleSubmit = e => {
    e.preventDefault();
    const {
      state: { publisherId, contractName, comment },
      props: { InstitutionReducer, TokenReducer }
    } = this;
    const { iid } = InstitutionReducer.institution;
    const payload = {
      institution_id: iid,
      publisher_id: publisherId,
      name: contractName,
      contract_id: '1',
      state: 3,
      comment
    };

    Request(
      'post',
      'create-contract',
      {
        Authorization: `Token ${TokenReducer.tokenInstitution}`
      },
      payload,
      [],
      this.onRegisterSuccess,
      this.onRegisterFailed
    );
    this.toggleModal('Creating Contract');
  };

  onRegisterSuccess = response => {
    this.toggleModal();
    this.props.history.push('/relations');
  };

  onRegisterFailed = (params, response) => {
    this.toggleModal();
  };

  handleDrop = data => this.setState({ publisherId: data.value });

  getPublishersList = page => {
    PublisherPresenter.Read(
      PublisherRequest.Read(
        this,
        this.onGetPubSuccess,
        this.onGetPubFailed,
        page
      )
    );
  };

  onGetPubSuccess = (params, response) => {
    this.setState({
      publishers: this.state.publishers.concat(response.data.results)
    });
  };

  onGetPubFailed = (params, response) => {};

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  componentDidMount() {
    const {
      state: { page },
      getPublishersList
    } = this;
    getPublishersList(page);
  }

  render() {
    const { InstitutionReducer, ActiveLanguageReducer } = this.props;
    const { words } = ActiveLanguageReducer;
    const {
      contractName,
      comment,
      publishers,
      showModal,
      infoMsg
    } = this.state;

    if (!InstitutionReducer.is_auth) return null;

    const options = publishers.map(publisher => ({
      value: publisher.pid,
      label: publisher.name
    }));

    return (
      <React.Fragment>
        <InfoModal
          isActive={showModal}
          toggleModal={this.toggleModal}
          headline="Contract"
          info={infoMsg}
        />
        <div className="create-contract">
          <div className="container">
            <div className="create-contract__title">
              <label>Create Contract</label>
            </div>
            <div className="box">
              <div className="container">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Publisher</label>
                    <div className="drop-down__wrapper">
                      <DropDown
                        options={options}
                        label="Publishers List..."
                        onChange={this.handleDrop}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Contract</label>
                    <input
                      type="text"
                      name="contractName"
                      className="form-control"
                      onChange={this.onChange}
                      value={contractName}
                    />
                  </div>
                  <div className="form-group textarea">
                    <label>Comment</label>
                    <textarea
                      rows="20"
                      name="comment"
                      className="form-control form__textarea"
                      onChange={this.onChange}
                      value={comment}
                    />
                  </div>
                  <div className="btns-wrapper center-content">
                    <button className="btn black" type="submit">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    SessionReducer: state.SessionReducer,
    TokenReducer: state.TokenReducer,
    InstitutionReducer: state.InstitutionReducer,
    ActiveLanguageReducer: state.ActiveLanguageReducer,
    ActiveCurrencyReducer: state.ActiveCurrencyReducer
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
)(CreateContract);
