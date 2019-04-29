import React, { Component } from 'react';
import Request from "../../../../utils/Request";
import Auth from '../../../../redux/account/authToken';
import { Link } from 'react-router-dom';

import Contacts from './Contacts';

import './style.css';
class ContactsComponent extends Component {
    state = {
        contacts: [],
        contactData: { edit: false}
    };

    componentDidMount () {
        this.props.getContacts(undefined, this.getContactsFailed)
    }

    getContactsFailed = (error) => {
        console.log('error: ', error);
    }


    render () {
        const { ActiveLanguageReducer: {words}, contacts } = this.props;
        return (
            <div className='manage-addresses manage-contacts'>
                {!this.props.invitations &&
                    <h2>{words['profile_menu_man-ctrct']} <Link className='btn black small' to='/profile/addContact'>{words['profile_man-ctrct_add-ctrct']}</Link></h2>
                }
                <Contacts
                    contacts={contacts}
                    getContacts={this.getContacts}
                    gotoEditContact={this.gotoEditContact}
                    invitations={this.props.invitations}
                    getContact={this.props.getContact}
                />
            </div>
        );
    }
}

export default ContactsComponent;