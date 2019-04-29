import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auth from '../../../../redux/account/authToken.js';

import Table from '../../../component/Table/Table.js';
import LibrariesRow from '../../../component/Row/LibrariesRow.js';
import Request from '../../../../utils/Request.js';

import './styles.css';

class BookList extends Component {
  constructor(props) {
    super(props);

    this.onLoadSuccess = this.onLoadSuccess.bind(this);
    this.onLoadFailed = this.onLoadFailed.bind(this);

    this.onTableHeaderItemClick = this.onTableHeaderItemClick.bind(this);

    this.onDeleteOptionClick = this.onDeleteOptionClick.bind(this);
    // this.onDeleteSuccess = this.onDeleteSuccess.bind(this);
    // this.onDeleteFailed = this.onDeleteFailed.bind(this);

    this.token = Auth.getActiveToken();
    this.state = {
      items: []
    };
  }

  preparingRequest(search = '', order = '') {
    let data = {
      headers: {
        Authorization: 'Token ' + this.token
      },
      payloads: {
        ordering: order,
        search
      }
    };
    Request(
      'get',
      'library-read',
      data.headers,
      data.payloads,
      [],
      this.onLoadSuccess,
      this.onLoadFailed
    );
  }

  onLoadSuccess(response) {
    this.props.onSort(response.data.results);
  }

  onLoadFailed(error) {
    console.log({ error });
  }

  onTableHeaderItemClick(e, data) {
    let fields = data.data.sort.split(',');
    for (let i = 0; i < fields.length; i++) {
      if (!data.ascending) {
        fields[i] = '-' + fields[i];
      }
    }
    this.preparingRequest('', fields.join(','));
  }

  onDeleteOptionClick(data, text) {
    this.props.onDeleteScore(data);
  }

  generateRows() {
    const { words, items } = this.props;

    return items.map((value, index) => {
      let score = {
        sid: value.sid,
        composer: value.composer,
        title: value.title,
        icon: value.icon,
        pages: value.pages,
        category: value.category,
        edition: value.edition,
        instrument: value.instrument
      };

      let usageFee = {
        startDate: value.start,
        price: value.price
      };
      let orderer = {
        oid: value.order.oid,
        created: value.order.created,
        buyer: value.order.buyer,
        state: value.order.state
      };
      const data = {
        score: value.sid,
        order: value.order.oid,
        assigment: value.aid,
        index: index
      };
      return (
        <LibrariesRow
          index={index}
          score={score}
          composer={value.composer}
          usageFee={usageFee}
          orderer={orderer}
          key={index}
          options={
            <div className="dropdown member-menu">
              <button
                className="btn-primary library-delete-btn"
                onClick={() => this.onDeleteOptionClick(data)}
              >
                Delete
              </button>
            </div>
          }
          words={words}
        />
      );
    });
  }

  render() {
    const { words } = this.props;
    let tableColumns = [
      words.library_table_header_title,
      words.library_table_header_composer,
      words.library_table_header_edition,
      words.library_table_header_instrument,
      words.library_table_header_cost,
      words.library_table_header_ordered_by,
      'Auto-Cancel At'
    ];
    let tableColumnExtras = {};
    tableColumnExtras[words.library_table_header_title] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12 ',
      canSort: true,
      data: {
        sort: 'purchase__score__ssid__original_title'
      }
    };
    tableColumnExtras[words.library_table_header_composer] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12 ',
      canSort: true,
      data: {
        sort: 'purchase__score__ssid__original_composer'
      }
    };
    tableColumnExtras[words.library_table_header_edition] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12 ',
      canSort: true,
      data: {
        sort: 'purchase__score__original_edition'
      }
    };
    tableColumnExtras[words.library_table_header_instrument] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12 ',
      canSort: true,
      data: {
        sort: 'purchase__score__original_instrument'
      }
    };
    tableColumnExtras[words.library_table_header_cost] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12 ',
      canSort: true,
      data: {
        sort: 'total_price,purchase__start'
      }
    };
    tableColumnExtras[words.library_table_header_ordered_by] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12 ',
      canSort: true,
      data: {
        sort: 'order__ordered_by'
      }
    };
    tableColumnExtras['Auto-Cancel At'] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12 ',
      canSort: true,
      data: {
        sort: 'order__ordered_by'
      }
    };

    return (
      <div className="full-width">
        <Table
          columns={tableColumns}
          columnsExtras={tableColumnExtras}
          onHeaderItemClick={this.onTableHeaderItemClick}
          noDataDesc={words.library_empty}
        >
          {this.generateRows()}
        </Table>
      </div>
    );
  }
}
export default BookList;
