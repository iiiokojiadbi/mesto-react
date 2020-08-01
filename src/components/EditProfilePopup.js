import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import ButtonSubmitForm from './ui/ButtonSubmitForm';
import InputForm from './ui/InputForm';

import { CurrentUserContext } from './../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdaterUser }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const { name, about } = currentUser;
    setName(name);
    setDescription(about);
  }, [currentUser]);

  const handleNameChange = (evt) => setName(evt.target.value);
  const handleDescriptionChange = (evt) => setDescription(evt.target.value);
  const handleSubmit = () =>
    onUpdaterUser({
      name,
      about: description,
    });

  return (
    <PopupWithForm
      name="EditForm"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmitForm={handleSubmit}
    >
      <label className="form__field">
        <InputForm
          placeholder="Введите имя"
          name="name"
          length={{ min: 2, max: 40 }}
          pattern="[А-Яа-яёЁA-Za-z\s-]*"
          required
          value={name}
          onInputChange={handleNameChange}
        />
        <span className="form__input-error" id="user-name-input-error"></span>
      </label>
      <label className="form__field">
        <InputForm
          placeholder="Введите хобби"
          name="hobby"
          length={{ min: 2, max: 200 }}
          required
          value={description}
          onInputChange={handleDescriptionChange}
        />
        <span className="form__input-error" id="hobby-input-error"></span>
      </label>
      <ButtonSubmitForm text="Сохранить" label="сохранить" />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
