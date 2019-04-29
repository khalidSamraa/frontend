import React, { Component } from 'react';
import { connect } from 'react-redux';

import Request from '../../../utils/Request';

import ContentTitle from '../ContentTitle';
import { InfoModal } from '../Modal';

import PublisherBox from './PublisherBox';
import AddressBox from './AddressBox';
import ContactBox from './ContactBox';
import CommentBox from './CommentBox';

// import Presenter from '../../../../publisher/presenter';
import checkSession from '../../../utils/check_session';
import validation from './validation';

import './styles.css';

class CreatePublisherInstitution extends Component {
  state = {
    firstName: '',
    lastName: '',
    contactEmail: '',
    contactPhone1: '',
    contactPhone2: '',
    comment: '',
    [`${this.props.type}Name`]: '',
    userAddress1: '',
    userAddress2: '',
    userAddress3: '',
    city: '',
    zip: '',
    country: '',
    state: '',
    userAddressPhone1: '',
    userAddressPhone2: '',
    [`${this.props.type}Email`]: '',
    countries: [],
    countriesData: {},
    validationErrors: {},
    showModal: false
  };

  componentDidMount() {
    this.getCountries(1);
  }

  toggleModal = infoMsg =>
    this.setState({ showModal: !this.state.showModal, infoMsg });

  isLoggedIn = () => {
    const { history, SessionReducer } = this.props;
    return checkSession.isLoggedIn(history, SessionReducer.is_auth);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleDrop = ({ value }) => {
    this.setState({
      country: value
    });
  };

  filterState = () =>
    Object.entries(this.state).reduce((acc, curr) => {
      if (typeof curr[1] === 'string') {
        acc[curr[0]] = curr[1];
      }
      return acc;
    }, {});

  handleSubmit = e => {
    e.preventDefault();
    const {
      props: { ActiveLanguageReducer, type, onSubmit },
      state,
      toggleModal,
      filterState
    } = this;
    const { words } = ActiveLanguageReducer;

    const validationErrs = validation(state);
    if (Object.keys(validationErrs).length) {
      this.setState({ validationErrors: validationErrs });
      return;
    }

    toggleModal(words[`general_${type}`]);
    onSubmit(filterState());
  };

  getCountries = page => {
    Request(
      'get',
      'countries',
      {},
      {},
      [],
      this.getCountriesSuccess,
      this.getCountriesFailed,
      undefined,
      undefined,
      `?page=${page}`
    );
  };

  getCountriesSuccess = response => {
    if (response.data.current !== this.state.countriesData.current) {
      this.setState({
        countries: this.state.countries.concat(response.data.results),
        countriesData: response.data
      });
      this.getCountries(this.state.countriesData.current + 1);
    }
  };

  getCountriesFailed = error => {
    console.log('error: ', error);
  };

  getCountryName = () => {
    const {
      state: { countries },
      props: {
        SessionReducer: { user }
      }
    } = this;

    if (user) {
      const [result] = countries.filter(
        country => country.abbreviation === user.country
      );

      if (result) {
        if (this.state.country === '') {
          this.setState({ country: result.abbreviation });
        }
        return result.name;
      }
    }
  };

  render() {
    const {
      ActiveLanguageReducer: { words },
      type
    } = this.props;
    const { countries, showModal, infoMsg } = this.state;

    const options = [
      ...countries.map(item => {
        return { value: item.abbreviation, label: item.name };
      })
    ];

    if (!this.isLoggedIn()) return null;

    return (
      <React.Fragment>
        <InfoModal
          small
          headline={words[`general_${type}`]}
          isActive={showModal}
          info={infoMsg}
          toggleModal={this.toggleModal}
        />
        <div className="create-publisher-institution">
          <section className="container create-publisher-institution__container">
            <ContentTitle title={words[`create${type}_title`]} />
            <div className="container">
              <form onSubmit={this.handleSubmit}>
                <PublisherBox
                  {...this.state}
                  words={words}
                  onChange={this.onChange}
                  type={type}
                />
                <AddressBox
                  {...this.state}
                  words={words}
                  onChange={this.onChange}
                  handleDrop={this.handleDrop}
                  options={options}
                  userCountry={this.getCountryName()}
                />
                <ContactBox
                  {...this.state}
                  words={words}
                  onChange={this.onChange}
                />
                <CommentBox
                  {...this.state}
                  words={words}
                  onChange={this.onChange}
                />
                <div className="row center-content form__btns">
                  <button type="submit" className="btn black form__btn">
                    {words['general_send']}
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    SessionReducer: state.SessionReducer,
    TokenReducer: state.TokenReducer,
    ActiveLanguageReducer: state.ActiveLanguageReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    RunRedux: data => {
      dispatch(data);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePublisherInstitution);
