import React from 'react';
import classnames from 'classnames';

import logo from '../../../assets/logo.svg';

import './style.css';

const Modal = ({ toggleModal, isActive, small, children }) => (
  <section className={classnames('modal', { show: isActive })}>
    <button className="open-modal" type="button" onClick={() => toggleModal()} />
    <div
      className={classnames('modal__content container', {
        modal__small: small
      })}
    >
      <div className="content-wrp">
        {!small && <img className="modal__icon" src={logo} />}
        {children}
      </div>
    </div>
  </section>
);

export default Modal;
