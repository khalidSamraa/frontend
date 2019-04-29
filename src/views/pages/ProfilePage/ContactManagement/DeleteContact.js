import React, { Component } from 'react';
import Request from "../../../../utils/Request";
import Auth from '../../../../redux/account/authToken';

class DeleteContact extends Component {
    state = {
    };

    deleteContact = (id) => {
        let headers = {
            Authorization: "Token " + Auth.getActiveToken(),
        }
        Request(
            "delete",
            "delete-contact",
            headers,
            {},
            [id],
            this.deleteContactSuccess,
            this.deleteContactFailed,
        )
    }


    deleteContactSuccess = () => {
        this.props.getContacts();
    }

    deleteContactFailed = (error) => {
        console.log('error: ', error);
    }

    render () {
        return (
            <a onClick={() => this.deleteContact(this.props.id)}><i className='remove-icon'/> Remove</a>
        );
    }
}

export default DeleteContact;