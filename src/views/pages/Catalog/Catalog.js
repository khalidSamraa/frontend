import React from 'react';
import qs from 'query-string';

import moment from 'moment';

import PaginationNumber from '../../component/PaginationNumber';
import Header from './components/Header';
import Grid from './components/Grid';

/* Utils */
import toUTC from '../../../utils/toUTC.js';

class Catalog extends React.Component {
  state = {
    isLoading: this.props.isLoadingContent,
    isError: false,
    searchQuery: qs.parse(this.props.location.search).q,
    rpp: 10,
    sort: 'relevance',
    items: [],
    count: null,
    currentPage: 0,
    number_page: 0,
    nextLink: null,
    prevLink: null
  };

  gotoProduct = (sid, ssid) => {
    // https://stackoverflow.com/questions/38678804/in-react-router-how-do-you-pass-route-parameters-when-using-browser-history-pus
    this.props.history.push({
      pathname: '/product/' + sid,
      state: { SSID: ssid }
    });
  };

  onRead = data => {
    this.props.getProducts(data);
  };

  convertToUTC = date => {
    let tmpDate = date;
    return toUTC(tmpDate._d);
  };

  onBuy = data => {
    let oldItems = JSON.parse(localStorage.getItem('items')) || [];

    let newItem = {
      sid: data.sid,
      start: this.convertToUTC(moment()),
      is_lifetime: 'true'
    };

    oldItems.unshift(newItem);
    this.props.updateCartCount(oldItems.length, true);
    localStorage.setItem('items', JSON.stringify(oldItems));
  };

  changeRPP = event => {
    let val = event.target.value;
    let data = {
      query: this.state.searchQuery,
      page: 1,
      rpp: val,
      sort: this.state.sort
    };
    this.setState({ rpp: val });
    this.onRead(data);
  };

  changeSort = event => {
    let val = event.target.value;
    let data = {
      query: this.state.searchQuery,
      page: 1,
      rpp: this.state.rpp,
      sort: val
    };
    this.setState({ sort: val });
    this.onRead(data);
  };

  componentDidMount() {
    const { searchQuery, rpp, sort } = this.state;
    // load data with search and page 1
    let data = {
      query: searchQuery,
      page: 1,
      rpp: rpp,
      sort: sort
    };
    this.onRead(data);
  }

  pagination = page => {
    const { searchQuery, rpp, sort } = this.state;
    let data = {
      query: searchQuery,
      page: page,
      rpp: rpp,
      sort: sort
    };
    this.onRead(data);
  };

  handlePageClick = data => {
    let selected = data.selected + 1;
    this.pagination(selected);
  };

  render() {
    const { Product, ActiveLanguageReducer } = this.props;
    const { sort, rpp } = this.state;
    const { words } = ActiveLanguageReducer;
    const { products, currentPage, numberPage, count } = Product;

    return (
      <div className="animated fadeIn catalog-page">
        <Header
          count={count}
          words={words}
          currentPage={currentPage}
          number_page={numberPage}
          onPageClick={this.handlePageClick}
          changeSort={this.changeSort}
          sort={sort}
          changeRPP={this.changeRPP}
          rpp={rpp}
        />
        <section className="product-gird">
          <div className="container">
            <div className="row large-height-items">
              <Grid
                data={products}
                words={words}
                onBuy={this.onBuy}
                history={this.props.history}
                gotoProduct={this.gotoProduct}
              />
            </div>
            <div className="row page-numeration-box">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <PaginationNumber
                  current={currentPage}
                  count={count}
                  number_page={numberPage}
                  handle={this.handlePageClick}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Catalog;
