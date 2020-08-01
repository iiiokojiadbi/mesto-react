import React, { useState, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import ButtonSubmitForm from './ui/ButtonSubmitForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdaterUserAvatar }) => {
  const inputUrl = useRef();

  const [avatar, setAvatar] = useState('');

  const handleUrlChange = () => setAvatar(inputUrl.current.value);
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
        <span className="form__input-error" id="avatar-input-error"></span>
      </label>
      <ButtonSubmitForm text="Сохранить" label="сохранить" />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
