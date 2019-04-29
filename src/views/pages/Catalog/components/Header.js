import React from 'react';

import PaginationNumber from '../../../component/PaginationNumber';
import DropDown from './DropDown';

const sortOptions = words => [
  {
    value: 'relevance',
    label: words.catalog_sort_item_relevance
  },
  {
    value: 'title',
    label: words.catalog_sort_item_title
  },
  {
    value: 'composer',
    label: words.catalog_sort_item_composer
  },
  {
    value: 'category',
    label: words.catalog_sort_item_category
  },
  {
    value: 'edition',
    label: words.catalog_sort_item_edition
  },
  {
    value: 'instrument',
    label: words.catalog_sort_item_instrument
  }
];

const scoresPerPageOptions = [
  {
    value: '5',
    label: 5
  },
  {
    value: '10',
    label: 10
  },
  {
    value: '25',
    label: 25
  },
  {
    value: '50',
    label: 50
  },
  {
    value: '100',
    label: 100
  }
];

const Header = props => {
  const {
    words,
    count,
    currentPage,
    number_page,
    onPageClick,
    sort,
    changeSort,
    rpp,
    changeRPP
  } = props;

  return (
    <section className="catalog-nav">
      <div className="container">
        <div className="filters-catalog">
          <div className="catalog-page-title center-content">
            <h1>
              {words.catalog_total_score + ': '}
              <span>{count}</span>
            </h1>
          </div>
          <div className="sort-box center-content">
            <span>{words.catalog_sort_by}: </span>
            <DropDown
              onChange={changeSort}
              value={sort}
              data={sortOptions(words)}
            />
          </div>
          <div className="zeuge-box center-content">
            <span>{words.catalog_score_per_page}</span>
            <DropDown
              onChange={changeRPP}
              value={rpp}
              data={scoresPerPageOptions}
            />
          </div>
          <div className="zeuge-box center-content">
            <div className="page-numeration">
              <PaginationNumber
                current={currentPage}
                count={count}
                number_page={number_page}
                handle={onPageClick}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
