import React, { Component } from 'react';
import Request from "../../../../utils/Request";
import Auth from '../../../../redux/account/authToken';
import { Link } from 'react-router-dom';

class ManageAddresses extends Component {
    constructor(props) {
        super(props);
        this.token = Auth.getActiveToken()
        this.state = {
            items: []
        }
        this.onLoadFailed = this.onLoadFailed.bind(this);
        this.deleteAddress = this.deleteAddress.bind(this);
        this.onDeleteSuccess = this.onDeleteSuccess.bind(this);
        this.onDeleteFailed = this.onDeleteFailed.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.onUpdateFailed = this.onUpdateFailed.bind(this);
    }

    componentDidMount() {
        this.props.getAddresses(undefined, this.onLoadFailed)
    }

    onLoadFailed(error) {
        console.log('error: ', error);
    }

    deleteAddress(id) {
        this.props.deleteAddress(id, this.onDeleteSuccess, this.onDeleteFailed)
    }

    onDeleteSuccess() {
       this.props.getAddresses(undefined, this.onLoadFailed)
    }

    onDeleteFailed(error) {
        console.log('error: ', error);
    }

    updateAddress(id) {
       this.props.setAddressToDefault(id, this.updateSuccess, this.onUpdateFailed)
    }

    updateSuccess = () => {
       this.props.getAddresses(undefined, this.onLoadFailed)
    }

    onUpdateFailed(error) {
        console.log('data: ', error);
    }

    render() {
        const { ActiveLanguageReducer } = this.props;
        const { words } = ActiveLanguageReducer;
        const items = this.props.addresses;
        
        return (
            <div className='manage-addresses'>
                <h2>{words['profile_menu_man-addr']} <Link to={'/profile/addressForm'} className='btn black'>{words['general_addr-add']}</Link></h2>
                <div className='row small-boxes'>
                    <div className='col-md-6'>
                        <h3>{words['general_addr-invoice']}</h3>
                        {items.filter((item) => {
                            return item.type === 1;
                        }).sort((a, b) => {
                            return (a.default === b.default) ? 0 : a.default ? -1 : 1;
                        }).map((item) => {
                            return (
                                <div className='box address' key={item.id}>
                                    <p>{item.address_line_1}</p>
                                    <p>{item.address_line_2}</p>
                                    <p>{item.address_line_3}</p>
                                    <p>{item.city}, {item.zip}</p>
                                    <p>{item.country}</p>
                                    <p>{item.state}</p>
                                    <p>{item.phone_1}</p>
                                    <p>{item.phone_2}</p>
                                    <div className='box-footer'>
                                        <button className='black' onClick={() => this.updateAddress(item.id)}>
                                            <i className={item.default ? 'check-icon' : 'uncheck-icon'} /> Default
                                        </button>
                                        <div>
                                            <Link to={`/profile/addressForm/${item.id}`}><i className='edit-icon' /> Edit</Link>
                                            <a onClick={() => this.deleteAddress(item.id)}><i className='remove-icon' /> Remove</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='col-md-6'>
                        <h3>{words['general_addr-delivery']}</h3>
                        {items.filter((item) => {
                            return item.type === 2;
                        }).sort((a, b) => {
                            return (a.default === b.default) ? 0 : a.default ? -1 : 1;
                        }).map((item) => {
                            return (
                                <div className='box address' key={item.id}>
                                    <p>{item.address_line_1}</p>
                                    <p>{item.address_line_2}</p>
                                    <p>{item.address_line_3}</p>
                                    <p>{item.city}, {item.zip}</p>
                                    <p>{item.country}</p>
                                    <p>{item.state}</p>
                                    <p>{item.phone_1}</p>
                                    <p>{item.phone_2}</p>
                                    <div className='box-footer'>
                                        <button className='black' onClick={() => this.updateAddress(item.id)}>
                                            <i className={item.default ? 'check-icon' : 'uncheck-icon'} /> Default
                                        </button>
                                        <div>
                                            <Link to={`/profile/addressForm/${item.id}`}><i className='edit-icon' /> Edit</Link>
                                            <a onClick={() => this.deleteAddress(item.id)}><i className='remove-icon' /> Remove</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default ManageAddresses;