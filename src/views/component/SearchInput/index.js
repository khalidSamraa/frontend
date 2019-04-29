import React, { useState } from 'react';

const SearchInput = ({ words, onSubmit, value }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => setSearchQuery(e.target.value);

  const handleSubmit = () => onSubmit(searchQuery);

  const clearInput = () => setSearchQuery('');

  const onKeyDown = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="search-input">
      <div className="search-box">
        <input
          type="text"
          placeholder={words.setprice_search}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          className="search-text"
          value={value}
        />
        {searchQuery != '' && (
          <div className="delete-btn" onClick={clearInput}>
            <span
              style={{
                backgroundImage: 'url(media/images/icon/delete.svg)'
              }}
              className="delete-icon"
            />
          </div>
        )}
      </div>
      <div className="search-btn">
        <button className="send-search" onClick={handleSubmit}>
          {words.setprice_find}
          <span
            style={{
              backgroundImage: "url('media/images/search-icon.png')"
            }}
            className="search-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
