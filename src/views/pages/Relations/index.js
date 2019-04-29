import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table from '../../component/Table/Table';
import RelationsRow from './components/TableRow';

import Request from '../../../utils/Request';

import './styles.css';

class Relations extends Component {
  state = {
    rowData: []
  };

  componentDidMount() {
    const { PublisherReducer, InstitutionReducer, Token } = this.props;
    let activeToken;
    if (PublisherReducer.is_auth) {
      activeToken = Token.tokenPublisher;
    } else if (InstitutionReducer.is_auth) {
      activeToken = Token.tokenInstitution;
    }
    Request(
      'get',
      'get-inst-pub-contract-list',
      { Authorization: `Token ${activeToken}` },
      undefined,
      [],
      this.onSuccess,
      this.onFailed
    );
  }

  onSuccess = response => {
    this.setState({
      rowData: this.state.rowData.concat(response.data.contracts)
    });
  };

  onFailed = (params, response) => {
    console.log({ params, response }, 'failed');
  };

  handleCreateContract = () => {
    this.props.history.push('/create-contract');
  };

  renderRow() {
    const { rowData } = this.state;

    if (typeof rowData === 'undefined') {
      return (
        <tr>
          <td colSpan={100}>
            <p className="grey text-center">Data Empty</p>
          </td>
        </tr>
      );
    } else {
      if (rowData.length === 0) {
        return (
          <tr>
            <td colSpan={100}>
              <p className="grey text-center">Data Empty</p>
            </td>
          </tr>
        );
      } else {
        return this.generateRow(rowData);
      }
    }
  }

  generateRow(row) {
    const {
      ActiveLanguageReducer,
      InstitutionReducer,
      PublisherReducer
    } = this.props;
    const { words } = ActiveLanguageReducer;
    let type = '';

    if (InstitutionReducer.is_auth) type = 'publisher';
    else if (PublisherReducer.is_auth) type = 'institution';

    var element = row.map((val, index) => {
      return (
        <RelationsRow
          index={index}
          words={words}
          key={index}
          type={type}
          rowData={val}
        />
      );
    });
    return element;
  }

  render() {
    const {
      ActiveLanguageReducer,
      PublisherReducer,
      InstitutionReducer
    } = this.props;
    const { words } = ActiveLanguageReducer;
    let type = '';

    if (!PublisherReducer.is_auth && !InstitutionReducer.is_auth) return null;

    if (PublisherReducer.is_auth) type = 'institution';
    if (InstitutionReducer.is_auth) type = 'publisher';

    let tableColumns = [
      words[`general_${type}`],
      words['general_contract'],
      words['general_state'],
      words['general_created-at'],
      words['general_latest-action-at'],
      words['general_action']
    ];

    let tableColumnExtras = {};
    tableColumnExtras[words[`general_${type}`]] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12 ',
      canSort: false,
      data: {
        sort: 'original_file_name'
      }
    };
    tableColumnExtras[words['general_contract']] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12 ',
      canSort: true,
      data: {
        sort: 'created'
      }
    };
    tableColumnExtras[words['general_state']] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12 ',
      canSort: true,
      data: {
        sort: 'user'
      }
    };
    tableColumnExtras[words['general_created-at']] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12 ',
      canSort: true,
      data: {
        sort: 'user'
      }
    };
    tableColumnExtras[words['general_latest-action-at']] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12 ',
      canSort: true,
      data: {
        sort: 'user'
      }
    };
    tableColumnExtras[words['general_action']] = {
      disabled: false,
      visible: true,
      clickable: false,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12 ',
      canSort: false,
      data: {
        sort: 'user'
      }
    };

    return (
      <div className="relations">
        <section className="search-area">
          <div className="row title">{words['general_relations']}</div>
        </section>

        {InstitutionReducer.is_auth && (
          <div className="row container btn-wrapper">
            <button className="btn black" onClick={this.handleCreateContract}>
              Create
            </button>
          </div>
        )}

        <section className="container">
          <Table
            columns={tableColumns}
            columnsExtras={tableColumnExtras}
            onHeaderItemClick={this.onTableHeaderItemClick}
          >
            {this.renderRow()}
          </Table>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    SessionReducer: state.SessionReducer,
    Token: state.TokenReducer,
    SearchReducer: state.SearchReducer,
    PublisherReducer: state.PublisherReducer,
    InstitutionReducer: state.InstitutionReducer,
    EnsembleReducer: state.EnsembleReducer,
    ActiveLanguageReducer: state.ActiveLanguageReducer,
    ActiveCurrencyReducer: state.ActiveCurrencyReducer
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
)(Relations);
