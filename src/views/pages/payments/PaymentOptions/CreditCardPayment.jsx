import React, { Fragment, memo, useState } from 'react';
import auth from './../../../../redux/account/authToken.js';
import SimpleRequest from './../../../../utils/Request.js';
import { CCPaymentModal } from '../../../component/Modal';

const getAllCreditCards = (onSuccess, onFailure) => {
    SimpleRequest(
        'get',
        'read-payment-method',
        { Authorization: 'Token ' + auth.getActiveToken() },
        {},
        [],
        onSuccess,
        onFailure
    );
}

const getAllCCSuccess = (setListCC, setActiveModalCC, setSelectedCC) =>
    (response) => {
        let res = response.data.results;
        let pid = null;
        for (let i = 0; i < res.length; i++) {
            if (res[i].primary) {
                pid = res[i].pid;
            }
        }

        setListCC(res);
        setActiveModalCC(true);
        setSelectedCC(pid);
    }

const onCCPay = (detailOrder, beforePayment, onSuccess, onFailure, pid) => {
    beforePayment && beforePayment();

    const payload = {
        scores: JSON.stringify(detailOrder),
        payment_method: 1,
        payment_method_id: pid
    };

    executePayment(payload, onSuccess, onFailure)
}


const executePayment = (payload, onSuccess, onFailure) => {
    SimpleRequest(
        'post',
        'item-purchase',
        { Authorization: 'Token ' + auth.getActiveToken() },
        payload,
        [],
        onSuccess,
        onFailure
    );
}

const CreditCardPayment = memo(function CreditCardPayment(props) {
    const { detailOrder, onSuccess, onFailure } = props;

    const [isActiveModalCC, setActiveModalCC] = useState(false);
    const [selectedCC, setSelectedCC] = useState(null);
    const [listCC, setListCC] = useState([]);
    const [loadingOnpayCC, setLoadingOnpayCC] = useState();

    const toggleCCModal = () => setActiveModalCC(!isActiveModalCC);
    const handleOptionChange = (e) => setSelectedCC(e.target.value);

    const beforePayment = () => setLoadingOnpayCC(true);
    const onSuccessContext = () => {
        onSuccess && onSuccess();
        toggleCCModal();
        setLoadingOnpayCC(false);
    }
    const onFailureContext = () => {
        onFailure && onFailure();
        toggleCCModal();
        setLoadingOnpayCC(false);
    }
    
    return (
        <Fragment>
            <li
                className="btn-payment-list"
                onClick={e => getAllCreditCards(getAllCCSuccess(setListCC, setActiveModalCC, setSelectedCC))}
            >
                Credit Card
            </li>
            <CCPaymentModal
                small
                toggleModal={toggleCCModal}
                isActive={isActiveModalCC}
                loadingOnpayCC={loadingOnpayCC}
                onPayExecute={() => onCCPay(detailOrder, beforePayment, onSuccessContext, onFailureContext, selectedCC)}
                selectedCC={selectedCC}
                listCC={listCC}
                handleOptionChange={handleOptionChange}
            />
        </Fragment>

    )
})

export default CreditCardPayment
