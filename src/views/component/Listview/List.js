import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  getScrollBottomPercent,
  isTimeToLoadMore
} from '../../../utils/Scroll.js';

const propTypes = {
  title: PropTypes.string,
  headerStyle: PropTypes.object,
  customHeader: PropTypes.element,

  loadMore: PropTypes.bool,
  loadMorePercent: PropTypes.number,
  onLoadMore: PropTypes.func,

  emptyMessage: PropTypes.string,

  options: PropTypes.element,
  hide: PropTypes.bool,

  canClose: PropTypes.bool,
  onClose: PropTypes.func,

  height: PropTypes.number,
  className: PropTypes.string
};

const defaultProps = {
  title: '',
  headerStyle: {},
  customHeader: null,

  loadMore: false,
  loadMorePercent: 0,
  onLoadMore() {},

  emptyMessage: '',

  options: null,
  hide: false,

  canClose: false,
  onClose() {},

  height: 437,
  className: ''
};

class List extends Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);

    this.loadMoreProcessing = false;
  }

  componentWillReceiveProps(nextProps) {
    this.loadMoreProcessing = false;
  }

  handleScroll(e) {
    const { loadMore, loadMorePercent, onLoadMore } = this.props;

    if (
      loadMore &&
      !this.loadMoreProcessing &&
      isTimeToLoadMore(e, loadMorePercent)
    ) {
      this.loadMoreProcessing = true;
      onLoadMore();
    }
  }

  renderHeader() {
    const {
      headerStyle,
      title,
      options,
      customHeader,
      canClose,
      onClose
    } = this.props;
    if (customHeader !== null) {
      return customHeader;
    } else {
      return (
        <div className="gi-header border-top" style={headerStyle}>
          <div className="gi-title cursor">{title}</div>
          {options}
          {canClose && (
            <i className="material-icons panel-close" onClick={onClose}>
              close
            </i>
          )}
        </div>
      );
    }
  }

  render() {
    const { className, children, hide, emptyMessage, height } = this.props;

    return (
      <div className={classnames(className, { hide: hide })}>
        <div className="animated fadeIn">
          {this.renderHeader()}

          {/* CONTENT */}
          <div className="row center-xs">
            <div className="col-xs-12">
              <div className="box">
                <ul
                  style={{ height: height + 'px' }}
                  className="member-list scrolled-item border-bottom"
                  onScroll={this.handleScroll}
                >
                  {(children === undefined || children.length === 0) && (
                    <li
                      role="button"
                      className="center-content"
                      style={{
                        height: '100%',
                        fontSize: '18px',
                        color: '#c6c6c6'
                      }}
                    >
                      {emptyMessage}
                    </li>
                  )}

                  {children !== undefined && children.length > 0 && children}
                </ul>
              </div>
            </div>
          </div>
          {/* END CONTENT */}
        </div>
      </div>
    );
  }
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;
export default List;
