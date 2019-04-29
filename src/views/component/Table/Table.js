import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableHeader from './TableHeader.js';

const propTypes = {
  columns: PropTypes.array,
  columnsExtras: PropTypes.object,

  noDataDesc: PropTypes.string,

  onHeaderItemClick: PropTypes.func,
  onHeaderClick: PropTypes.func
};

const defaultProps = {
  columns: [],
  columnsExtras: {},

  noDataDesc: 'No Data',

  onHeaderItemClick() {},
  onHeaderClick() {}
};

class Table extends Component {
  constructor(props) {
    super(props);

    this.onHeaderItemClick = this.onHeaderItemClick.bind(this);
    this.onHeaderClick = this.onHeaderClick.bind(this);
  }

  onHeaderItemClick(e, data) {
    const { onHeaderItemClick } = this.props;
    onHeaderItemClick(e, data);
  }

  onHeaderClick(e) {
    const { onHeaderClick } = this.props;
    onHeaderClick(e);
  }

  renderNoData() {
    const { noDataDesc } = this.props;
    return (
      <li className="standart-container transition-all">
        <div className="no-margin row full-width center-content no-data">
          {noDataDesc}
        </div>
      </li>
    );
  }

  render() {
    const { columns, columnsExtras } = this.props;

    return (
      <ul className="book-list full-width">
        <TableHeader
          columns={columns}
          extras={columnsExtras}
          onHeaderClick={this.onHeaderClick}
          onHeaderItemClick={this.onHeaderItemClick}
        />
        <div className="table-cell">
          {this.props.children.length > 0
            ? this.props.children
            : this.renderNoData()}
        </div>
      </ul>
    );
  }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;
export default Table;
