import React from 'react';

import PopupWithForm from './PopupWithForm'; // !
import ButtonSubmitForm from './ui/ButtonSubmitForm';

const DeletePlacePopup = ({ isOpen, onClose, onDelete }) => {
  return (
    <PopupWithForm
      name="DeleteForm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmitForm={onDelete}
    >
      <ButtonSubmitForm text="Да" label="подтвердить" />
    </PopupWithForm>
  );
};

export default DeletePlacePopup;
