import React, { useState } from 'react';
import classnames from 'classnames';

const handleSubmit = (history, searchQuery) => event => {
  event.preventDefault();
  history.push('/catalog/' + searchQuery);
};

const SearchBox = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const { history, match, searchBox } = props;

  return (
    <div
      className={classnames('search-header-box slide', {
        open: searchBox
      })}
    >
      <div className="row search-form-box">
        <div className="col-md-12">
          <form onSubmit={handleSubmit(history, searchQuery)}>
            <div className="search-input">
              <input
                type="text"
                defaultValue={match.params.query}
                placeholder="Search..."
                onChange={event => setSearchQuery(event.target.value)}
                className="search-text"
              />
              <button className="send-search">
                <span className="search-icon header__search-box-icon" />
                Find
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
