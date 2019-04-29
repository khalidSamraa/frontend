import React from 'react';
import { connect } from 'react-redux';
import { setTrial, removeTrial } from '../../../redux/actions/TrialAction.js';
import {
  ButtonLoading,
  ButtonValidation
} from '../../component/Button/Button.js';
import Request from '../../../utils/Request.js';
import { InfoModal } from '../../component/Modal';

export class TrialScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      is_loading: false,
      showModal: false
    };

    this.onCheckTrial = this.onCheckTrial.bind(this);
    this.onCheckTrialSuccess = this.onCheckTrialSuccess.bind(this);
    this.onCheckTrialFailed = this.onCheckTrialFailed.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(infoMsg) {
    this.setState({ showModal: !this.state.showModal, infoMsg });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      if (this.state.code !== '') {
        this.onCheckTrial();
      }
    }
  }

  onCheckTrial() {
    Request(
      'post',
      'check-trial',
      {},
      {},
      [this.state.code],
      this.onCheckTrialSuccess,
      this.onCheckTrialFailed
    );

    this.setState({
      is_loading: true
    });
  }

  onCheckTrialSuccess(response) {
    this.props.onSuccessTrial(response);
    this.setState({ is_loading: false });
  }

  onCheckTrialFailed(error) {
    this.toggleModal(
      this.props.ActiveLanguageReducer.words.popup_trial_code_small
    );
    this.setState({ is_loading: false });
  }

  onChange(e) {
    this.setState({
      code: e.target.value
    });
  }

  render() {
    const { is_loading, code, infoMsg, showModal } = this.state;
    let buttonSubmit;

    if (is_loading) {
      buttonSubmit = <ButtonLoading value="Submit..." />;
    } else {
      buttonSubmit = (
        <input
          type="button"
          className="black"
          onClick={this.onCheckTrial}
          value="Submit"
          disabled={!code}
        />
      );
    }

    return (
      <React.Fragment>
        <InfoModal
          headline={this.props.ActiveLanguageReducer.words.popup_trial_code_big}
          info={infoMsg}
          toggleModal={this.toggleModal}
          isActive={showModal}
        />
        <div className="container">
          <div className="row center-xs">
            <div className="col-md-6 col-sm-6 col-xs-10">
              <div className="box">
                <h3>Input trial code</h3>
                <div className="text-input-trial">
                  <input
                    type="text"
                    onChange={this.onChange}
                    onKeyPress={this.handleKeyPress}
                  />
                </div>
                <div className="submit-input">{buttonSubmit}</div>
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
    TrialReducer: state.TrialReducer,
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
)(TrialScreen);
