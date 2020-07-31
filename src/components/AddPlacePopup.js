import React, { useState, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import ButtonSubmitForm from './ui/ButtonSubmitForm';

const AddPlacePopup = ({ isOpen, onClose, onPost }) => {
  const inputName = useRef();
  const inpitLink = useRef();

  const [name, setName] = useState();
  const [link, setLink] = useState();

  const handleNameChange = () => {
    const { value } = inputName.current;
    setName(value);
  };

  const handleLinkChange = () => {
    const { value } = inpitLink.current;
    setLink(value);
  };

  const handleSubmit = () => {
    onPost({ name, link });
  };

  return (
    <PopupWithForm
      name="AddForm"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmitForm={handleSubmit}
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
          ref={inputName}
          onChange={handleNameChange}
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
          ref={inpitLink}
          onChange={handleLinkChange}
        />
        <span className="form__input-error" id="url-input-error"></span>
      </label>
      <ButtonSubmitForm text="Создать" label="создать" />
    </PopupWithForm>
  );
};

export default AddPlacePopup;
