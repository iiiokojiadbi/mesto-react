import React, { useState, useEffect, useContext } from 'react';

import PopupWithForm from './PopupWithForm';
import ButtonSubmitForm from './ui/ButtonSubmitForm';

import { CurrentUserContext } from './../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdaterUser }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleNameChange = (evt) => {
    const { value } = evt.target;
    setName(value);
  };

  const handleDescriptionChange = (evt) => {
    const { value } = evt.target;
    setDescription(value);
  };

  const handleSubmit = () => {
    onUpdaterUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="EditForm"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmitForm={handleSubmit}
    >
      <label className="form__field">
        <input
          type="text"
          className="input input_type_name form__input"
          placeholder="Введите имя"
          name="name"
          id="user-name-input"
          required
          minLength="2"
          maxLength="40"
          pattern="[А-Яа-яёЁA-Za-z\s-]*"
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="form__input-error" id="user-name-input-error"></span>
      </label>
      <label className="form__field">
        <input
          type="text"
          className="input input_type_hobby form__input"
          placeholder="Введите хобби"
          name="hobby"
          id="hobby-input"
          required
          minLength="2"
          maxLength="200"
          pattern=".*"
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span className="form__input-error" id="hobby-input-error"></span>
      </label>
      <ButtonSubmitForm text="Сохранить" label="сохранить" />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
