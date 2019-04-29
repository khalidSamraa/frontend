import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Request from "../../../../utils/Request";
import Auth from '../../../../redux/account/authToken';

class CardsList extends Component {
    constructor(props) {
        super(props);
        this.token = Auth.getActiveToken();
        this.state = {
        }
    }
    
    componentDidMount() {
        this.props.getCards(() => {}, this.onLoadFailed);
    }

    onLoadFailed = (error) => {
        console.log('error: ', error);
    }


    deleteCard = (pid) => {
        this.props.deleteCard(pid, this.onDeleteSuccess, this.onDeleteFailed);
    }

    onDeleteSuccess = () => {
       this.props.getCards(() => {}, this.onLoadFailed);
    }

    onDeleteFailed = (error) => {
        console.log('error: ', error);
    }

    makePrimary = (pid) => {
        this.props.makeCardPrimary(pid, this.onMakePrimarySuccess, this.onMakePrimaryFailed)
    }

    onMakePrimarySuccess = () => {
        this.props.getCards(() => {}, this.onLoadFailed);
    }

    onMakePrimaryFailed = (error) => {
        console.log('error: ', error);
    }

    render () {
        const items = this.props.cards;
        return (
          <div  className="payment-options cards-list">
            <h2>My Cards <Link to='/profile/addCard' className='btn black'>Add Card</Link></h2>
            <div className='row small-boxes my-cards'>
                {items.map((item) => { 
                    return (
                        <React.Fragment key={item.pid}>
                            <div className='col-md-6'>
                                <div className='box'>
                                    <p className='credit'>
                                        <span>**** **** ****</span>
                                        <label>{item.details.last4}</label>
                                        <i className='card-icon'/>
                                    </p>
                                    <div className="box-footer">
                                        <button
                                            className='black'
                                            onClick={() => this.makePrimary(item.pid)}
                                        >
                                            <i className={item.primary ? 'check-icon' : 'uncheck-icon'}/> Default
                                        </button>
                                        <a onClick={() => this.deleteCard(item.pid)}><i className='remove-icon'/> Remove</a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6' />
                        </React.Fragment>
                    )
                })}
            </div>
            </div>
        );
    }
}

export default CardsList;