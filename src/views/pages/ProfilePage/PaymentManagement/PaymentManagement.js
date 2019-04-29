import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Request from "../../../../utils/Request";
import Auth from '../../../../redux/account/authToken';
import AddBalance from '../AddBalance';

class PaymentOptions extends Component {
    constructor(props) {
        super(props);
        this.token = Auth.getActiveToken();
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        this.props.getCards(undefined, this.onLoadFailed)
    }

    onLoadFailed = (error) => {
        console.log('error: ', error);
    }


    render () {
        const { userData, ActiveLanguageReducer } = this.props;
        const items = this.props.cards;
        const { words, lang } = ActiveLanguageReducer;
        
        return (
            <div className="payment-options">
                <h2>{words['profile_menu_man-paym']}</h2>
                <AddBalance words={words} accountDetails={userData} lang={lang} />
                <div className='row small-boxes'>
                    {items.filter((item) => {
                        return item.primary;
                    }).map((item) => { 
                        return (
                            <div className='col-md-6' key={item.pid}>
                                <div className='box'>
                                    <h3>{words['profile_overview_def-cre-card']}</h3>
                                    <p className='credit'>
                                        <span>**** **** ****</span>
                                        <label>{item.details.last4}</label>
                                        <i className='card-icon'/>
                                    </p>
                                    <Link to='/profile/creditCards'><i className='edit-icon'/> Edit</Link>
                                </div>
                            </div>
                        )
                    })}
                    <div className='col-md-6'>
                        {items.filter((item) => {
                            return !item.primary;
                        }).map((item) => { 
                            return (
                                <div className='box' key={item.pid}>
                                    <h3>Other Credit Card</h3>
                                    <p className='credit'>
                                        <span>**** **** ****</span>
                                        <label>{item.details.last4}</label>
                                        <i className='card-icon'/>
                                    </p>
                                    <Link to='/profile/creditCards'><i className='edit-icon'/> Edit</Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default PaymentOptions;