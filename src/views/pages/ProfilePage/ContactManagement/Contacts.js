import React from 'react';
import DeleteContact from './DeleteContact'
import { Link } from 'react-router-dom';

const Contacts = ({contacts, getContacts, gotoEditContact, invitations, getContact}) => {
    return (
        contacts.map((item) => {
            return (
                <div className='box' key={item.cid}>
                    <p> {item.first_name} {item.last_name}
                    <br />{item.email}</p>
                    <div className='box-footer'>
                        {invitations ?
                            <a className='btn black small' onClick={() => getContact(item.email)}>Invite</a>
                        : 
                            <React.Fragment>
                                <Link to={`/profile/addContact/${item.cid}`}><i className='edit-icon'/> Edit</Link>
                                <DeleteContact id={item.cid} getContacts={getContacts} />
                            </React.Fragment>
                        }
                    </div>
                </div>
            )
        })
        
    )
}

export default Contacts;