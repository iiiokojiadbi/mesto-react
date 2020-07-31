import React from 'react';

import PopupWithForm from './PopupWithForm';
import ButtonSubmitForm from './ui/ButtonSubmitForm';

const AddPlacePopup = ({ isOpen, onClose }) => {
  return (
    <PopupWithForm
      name="AddForm"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="form__field">
        <input
          type="text"
          className="input input_type_name form__input"
          placeholder="Название"
          name="namePlace"
          id="place-input"
          required
          minLength="1"
          maxLength="30"
          pattern=".*"
        />
        <span className="form__input-error" id="place-input-error"></span>
      </label>
      <label className="form__field">
        <input
          type="url"
          className="input input_type_hobby form__input"
          placeholder="Ссылка на картинку"
          name="urlPic"
          id="url-input"
          required
        />
        <span className="form__input-error" id="url-input-error"></span>
      </label>
      <ButtonSubmitForm text="Создать" label="создать" />
    </PopupWithForm>
  );
};

export default AddPlacePopup;
