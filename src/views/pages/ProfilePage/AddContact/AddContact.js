import React, { Component } from 'react';
import Auth from '../../../../redux/account/authToken';
import Request from "../../../../utils/Request";
import { Link } from 'react-router-dom';
import './style.css';


class AddContact extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    comment: '',
    phone_1: '',
    phone_2: ''
  }

  componentDidMount () {
    const {id} = this.props.match.params;
    this.getContact(id);
  }

  getContact = (id) => {
    let headers = {
      Authorization: 'Token ' + Auth.getActiveToken()
    }
    Request(
      'get',
      'update-contact',
      headers,
      {},
      [id],
      this.onGetSuccess,
      this.onGetFailed
    );
  }

  onGetSuccess = (response) => {
    this.setState({
      ...response.data
    })
  }

  onGetFailed = (error) => {
    console.log('error: ', error);
  }

  addContact = (data) => {
    let headers = {
      Authorization: 'Token ' + Auth.getActiveToken()
    }
    Request(
      'post',
      'account-contacts',
      headers,
      data,
      [],
      this.onAddSuccess,
      this.onAddFailed
    );
  }

  onAddSuccess = () => {
    this.setState({
      first_name: '',
      last_name: '',
      email: '',
      comment: '',
      phone_1: '',
      phone_2: ''
    })
  }

  onAddFailed = (error) => {
    console.log('error: ', error);
  }

  editContact = (id, data) => {
    let headers = {
      Authorization: 'Token ' + Auth.getActiveToken()
    }
    Request(
      'put',
      'update-contact',
      headers,
      data,
      [id],
      this.onEditSuccess,
      this.onEditFailed
    );
  }

  onEditSuccess = (response) => {
    this.setState({
      ...response.data
    })
  }

  onEditFailed = (error) => {
    console.log('error: ', error);
  }

  onSumbit = (ev) => {
    ev.preventDefault();
    const {id} = this.props.match.params;
    if (id) {
      this.editContact(id, this.state);
    } else {
      this.addContact(this.state);
    }
  }

  handleInput = (ev) => {
    this.setState({
        [ev.target.name]: ev.target.value
    })
  }

  render() {
    const { ActiveLanguageReducer: {words} } = this.props;
    const {id} = this.props.match.params;
    return (
        <div className="edit-address">
          <h2>{id ? 'Edit Contact' : words['profile_man-ctrct_add-ctrct']}</h2>
            <form onSubmit={this.onSumbit}>
              <div className="box">
                <div className='row'>
                  <div className="form-group col-xs-5">
                    <label>{words['profile_man-ctrct_add-ctrct_name1']}</label>
                    <input
                      type="text"
                      name="first_name"
                      className="form-control"
                      onChange={this.handleInput}
                      value={this.state.first_name}
                    />
                  </div>
                  <div className="form-group col-xs-7">
                    <label>{words['profile_man-ctrct_add-ctrct_name2']}</label>
                    <input
                      type="text"
                      name="last_name"
                      className="form-control"
                      onChange={this.handleInput}
                      value={this.state.last_name}
                    />
                  </div>
                </div>
                <div className="form-group">
                    <label>{words['profile_man-ctrct_add-ctrct_email']}</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        onChange={this.handleInput}
                        value={this.state.email}
                    />
                </div>
                <div className="row">
                    <div className="form-group col-xs-6">
                      <label>{words['general_addr-phone1']}</label>
                      <input
                        type="text"
                        name="phone_1"
                        className="form-control"
                        onChange={this.handleInput}
                        value={this.state.phone_1}
                      />
                    </div>
                    <div className="form-group col-xs-6">
                      <label>{words['general_addr-phone2']}</label>
                      <input
                        type="text"
                        name="phone_2"
                        className="form-control"
                        onChange={this.handleInput}
                        value={this.state.phone_2}
                      />
                    </div>
                </div>
                <div className="form-group">
                    <label>{words['profile_man-ctrct_add-ctrct_comm']}</label>
                    <textarea
                        name="comment"
                        className="form-control"
                        onChange={this.handleInput}
                        value={this.state.comment}
                        rows={4}
                    />
                </div>
              </div>
            <div className='btns-wrp'>
                <Link className='btn black' to='/profile/contacts'>«{words.general_back}</Link>
                <button className='btn black' type='submit'>{id ? words.general_save : words.general_add}</button>
            </div>
            </form>
        </div>
    );
  }
}

export default AddContact;
