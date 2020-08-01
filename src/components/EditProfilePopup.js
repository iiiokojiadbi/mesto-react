import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import ButtonSubmitForm from './ui/ButtonSubmitForm';
import InputForm from './ui/InputForm';

import { CurrentUserContext } from './../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdaterUser }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { name, about } = currentUser;
    setName(name);
    setDescription(about);
  }, [currentUser]);

  useEffect(() => {
    hideErrors();
  }, [isOpen]);

  useEffect(() => {
    if (!errorName && !errorDescription) setIsValid(true);
    return () => setIsValid(false);
  }, [errorName, errorDescription]);

  const hideErrors = () => {
    setErrorName('');
    setErrorDescription('');
  };

  const handleNameChange = (evt) => {
    const { value, validationMessage } = evt.target;
    setName(value);
    if (validationMessage !== errorName) setErrorName(validationMessage);
  };

  const handleDescriptionChange = (evt) => {
    const { value, validationMessage } = evt.target;
    setDescription(value);
    if (validationMessage !== errorDescription)
      setErrorDescription(validationMessage);
  };

  const handleClose = () => {
    const { name, about } = currentUser;
    setName(name);
    setDescription(about);
    onClose();
  };

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
      onClose={handleClose}
      onSubmitForm={handleSubmit}
      isValid={isValid}
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
        <span
          className={`form__input-error ${
            errorName && 'form__input-error_active'
          }`}
        >
          {errorName}
        </span>
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
        <span
          className={`form__input-error ${
            errorDescription && 'form__input-error_active'
          }`}
        >
          {errorDescription}
        </span>
      </label>
      <ButtonSubmitForm text="Сохранить" label="сохранить" isActive={isValid} />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
