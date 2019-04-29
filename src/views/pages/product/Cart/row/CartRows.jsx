import React, { Fragment, memo } from 'react';

import CartRow from './../../component/CartRow.js';

const CartRows = memo(function CartRows(props) {
  const { rows, total, words, history, onBuy, removeItem, width } = props;
  return (
    <Fragment>
      {rows.map((val, index) => {
        return (
          <CartRow
            key={index}
            rowData={val}
            index={index}
            history={history}
            onBuy={onBuy}
            total={total}
            removeItem={removeItem}
            words={words}
            width={width}
          />
        );
      })}
    </Fragment>
  );
});

export default CartRows;
