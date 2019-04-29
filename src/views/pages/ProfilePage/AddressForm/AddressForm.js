import React, { Component } from 'react';
import Request from '../../../../utils/Request';
import Auth from '../../../../redux/account/authToken';
import DropDown from '../../../component/DropDown';
import Radio from '../../../component/Radio';
import { InfoModal } from '../../../component/Modal';
import { Link } from 'react-router-dom';

const generateFormData = data => {
  let formData = new FormData();
  formData.append('address_line_1', data.address_line_1);
  formData.append('address_line_2', data.address_line_2);
  formData.append('address_line_3', data.address_line_3);
  formData.append('country', data.country);
  formData.append('state', data.state);
  formData.append('city', data.city);
  formData.append('zip', data.zip);
  formData.append('default', data.primary);
  formData.append('type', data.type);
  formData.append('phone_1', data.phone_1);
  formData.append('phone_2', data.phone_2);

  return formData;
};

class EditAdress extends Component {
  constructor(props) {
    super(props);
    this.token = Auth.getActiveToken();
    this.state = {
      address_line_1: '',
      address_line_2: '',
      address_line_3: '',
      country: '',
      state: '',
      city: '',
      zip: '',
      type: '1',
      primary: '0',
      phone_1: '',
      phone_2: '',
      countries: [],
      countriesData: {},
      address_line_1_validation: '',
      city_validation: '',
      zip_validation: '',
      country_validation: '',
      showModal: false,
      headline: props.ActiveLanguageReducer.words['popup_addr_add_big']
    };

    this.preparingRequest = this.preparingRequest.bind(this);
    this.onLoadSuccess = this.onLoadSuccess.bind(this);
    this.onLoadFailed = this.onLoadFailed.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.onUpdateSuccess = this.onUpdateSuccess.bind(this);
    this.onUpdateFailed = this.onUpdateFailed.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.onSumbit = this.onSumbit.bind(this);
    this.getCountries = this.getCountries.bind(this);
    this.getCountriesSuccess = this.getCountriesSuccess.bind(this);
    this.getCountriesFailed = this.getCountriesFailed.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.validate = this.validate.bind(this);
    this.handleType = this.handleType.bind(this);
  }

  componentDidMount() {
    this.getCountries(1);
    if (this.props.match.params.id) {
      this.getAddress(this.props.match.params.id)
    }
  }

  toggleModal = (infoMsg) => {
    this.setState({ showModal: !this.state.showModal, infoMsg });
  }

  getAddress = (id) => {
    let headers = {
      Authorization: 'Token ' + this.token
    };
    Request(
      'patch',
      'update-address',
      headers,
      {},
      [id],
      this.onGetSuccess,
      this.onGetFailed
    );
  }

  onGetSuccess = (reponse) => {
    this.setState({
      ...reponse.data
    })
  }

  onGetFailed = (error) => {
    console.log('error: ', error);
  }
  
  getCountryName = () => {
    const {
      state: { countries },
      props: { userCountry }
    } = this;

    const [result] = countries.filter(
      country => country.abbreviation === userCountry
    );

    if (result) {
      if (this.state.country === '') {
        this.setState({ country: result.abbreviation });
      }
      return result.name;
    }
  };

  preparingRequest(data) {
    let headers = {
      Authorization: 'Token ' + this.token
    };
    Request(
      'post',
      'register-address',
      headers,
      generateFormData(data),
      [],
      this.onLoadSuccess,
      this.onLoadFailed
    );
  }

  onLoadSuccess(response) {
    const { ActiveLanguageReducer } = this.props;
    this.setState({
      address_line_1: '',
      address_line_2: '',
      address_line_3: '',
      country: '',
      state: '',
      city: '',
      zip: '',
      type: '1',
      primary: '0',
      phone_1: '',
      phone_2: ''
    }, () => {
      this.toggleModal(ActiveLanguageReducer.words['popup_addr_add_small']);
    });
  }

  onLoadFailed(error) {
    let errorMessage = '';
    if (error.response) {
      const { data } = error.response;
      if (data.country) errorMessage += data.country[0] + '\n';
      if (data.type) errorMessage += data.type[0];
      this.toggleModal(errorMessage);
    }
  }

  updateAddress(data) {
    let headers = {
      Authorization: 'Token ' + this.token
    };

    Request(
      'patch',
      'update-address',
      headers,
      generateFormData(data),
      [data.id],
      this.onUpdateSuccess,
      this.onUpdateFailed
    );
  }

  onUpdateSuccess(response) {
    if (response.status === 200) {
      this.props.onEditAddress(response.data);
    }
  }

  onUpdateFailed(error) {
    console.log('data: ', error);
  }

  handleInput(ev) {
    const { name, value } = ev.target;
    this.setState({
      [name]: value
    });
  }
  validate() {
    const { address_line_1, country, city, zip } = this.state;

    this.setState({
      address_line_1_validation: !address_line_1 ? 'Address 1 is required' : '',
      country_validation: !country ? 'Country is required' : '',
      city_validation: !city ? 'City is required' : '',
      zip_validation: !zip ? 'Zip is required' : ''
    });
  }

  onSumbit(ev) {
    ev.preventDefault();
    this.validate();
    const { address_line_1, country, city, zip } = this.state;
    if (address_line_1 && country && city && zip) {
      const edit = this.props.match.params.id;
      if (edit) this.updateAddress(this.state);
      else this.preparingRequest(this.state);
    }
  }

  getCountries(page) {
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
  }

  getCountriesSuccess(response) {
    if (response.data.current !== this.state.countriesData.current) {
      this.setState({
        countries: this.state.countries.concat(response.data.results),
        countriesData: response.data
      });
      this.getCountries(this.state.countriesData.current + 1);
    }
  }

  getCountriesFailed(error) {
    console.log('error: ', error);
  }

  handleDrop({ value }) {
    this.setState({
      country: value
    });
  }

  handleType({ value }) {
    this.setState({
      type: value
    });
  }

  render() {
    const { ActiveLanguageReducer, SessionReducer: {user: {country}} } = this.props;
    const edit = this.props.match.params.id;
    const { words } = ActiveLanguageReducer;

    const {
      countries,
      address_line_1_validation,
      city_validation,
      zip_validation,
      country_validation
    } = this.state;

    const options = [
      ...countries.map(item => {
        return { value: item.abbreviation, label: item.name };
      })
    ];
    
    return (
      <React.Fragment>
        <InfoModal
          small
          isActive={this.state.showModal}
          toggleModal={this.toggleModal}
          headline={this.state.headline}
          info={this.state.infoMsg}
        />
        <div className="edit-address">
          <h2>{edit ? 'Edit address' : words['general_addr']}</h2>
          <form onSubmit={this.onSumbit}>
            <div className="box">
              <div className="form-group radio-wrp">
                <Radio
                  value="1"
                  label={words['general_addr-invoice']}
                  onChange={this.handleType}
                  name="type"
                  checked={this.state.type.toString() === '1'}
                />
                <Radio
                  value="2"
                  label={words['general_addr-delivery']}
                  onChange={this.handleType}
                  name="type"
                  checked={this.state.type.toString() === '2'}
                />
              </div>
              <div className="form-group">
                <label>{words['general_addr-addr1']}</label>
                <span className="validate">{address_line_1_validation}</span>
                <input
                  type="text"
                  name="address_line_1"
                  className="form-control"
                  onChange={this.handleInput}
                  value={this.state.address_line_1}
                />
              </div>
              <div className="form-group">
                <label>{words['general_addr-addr2']}</label>
                <input
                  type="text"
                  name="address_line_2"
                  className="form-control"
                  onChange={this.handleInput}
                  value={this.state.address_line_2}
                />
              </div>
              <div className="form-group">
                <label>{words['general_addr-addr3']}</label>
                <input
                  type="text"
                  name="address_line_3"
                  className="form-control"
                  onChange={this.handleInput}
                  value={this.state.address_line_3}
                />
              </div>
              <div className="row">
                <div className="form-group col-xs-8">
                  <label>{words['general_addr-city']}</label>
                  <span className="validate">{city_validation}</span>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    onChange={this.handleInput}
                    value={this.state.city}
                  />
                </div>
                <div className="form-group col-xs-4">
                  <label>{words['general_addr-zip']}</label>
                  <span className="validate">{zip_validation}</span>
                  <input
                    type="text"
                    name="zip"
                    className="form-control"
                    onChange={this.handleInput}
                    value={this.state.zip}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-xs-6">
                  <label>{words['general_addr-country']}</label>
                  <span className="validate">{country_validation}</span>
                  <DropDown
                    value={this.state.country}
                    defaultValue={this.getCountryName(country)}
                    onChange={this.handleDrop}
                    options={options}
                    className="form-control"
                    label="Choose a country"
                    search
                  />
                </div>
                <div className="form-group col-xs-6">
                  <label>{words['general_addr-state']}</label>
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    onChange={this.handleInput}
                    value={this.state.state}
                  />
                </div>
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
            </div>

            <div className="btns-wrp">
              <Link
                className="btn black"
                to='/profile/addresses'
              >
                «{words.general_back}
              </Link>
              <button className="btn black" type="submit">
                {edit ? words.general_save : words.general_add}
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default EditAdress;
