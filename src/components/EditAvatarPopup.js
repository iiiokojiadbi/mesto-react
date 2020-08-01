import React, { useState, useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import ButtonSubmitForm from './ui/ButtonSubmitForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdaterUserAvatar }) => {
  const inputUrl = useRef();

  const [avatar, setAvatar] = useState('');
  const [errorAvatar, setErrorAvatar] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setAvatar('');
    inputUrl.current.value = '';
    hideErrors();
    setIsValid(false);
  }, [isOpen]);

  useEffect(() => {
    if (errorAvatar) setIsValid(false);
    return () => setIsValid(true);
  }, [errorAvatar]);

  const hideErrors = () => {
    setErrorAvatar('');
  };

  const handleUrlChange = () => {
    const { value, validationMessage } = inputUrl.current;
    setAvatar(value);
    if (validationMessage !== errorAvatar) setErrorAvatar(validationMessage);
  };

  const handleSubmit = () =>
    onUpdaterUserAvatar({
      avatar,
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
        <input
          type="url"
          className="input input_type_hobby form__input"
          placeholder="Ссылка на новый аватар"
          name="urlAvatar"
          id="avatar-input"
          required
          ref={inputUrl}
          onChange={handleUrlChange}
        />
        <span
          className={`form__input-error ${
            errorAvatar && 'form__input-error_active'
          }`}
        >
          {errorAvatar}
        </span>{' '}
      </label>
      <ButtonSubmitForm text="Сохранить" label="сохранить" isActive={isValid} />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
