import React, { Component } from 'react';
import checkSession from '../../../utils/check_session.js';
import BookList from './BookList';
import { InfoModal } from '../../component/Modal';
import SearchInput from '../../component/SearchInput';

import { setSearchQuery } from '../../../redux/actions/SearchAction.js';

import Request from '../../../utils/Request.js';
import Auth from '../../../redux/account/authToken.js';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
      items: [],
      searchQuery: props.SearchReducer.query,
      showModal: false
    };
    this.loggedIn = checkSession.isLoggedIn(
      props.history,
      props.SessionReducer.is_auth
    );
    this.token = Auth.getActiveToken();

    this.gotoUpload = this.gotoUpload.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onReadScore = (search = '', order = '') => {
    const {
      state: { searchQuery },
      toggleModal
    } = this;
  
    const payloads = {
      ordering: order,
      search: searchQuery
    }

    this.props.getLibraryScores(payloads, this.onLoadSuccess, this.onLoadFailed)
    toggleModal();
  };

  onLoadSuccess = () => {
    this.setState({
      showModal: false
    });
  };

  onSort = items => this.setState({ items });

  onLoadFailed = error => {
    this.toggleModal(error.response.data.detail);
  };

  onDeleteScore = (data, text) => {
    this.props.deleteLibraryScore(data, this.onDeleteSuccess, this.onDeleteFailed);
    this.toggleModal('Deleting score');
  };

  onDeleteSuccess = () => {
    this.onReadScore();
    this.toggleModal();
  };

  onDeleteFailed = error => {
    console.log({ error }, 'delete score');
  };

  componentDidMount() {
    this.onReadScore();
  }

  // Toogle Tab
  toggleTab(tab = null) {
    if (!tab || this.state.activeTabIndex === tab) {
      this.setState({
        activeTabIndex: 0
      });
    } else {
      this.setState({
        activeTabIndex: tab
      });
    }
  }

  gotoUpload() {
    this.props.history.push('/score-upload');
  }

  deleteSearchQuery = () => this.setState({ searchQuery: '' });

  handleSubmit(searchQuery) {
    this.props.RunRedux(setSearchQuery(searchQuery));
    this.setState({ searchQuery }, () => {
      this.onReadScore();
    });
  }

  handleChange(event) {
    this.setState({ searchQuery: event.target.value });
  }
  render() {
    const { words, lang } = this.props.ActiveLanguageReducer;

    if (!this.loggedIn) return null;

    return (
      <React.Fragment>
        <InfoModal
          small
          isActive={this.state.showModal}
          toggleModal={this.toggleModal}
        >
          <img
            src="media/images/icon/loading.gif"
            width="80"
            height="80"
            style={{ marginBottom: '30px' }}
          />
        </InfoModal>
        <div className="library-page set-price">
          <h2>My {words.library_title}</h2>
          <section
            className="search-area container"
            style={{ maxWidth: '1180px', paddingBottom: '25px' }}
          >
            <div className="row search-form-box">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <SearchInput words={words} onSubmit={this.handleSubmit} />
              </div>
            </div>
          </section>
          <section className="user-content institution-content">
            <div className="container">
              <BookList
                words={words}
                items={this.props.libraryScores}
                onSort={this.onSort}
                onDeleteScore={this.onDeleteScore}
              />
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}


export default Book;