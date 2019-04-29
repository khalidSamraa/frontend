import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createInvitation } from "../../../redux/actions/InvitationsActions";
import Contacts from './Contacts';
import Radio from '../../component/Radio';
import './style.css';
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
class Invitations extends Component {
    state = {
        email: '',
        urls: [],
        comment: '',
        urlsText: '',
        premium_user: 'default'
    }
    handleInput = (ev) => {
        if (ev.target.name === 'urls') {
            const value = ev.target.value.split('http').filter((item) => {
                return item.length > 0
            })
            const newUrls = value.map((item) => {
                return `http${item.replace(/\n/g, '')}`
            })
            if (validURL(newUrls[newUrls.length - 1]) && newUrls[newUrls.length - 1].includes('.dimusco.com')) {
                this.setState({
                    [ev.target.name]: newUrls,
                    urlsText: value.map((item, index) => {
                        if (index === (value.length - 1))
                            return `http${item.replace(/\n/g, '')}`;
                        return `http${item.replace(/\n/g, '')}\n`;
                    }).join('')
                })
            }
        } else {
            this.setState({
                [ev.target.name]: ev.target.value
            })
        }
    }

    handleRemoveUrl = (ev) => {
        const {value} = ev.target;
        if (ev.keyCode === 8) {
            const textareaIndex = value.substr(0, ev.target.selectionStart).split("\n").length;
            setTimeout (() => {
                const filtered = this.state.urls.filter((item, index) => {
                    return (textareaIndex - 1) !== index;
                });
                this.setState({
                    urls: filtered,
                    urlsText: filtered.map((item, index) => {
                        if (index < (filtered.length - 1))
                            return `${item.replace(/\n/g, '')}\n`;
                        return item;
                    }).join('')
                })
            }, 100) 
        }  
    }

    onAddSuccess = (response) => {
        this.setState({
            email: '',
            urls: '',
            comment: '',
            urlsText: ''
        })
    }

    onAddFailed = (error) => {
        console.log('error: ', error);
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        delete this.state.urlsText;
        this.props.createInvitation(this.state, this.onAddSuccess, this.onAddFailed);
    }

    handleRadio = ({value, name}) => {
        this.setState({
            [name]: value
        })
    }

    getContact = (email) => {
        this.setState({
            email
        })
    }

    render() {
        const { words  } = this.props.ActiveLanguageReducer;
        
        return (
            <div className="invitations fill-screen">
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-offset-2 col-md-8 col-xs-12'>
                            <h2>{words.general_invitation}</h2>
                            <form onSubmit={this.handleSubmit}>
                                <div className="box">
                                    <div className="form-group">
                                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                                            <label>{words['general_email']}</label>
                                            <Contacts words={words} getContact={this.getContact} />
                                        </div>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name='email'
                                            onChange={this.handleInput}
                                            value={this.state.email}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>{words['general_comment']}</label>
                                        <textarea
                                            className="form-control"
                                            rows={4}
                                            name='comment'
                                            onChange={this.handleInput}
                                            value={this.state.comment}
                                        />
                                    </div>
                                    {this.props.PublisherReducer.is_auth &&
                                        <div className='form-group radios-wrp'>
                                            <Radio
                                                label={words['invitation_default']}
                                                value='default'
                                                checked={this.state.premium_user === 'default'}
                                                name='premium_user'
                                                onChange={this.handleRadio}
                                            />
                                            <Radio
                                                label={words['invitation_preview']}
                                                value='preview'
                                                checked={this.state.premium_user === 'preview'}
                                                name='premium_user'
                                                onChange={this.handleRadio}
                                            />
                                            <Radio
                                                label={words['invitation_perusal']}
                                                value='perusal'
                                                checked={this.state.premium_user === 'perusal'}
                                                name='premium_user'
                                                onChange={this.handleRadio}
                                            />
                                        </div>
                                    }
                                    <div className="form-group">
                                        <label>{words['general_links']}</label>
                                        <textarea
                                            className="form-control"
                                            rows={4}
                                            name='urls'
                                            onChange={this.handleInput}
                                            value={this.state.urlsText}
                                            placeholder='Past a link here'
                                            onKeyDown={this.handleRemoveUrl}
                                        />
                                    </div>
                                </div>
                                <div className='centered-btn'>
                                    <button className='btn black' type='submit'>{words.general_send}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        PublisherReducer: state.PublisherReducer
    };
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        createInvitation
    }, dispatch)
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Invitations);