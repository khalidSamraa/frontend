import React, {Component} from 'react';
import Modal from '../../component/Modal/Skeleton';
import ContactsManagement from '../ProfilePage/ContactManagement';
class Contacts extends Component {
    state = {
        isActive: false
    }

    toggleModal = () => {
        this.setState({
            isActive: !this.state.isActive
        })
    }

    getContact = (email) => {
        this.props.getContact(email);
        this.toggleModal()
    }

    render () {
        const {words} = this.props;
        return (
            <div className='invitation-contacts'>
                <a className='btn black small' onClick={this.toggleModal}>{words.general_contact}</a>
                <Modal
                    toggleModal={this.toggleModal}
                    isActive={this.state.isActive}
                    small
                >
                    <a onClick={this.toggleModal} className='close'>X</a>
                    <ContactsManagement words={words} invitations getContact={this.getContact} />
                </Modal>
            </div>
        );
    }
}

export default Contacts;