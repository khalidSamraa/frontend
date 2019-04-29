import React from 'react';
import Modal from './Skeleton';

const CC_PAYMENT_METHOD = 1;

const generateCC = (listCC, selectedCC, handleOptionChange) => {
  let listCard = listCC;
  if (listCard.length === 0) {
    return 'No credit card found!';
  } else {
    let element = [];
    for (let i = 0; i < listCard.length; i++) {
      element.push(
        <div className="list-cc">
          <div>
            <input
              type="radio"
              name="gender"
              value={listCard[i].pid}
              onChange={handleOptionChange}
              checked={listCard[i].pid === selectedCC}
            />
            &nbsp;{listCard[i].details.brand} xxxx- {listCard[i].details.last4}
          </div>
          {listCard[i].primary && <span>(Default Payment)</span>}
        </div>
      );
    }
    return element;
  }
}

export const Payment = ({
  small,
  toggleModal,
  isActive,
  loadingOnpayCC,
  onPayExecute,
  selectedCC,
  listCC,
  handleOptionChange
}) => (
    <Modal small={small} toggleModal={toggleModal} isActive={isActive}>
      <p>Pay with :</p>
      {
        generateCC(listCC, selectedCC, handleOptionChange)
      }
      <button
        className="btn full-width"
        disabled={loadingOnpayCC}
        onClick={() => onPayExecute(CC_PAYMENT_METHOD, selectedCC)}
      >
        {loadingOnpayCC ? 'Loading...' : 'Pay Now'}
      </button>
    </Modal>
  );

export default Payment;
