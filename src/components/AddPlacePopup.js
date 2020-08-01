import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import ButtonSubmitForm from './ui/ButtonSubmitForm';
import InputForm from './ui/InputForm';

const AddPlacePopup = ({ isOpen, onClose, onPost }) => {
  const [name, setName] = useState();
  const [link, setLink] = useState();

  const handleNameChange = (evt) => {
    const { value } = evt.target;
    setName(value);
  };

  const handleLinkChange = (evt) => {
    const { value } = evt.target;
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
        <InputForm
          placeholder="Название места"
          name="place"
          required
          length={{ min: 1, max: 30 }}
          value={name}
          onInputChange={handleNameChange}
        />
        <span className="form__input-error" id="place-input-error"></span>
      </label>
      <label className="form__field">
        <InputForm
          type="url"
          placeholder="Ссылка на картинку"
          name="linkPlace"
          required
          value={link}
          onInputChange={handleLinkChange}
        />
        <span className="form__input-error" id="url-input-error"></span>
      </label>
      <ButtonSubmitForm text="Создать" label="создать" />
    </PopupWithForm>
  );
};

export default AddPlacePopup;
