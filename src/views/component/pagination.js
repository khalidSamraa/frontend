import React from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends React.Component {
  renderPaginationNumber(total, limit, to, currentPage, nextLink) {
    let totalPage = Math.ceil(total / limit);

    if(total === 0) {
      return (null)
    }

    if(nextLink === null) {
      totalPage = currentPage;
    }

    let number    = [];
    let tmp       = null;

    for (let i = 1; i <= totalPage; i++) {
      if(currentPage === i) {
        tmp = <li className="active" key={i} onClick={(e)=>to(i)}><a tabIndex="0" role="button">{i}</a></li>
      } else {
        tmp = <li key={i} onClick={(e)=>to(i)}><a tabIndex="0" role="button">{i}</a></li>
      }
      number.push(tmp)
    }
    return number;
  }

  renderNextButton(total, nextLink, to, currentPage) {
    if(total === 0) {
      return (null)

    } else if (nextLink === null) {
      return (
        <li className="disable">
          <a tabIndex="0" role="button">
            <span className="last"></span>
          </a>
        </li>
      )

    } else {
      return (
        <li onClick={(e)=>to(currentPage + 1)}>
          <a tabIndex="0" role="button">
            <span className="last"></span>
          </a>
        </li>
      )
    }
  }

  renderPrevButton(total, prevLink, to, currentPage) {
    if(total === 0) {
      return(null);

    } else if(prevLink === null ) {
      return(
        <li className="disable">
          <a tabIndex="0" role="button">
            <span className="first"></span>
          </a>
        </li>
      )
      
    } else {
      return (
        <li onClick={(e)=>to(currentPage - 1)}>
          <a tabIndex="0" role="button">
            <span className="first"></span>
          </a>
        </li>
      )
    }
  }

  render() {
    const {
      total, 
      to,
      limit, 
      currentPage, 
      nextLink, 
      prevLink
    } = this.props;

    if(currentPage < 1) {
      return (null)
    }

    return (
      <div className="page-numeration">
        <ul>
          {this.renderPrevButton(total, prevLink, to, currentPage)}
            {this.renderPaginationNumber(total, limit, to, currentPage, nextLink)}
          {this.renderNextButton(total, nextLink, to, currentPage)}
        </ul>
      </div>
    );
  }
}

Pagination.propTypes = {
  total       : PropTypes.number,
  limit       : PropTypes.number,
  to          : PropTypes.func,
  currentPage : PropTypes.number,
  nextLink    : PropTypes.string,
  prevLink    : PropTypes.string
};