import React, { useState, useEffect, useContext } from 'react';

import PopupWithForm from './PopupWithForm';
import ButtonSubmitForm from './ui/ButtonSubmitForm';

import { CurrentUserContext } from './../contexts/CurrentUserContext';

const EditAvatarPopup = ({ isOpen, onClose }) => {
  const currentUser = useContext(CurrentUserContext);

  // const [avatar, setAvatar] = useState('');

  // useEffect(() => {
  //   setAvatar(currentUser.avatar);
  // }, [currentUser]);

  return (
    <PopupWithForm
      name="EditForm"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="form__field">
        <input
          type="url"
          className="input input_type_hobby form__input"
          placeholder="Ссылка на новый аватар"
          name="urlAvatar"
          id="avatar-input"
          required
        />
        <span className="form__input-error" id="avatar-input-error"></span>
      </label>
      <ButtonSubmitForm text="Сохранить" label="сохранить" />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
