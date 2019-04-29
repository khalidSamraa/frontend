import React from 'react';

import Modal from './Skeleton';

const InfoModal = ({
  small,
  toggleModal,
  isActive,
  headline,
  info,
  children
}) => (
  <Modal small={small} toggleModal={toggleModal} isActive={isActive}>
    {headline && <h3>{headline}</h3>}
    {info && <p>{info}</p>}
    {children}
    <div className="submit-input">
      <input
        type="button"
        value="OK"
        className="black"
        onClick={() => toggleModal()}
      />
    </div>
  </Modal>
);

export default InfoModal;
