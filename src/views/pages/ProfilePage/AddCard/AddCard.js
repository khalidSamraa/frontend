import React, { Component } from 'react';

import Request from '../../../../utils/Request';
import Auth from '../../../../redux/account/authToken';
import classnames from 'classnames';
import CardNumberInput from './CardNumberInput';
import CardExpireDate from './CardExpireDate/index';
import CardOwner from './CardOwner';
import SubmitCard from './SubmitCard';
import DefaultButton from './DefaultButton';
import { InfoModal } from '../../../component/Modal';

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.token = Auth.getActiveToken();
    this.state = {
      type: '2',
      number: '',
      exp_month: 'MM',
      exp_year: 'YY',
      cvc: '',
      cardType: 'all',
      primary: 0,
      first_name: '',
      last_name: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.addCard = this.addCard.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLoadSuccess = this.onLoadSuccess.bind(this);
    this.onLoadFailed = this.onLoadFailed.bind(this);
    this.handleMonth = this.handleMonth.bind(this);
    this.handleYear = this.handleYear.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  preparingRequest = () => {
    let data = {
        headers: {
            Authorization: "Token " + this.token,
        }
    }
    Request(
        "get",
        "read-payment-method",
        data.headers,
        {},
        [],
        this.onLoadSuccess,
        this.onLoadFailed,
    )
  }

  componentDidMount() {
      this.preparingRequest()
  }

  onLoadSuccess = (response) => {
      if (response.status === 200) {
          this.setState({
            primary: !response.data.results.length ? 1 : 0
          })
      }
  }

  onLoadFailed = (error) => {
      console.log('error: ', error);
  }
  componentDidMount() {
    this.setState({
      msg: ''
    });
  }

  toggleModal(infoMsg) {
    this.setState({ showModal: !this.state.showModal, infoMsg });
  }

  addCard = () => {
    let data = {
      headers: {
        Authorization: 'Token ' + this.token
      }
    };
    const { number, exp_month, exp_year, cvc, primary } = this.state;
    var formData = new FormData();
    formData.append('type', '2');
    formData.append('number', number);
    formData.append('exp_month', exp_month);
    formData.append('exp_year', exp_year);
    formData.append('cvc', cvc);
    formData.append('primary', primary);
    Request(
      'post',
      'add-payment-method',
      data.headers,
      formData,
      [],
      this.onAddSuccess,
      this.onAddFailed
    );
  }

  onAddSuccess = (response) => {
    if (response.status === 201) {
      this.setState({
        number: '',
        exp_month: '',
        exp_year: '',
        cvc: '',
        primary: 0
      });
    }
  }

  onAddFailed = (error) => {
    if (
      error.response &&
      Array.isArray(error.response.data) &&
      error.response.data[0]
    ) {
      this.toggleModal(error.response.data[0].split(':')[1]);
    }
  }

  handleInput = (ev) => {
    const { name, value } = ev.target;
    let cardType;
    if (name === 'number') {
      if (value.startsWith('4')) {
        cardType = 'visa';
      } else if (value.startsWith('5')) {
        cardType = 'master';
      } else if (value.startsWith('6')) {
        cardType = 'discover';
      } else if (value.startsWith('34') || value.startsWith('37')) {
        cardType = 'american-express'
      } else if (value.startsWith('30') || value.startsWith('36') || value.startsWith('38')) {
        cardType = 'diners-club';
      } else {
        cardType = 'all';
      }
      cardType && this.setState({
        cardType
      })
    }
    if (name === 'cvc') {
      if ((/^\d+$/.test(value) || value === '') && value.length < 4) {
        this.setState({
          cvc: value
        })
      }
    } else if (name === 'number') {
      if (value.length < 21) {
        const key = ev.keyCode || ev.charCode;
        if (/^[0-9\s]*$/.test(value) || value === '') {
          this.setState({
            number: value
          })
        }
        if (key) {
          if (value.replace(/\s/g, "").length % 4 === 0 && value.length < 19 && ( key !== 8 && key !== 46 )) {
            this.setState({
              number: `${value} `
            })
          }
        }
      }
    } else {
      this.setState({
        [name]: value
      })
    }
  }

  handleYear = ({ value }) => {
    this.setState({
      exp_year: value
    })
  }

  onDefaultButtonChanged = (event) => {
    this.setState({
      primary: event.target.checked ? 1 : 0
    })
  }

  handleMonth = ({ value }) => {
    this.setState({
      exp_month: value
    });
  }

  handleYear = ({ value }) => {
    this.setState({
      exp_year: value
    });
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    this.addCard();
  }

  render() {
    const {
      props: { ActiveLanguageReducer: { words } },
      state: { showModal, infoMsg, number, exp_month, exp_year, cvc, first_name, last_name },
      toggleModal
    } = this;
    let valid = false;
    if (number && exp_month !== 'MM' && exp_year !== 'YY' && cvc && first_name && last_name) {
      valid = false;
    } else {
      valid = true;
    }

    return (
      <React.Fragment>
        <InfoModal
          small
          isActive={showModal}
          headline={words.popup_CC_add_big}
          info={infoMsg}
          toggleModal={toggleModal}
        />
        <div className="payment-options">
          <div className="edit-card">
            <h2>Add Card</h2>
            <form onSubmit={this.onSubmit}>
              <div className="box">
                <div className="row">
                  <div className="col-xs-11">
                    <CardNumberInput
                      number={this.state.number}
                      handleInput={this.handleInput}
                      cardType={this.state.cardType}
                    />
                    <CardExpireDate
                      handleMonth={this.handleMonth}
                      handleYear={this.handleYear}
                      handleInput={this.handleInput}
                      {...this.state}
                    />
                    <CardOwner
                      handleInput={this.handleInput}
                      first_name={first_name}
                      last_name={last_name}
                    />
                    <DefaultButton
                      value={this.state.primary}
                      onChange={this.onDefaultButtonChanged}
                    />
                  </div>
                </div>
              </div>
              <SubmitCard
                validate={valid}
              />
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddCard;
