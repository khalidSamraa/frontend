import React from 'react';

import CatalogRow from './CatalogRow';

const Grid = ({ data, words, history, gotoProduct, onBuy }) => {
  if (data.length === 0) {
    return (
      <div className="data-not-found error-center">
        <h3>{words.catalog_title_not_found}</h3>
        <p>{words.catalog_description_not_found}</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      {data.map((item, i) => (
        <CatalogRow
          key={i}
          rowData={item}
          key={item.sid}
          history={history}
          onBuy={onBuy}
          gotoProduct={gotoProduct}
          words={words}
        />
      ))}
    </React.Fragment>
  );
};

export default Grid;
