import React, { memo } from 'react';

const EmptyRow = memo(function EmptyRow(props) {
    const { words, history } = props;
    return (
        <div>
            <div className="row empty-cart">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <p>{words.cart_empty_description}</p>
                </div>
            </div>
            <div className="row cart-go-checkout">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <a
                        tabIndex={0}
                        role="button"
                        onClick={() => history.push('/catalog')}
                        className="back-shopping-button"
                    >
                        ← {words.cart_continue_shopping}
                    </a>
                </div>
            </div>
        </div>
    )
})

export default EmptyRow
