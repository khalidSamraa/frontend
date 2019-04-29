import React from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

import Modal from './Skeleton';
import { required, email } from '../../../utils/validate';

const InfoModal = ({
  small,
  toggleModal,
  isActive,
  words,
  recoveryEmail,
  resetButton,
  forgotMessage,
  onChange,
  onKeyPress
}) => (
  <Modal small={small} toggleModal={toggleModal} isActive={isActive}>
    <p>{words.login_reset_title}</p>
    <Form>
      <div className="text-input forgot-passwod__input">
        <Input
          type="email"
          name="emailRecovery"
          placeholder={words.login_field_email}
          value={recoveryEmail}
          onChange={onChange}
          validations={[required, email]}
          onKeyPress={onKeyPress}
        />
      </div>
      <div className="submit-input">{resetButton}</div>
    </Form>
    <p>{forgotMessage}</p>
  </Modal>
);

export default InfoModal;
