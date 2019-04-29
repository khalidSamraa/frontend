import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = props => {
  // todo make it local, use reducer to update the searchQuery value
  const { linkCart, count, previewMode } = props;

  return (
    <div className="cart-box">
      <Link to={linkCart} className="cart-icon-number">
        <span className="cart-icon" />
        <span className="cart-amount">{count}</span>
        <span>{previewMode}</span>
      </Link>
    </div>
  );
};

const mapStateToProps = state => {
  const { cart, EnsembleReducer, SessionReducer, PublisherReducer } = state;
  let count = 0;
  if (EnsembleReducer.is_auth) count = cart.ensembleCart.length;
  else if (PublisherReducer.is_auth) count = cart.PublisherCart.length;
  else if (SessionReducer.is_auth) count = cart.userCart.length;

  return { count };
};

export default connect(mapStateToProps)(Cart);
