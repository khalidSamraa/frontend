import React, { memo, useState } from 'react';
import PaymentOptions from '../../payments/PaymentOptions';
import PaypalButton from './PayPalButton';

const AddBalancePaymentOptions = memo(function AddBalancePaymentOptions(props) {
    const { payPalPaymentCallbacks, creditCardPaymentCallbacks } = props
    const [amount, setAmount] = useState('');
    const detailOrder = {
        amount
    }
    const successWrapper = (callback) => () => {
        callback();
        setAmount('');
    }

    return (
        <div className="content-wrp">
            <form onSubmit={(ev) => ev.preventDefault()}>
                <div className="text-input">
                    <div>
                        <input type="number" name='amount'
                            value={amount}
                            placeholder="Enter the amount" onChange={(e) => setAmount(e.target.value)}
                        />
                        <PaymentOptions
                            detailOrder={detailOrder}
                            creditCardPaymentButton={
                                <button className="btn-payment-list" disabled={!amount}
                                    onClick={successWrapper(creditCardPaymentCallbacks.onSuccess(amount))}
                                    style={{ fontSize: '1.5rem', width: '100%' }}>
                                    Credit Card
                                </button>
                            }                        
                            payPalButton={
                                <PaypalButton
                                    label={'paypal'}
                                    amount={amount}
                                    disabled={!amount}
                                    onSuccess={successWrapper(payPalPaymentCallbacks.onSuccess(amount))}
                                />
                            }
                        />
                    </div>
                </div>
            </form>
        </div>
    )
})

export default AddBalancePaymentOptions;