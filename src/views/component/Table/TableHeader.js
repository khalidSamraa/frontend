import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableHeaderItem from './TableHeaderItem.js';

const propTypes = {
  columns: PropTypes.array,
  extras: PropTypes.object,

  onHeaderItemClick: PropTypes.func,
  onHeaderClick: PropTypes.func
};

const defaultProps = {
  columns: [],
  extras: {},

  onHeaderItemClick() {},
  onHeaderClick() {}
};

class TableHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: null,
      ascending: true
    };

    this.selectedIndex = null;

    this.onColumnClick = this.onColumnClick.bind(this);
    this.onHeaderClick = this.onHeaderClick.bind(this);
  }

  defaultItemProps(name, index) {
    const { activeIndex, ascending } = this.state;
    const { extras } = this.props;
    let selectedExtra = extras[name];

    return {
      // Control by component
      active: activeIndex === index ? true : false,
      ascending: activeIndex === index ? ascending : true,

      // Control by parent
      index: index,
      name: name,
      onColumnClick: this.onColumnClick,
      key: index,

      // Control by parent, extras prop
      canSort:
        selectedExtra.canSort !== undefined && selectedExtra.canSort !== null
          ? selectedExtra.canSort
          : true,
      className:
        selectedExtra.className !== undefined &&
        selectedExtra.className !== null
          ? selectedExtra.className
          : '',
      clickable:
        selectedExtra.clickable !== undefined &&
        selectedExtra.clickable !== null
          ? selectedExtra.clickable
          : true,
      disabled:
        selectedExtra.disabled !== undefined && selectedExtra.disabled !== null
          ? selectedExtra.disabled
          : false,
      visible:
        selectedExtra.visible !== undefined && selectedExtra.visible !== null
          ? selectedExtra.visible
          : false,
      data:
        selectedExtra.data !== undefined && selectedExtra.data !== null
          ? selectedExtra.data
          : null
    };
  }

  onColumnClick(e, itemData) {
    const { onHeaderItemClick } = this.props;
    const { index, data, ascending } = itemData;
    let { activeIndex } = this.state;
    let senderData = {
      index: index,
      data: data
    };

    if (itemData.active) {
      senderData.ascending = !ascending;
    } else {
      senderData.ascending = true;
      activeIndex = index;
    }

    onHeaderItemClick(e, senderData);
    this.setState({
      activeIndex: activeIndex,
      ascending: senderData.ascending
    });
  }

  onHeaderClick(e) {
    const { onHeaderClick } = this.props;
    onHeaderClick(e);
  }

  buildComponent(data) {
    return <TableHeaderItem {...data} />;
  }

  generateItems(columns) {
    return columns.map((column, i) => {
      return this.buildComponent(this.defaultItemProps(column, i));
    });
  }

  render() {
    const { columns } = this.props;

    return (
      <li
        className="standart-container transition-all row-header"
        onClick={this.onHeaderClick}
      >
        <div className="no-margin row full-width">
          {this.generateItems(columns)}
        </div>
      </li>
    );
  }
}

TableHeader.propTypes = propTypes;
TableHeader.defaultProps = defaultProps;
export default TableHeader;
