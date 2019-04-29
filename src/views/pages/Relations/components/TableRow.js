import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash/core';

class RelationsRow extends Component {
  state = {
    showList: false
  };

  toggleList = () => this.setState({ showList: !this.state.showList });

  render() {
    const {
      props: { rowData, words, type },
      state: { showList }
    } = this;

    return (
      <li className="standard-container transition-all">
        <div className="pointer no-margin row full-width">
          <div className="col-content col-body col-md-2 col-sm-2 col-xs-12">
            {rowData[`${type}_name`]}
          </div>
          <div className="col-content col-body col-md-2 col-sm-2 col-xs-12">
            {rowData.contract_name}
          </div>
          <div className="col-content col-body col-md-2 col-sm-2 col-xs-12">
            {rowData.latest_state}
          </div>
          <div className="col-content col-body col-md-2 col-sm-2 col-xs-12">
            {moment(rowData.latestActionAt).format('YYYY - MM - DD')}
          </div>
          <div className="col-content col-body col-md-2 col-sm-2 col-xs-12">
            {moment(rowData.createdAt).format('YYYY - MM - DD')}
          </div>
          <div className="col-content col-body col-md-2 col-sm-2 col-xs-12 more">
            <a onClick={this.toggleList}>...</a>
            {showList && (
              <ul className="sub-menu">
                {type === 'publisher' && (
                  <React.Fragment>
                    <li className="submenu__item">{words['general_accept']}</li>
                    <li className="submenu__item">{words['general_reject']}</li>
                  </React.Fragment>
                )}
                <li className="submenu__item">{words['general_delete']}</li>
                <li className="submenu__item">{words['general_change']}</li>
                <li className="submenu__item">{words['general_history']}</li>
              </ul>
            )}
          </div>
        </div>
      </li>
    );
  }
}

export default RelationsRow;
