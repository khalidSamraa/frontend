import React, { Component } from 'react';
import Auth from '../../../../redux/account/authToken';
import Request from "../../../../utils/Request";
import Modal from '../../../component/Modal/Skeleton';
import AddBalancePaymentOptions from './AddBalancePaymentOptions';

class AddBalance extends Component {
    state = {
        show: false
    }

    toggleModal = () => {
        this.setState({
            show: !this.state.show
        })
    }

    addBalance = (amount) => {
        let headers = {
            Authorization: "Token " + Auth.getActiveToken()
        }
        Request(
            "post",
            "account-deposit",
            headers,
            { amount: amount },
            [],
            this.addBalanceSuccess(amount),
            this.addBalanceFailed,
            undefined,
            undefined,
        )
    }

    addBalanceSuccess = (amount) => () => {
        this.props.addPayment(amount);
        this.toggleModal()
    }

    addBalanceFailed = (error) => {
        console.log('error: ', error);

    }

    render() {
        const { words, accountDetails, lang } = this.props;
        const payPalPaymentCallbacks = {
            onSuccess: (amount) => () => {
                this.props.addPayment(amount);
                this.toggleModal()
            }
        }

        const creditCardPaymentCallbacks = {
            onSuccess: (amount) => () => {
                this.addBalance(amount)
            },
            onFailure: () => { }
        }
        const europe = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
          })
          
          const us = new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR'
          })
        return (
            <div className='box'>
                <h3>{words.profile_overview_balance}</h3>
                <p className='balance'>
                    <span>
                        {
                            lang !== 'en' ? accountDetails.ballance
                                && us.format(accountDetails.ballance).replace('€', '')
                                : europe.format(accountDetails.ballance).replace('$', '')
                        }
                    </span>
                    <label>euro €</label>
                </p>
                <a onClick={this.toggleModal}>
                    <i className='add-payment-icon' />
                    Add
                 </a>
                <Modal small={true} toggleModal={this.toggleModal} isActive={this.state.show}>
                    <div className="text-box container">
                        <button className="material-icons lang-icon dp40 close" onClick={this.toggleModal}>close</button>
                        <AddBalancePaymentOptions
                            payPalPaymentCallbacks={payPalPaymentCallbacks}
                            creditCardPaymentCallbacks={creditCardPaymentCallbacks}
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}

export default AddBalance;