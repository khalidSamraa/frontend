import React, { Component } from 'react';
import Request from "../../../../utils/Request";
import Auth from '../../../../redux/account/authToken';
import AddBalance from '../AddBalance';
import { Link } from 'react-router-dom';

class Overview extends Component {
    constructor (props) {
        super (props);
        this.token = Auth.getActiveToken()
        this.state = {
            paymentMethod: {details:{}},
            lastOrder: {book: {play: {}}},
            invoiceAddress: {},
            deliveryAddress: {},
            isAddressInvoice: 0,
            isAddressDelivery: 0
        };
        this.getPaymentMethodsSuccess = this.getPaymentMethodsSuccess.bind(this);
        this.getPaymentMethodsFailed = this.getPaymentMethodsFailed.bind(this);
        this.getAddressesSuccess = this.getAddressesSuccess.bind(this);
        this.getAddressesFailed = this.getAddressesFailed.bind(this);
        this.getLastOrder = this.getLastOrder.bind(this);
        this.getLastOrderSuccess = this.getLastOrderSuccess.bind(this);
        this.getLastOrderFailed = this.getLastOrderFailed.bind(this);
    }

    componentDidMount () {
        this.props.getCards(this.getPaymentMethodsSuccess, this.getPaymentMethodsFailed)
        this.props.getAddresses(this.getAddressesSuccess, this.getAddressesFailed)
        this.getLastOrder();
    }

    getPaymentMethodsSuccess() {
        this.setState({
            paymentMethod: this.props.cards[0] || {details: {}}
        })
    }

    getPaymentMethodsFailed(error) {
        console.log('error: ', error);
    }

    getAddressesSuccess() {
        this.setState({
            invoiceAddress: this.props.addresses.filter((item) => {
                return item.type === 1 && item.default;
            })[0] || {},
            deliveryAddress: this.props.addresses.filter((item) => {
                return item.type === 2 && item.default;
            })[0] || {},
            isAddressInvoice: this.props.addresses.filter((item) => {
                return item.type === 1;
            }).length,
            isAddressDelivery: this.props.addresses.filter((item) => {
                return item.type === 2;
            }).length
        })
    }
    
    getAddressesFailed(error) {
        console.log('error: ', error);
    }


    getLastOrder () {
        let data = {
            headers: {
                Authorization: "Token " + this.token,
            }
        }
        Request(
            "get",
            "purchase-read",
            data.headers,
            {},
            [],
            this.getLastOrderSuccess,
            this.getLastOrderFailed,
            undefined,
            undefined,
            `?last=1`
        )
    }

    getLastOrderSuccess (response) {
        if (response.status === 200) {
            this.setState({
                lastOrder: response.data.results[0] || {book:{Play: {}}}
            })
        }
    }
    
    getLastOrderFailed (error) {
        console.log('error: ', error);
    }

    
    render () {
        const { ActiveLanguageReducer, addPayment, accountDetails, toggleTab } = this.props;
        const { invoiceAddress, deliveryAddress, paymentMethod, lastOrder } = this.state;
        const { words, lang } = ActiveLanguageReducer;
        
        return (
            <div className='over-view'>
                <div className='header-wrp'>
                    <h2>{words.profile_overview_name}</h2>
                </div>
                <div className='box'>
                    <h3>{words.profile_overview_about}</h3>
                    <p>{accountDetails.name}
                    <br />{accountDetails.email}</p>
                    <Link onClick={() => toggleTab(1)} to='/profile/changeName'><i className='edit-icon'/> Edit</Link>
                </div>
                <div className='row small-boxes'>
                    <div className='col-md-6'>
                        <AddBalance words={words} addPayment={addPayment} accountDetails={accountDetails} lang={lang} />
                    </div>
                    <div className='col-md-6'>
                        <div className='box'>
                            <h3>{words['profile_overview_last-order']}</h3>
                            {lastOrder &&
                                <p style={{maxWidth: '300px'}}>
                                    {lastOrder.book.play.title}
                                    {lastOrder.book.play.composer && `, ${lastOrder.book.play.composer}`}
                                    {lastOrder.book.play.category && `, ${lastOrder.book.play.category}`}
                                    {lastOrder.book.edition && `, ${lastOrder.book.edition}`}
                                    {lastOrder.book.instrument && `, ${lastOrder.book.instrument}`}
                                    {lastOrder.book.play.duration && `, ${lastOrder.book.play.duration}`}
                                </p>
                            }
                            <Link onClick={() => toggleTab(5)} to='/profile/orderHistory'><i className='view-icon'/> View</Link>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='box address'>
                            <h3>{words['profile_overview_def-inv-addr']}</h3>
                            <p>{invoiceAddress.address_line_1}</p>
                            <p>{invoiceAddress.address_line_2}</p>
                            <p>{invoiceAddress.address_line_3}</p>
                            <p>{invoiceAddress.city}, {invoiceAddress.zip}</p>
                            <p>{invoiceAddress.country}</p>
                            <p>{invoiceAddress.state}</p>
                            <p>{invoiceAddress.phone_1}</p>
                            <p>{invoiceAddress.phone_2}</p>
                            <Link onClick={() => toggleTab(3)} to='/profile/addresses'><i className='view-icon'/> View</Link>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='box address'>
                            <h3>{words['profile_overview_def-del-addr']}</h3>
                            <p>{deliveryAddress.address_line_1}</p>
                            <p>{deliveryAddress.address_line_2}</p>
                            <p>{deliveryAddress.address_line_3}</p>
                            <p>{deliveryAddress.city}, {deliveryAddress.zip}</p>
                            <p>{deliveryAddress.country}</p>
                            <p>{deliveryAddress.state}</p>
                            <p>{deliveryAddress.phone_1}</p>
                            <p>{deliveryAddress.phone_2}</p>
                            <Link onClick={() => toggleTab(3)} to='/profile/addresses'><i className='view-icon'/> View</Link>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='box'>
                            <h3>{words['profile_overview_def-cre-card']}</h3>
                            <p className='credit'>
                                <span>**** **** **** {!paymentMethod.details.last4 && '****'}</span>
                                <label>{paymentMethod.details.last4}</label>
                                <i className='card-icon'/>
                            </p>
                            <Link onClick={() => toggleTab(9)} to='/profile/creditCards'><i className='view-icon'/> View</Link>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='box'>
                            <h3>Default Bank Account</h3>
                            <Link onClick={() => toggleTab(10)} to='/profile/bankAccount'><i className='view-icon'/> View</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Overview;