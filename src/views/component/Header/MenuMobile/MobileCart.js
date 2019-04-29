import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const MobileCart = (countCart, previewMode) => {
  return (
    <div className="cart-box">
      <Link to="/cart" className="cart-icon-number">
        <i className="material-icons dp32">shopping_cart</i>
        <span className="cart-amount">{countCart}</span>
        <span>{previewMode}</span>
      </Link>
    </div>
  );
};

export default withRouter(MobileCart);
