import React, { useState, useEffect } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import ButtonSubmitForm from './ui/ButtonSubmitForm';

import api from './../utils/Api';

import { CurrentUserContext } from './../contexts/CurrentUserContext';
import { CardsContext } from './../contexts/CardsContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialData()
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((error) => console.log(`Данные не загрузились. Ошибка: ${error}`));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(infoCard) {
    setSelectedCard(infoCard);
  }

  function handleCloseAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={cards}>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
          />
          <Footer />
          <ImagePopup {...selectedCard} onClose={handleCloseAllPopups} />
          <PopupWithForm
            name="EditForm"
            title="Редактировать профиль"
            isOpen={isEditProfilePopupOpen}
            onClose={handleCloseAllPopups}
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
              />
              <span
                className="form__input-error"
                id="user-name-input-error"
              ></span>
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
              />
              <span className="form__input-error" id="hobby-input-error"></span>
            </label>
            <ButtonSubmitForm text="Сохранить" label="сохранить" />
          </PopupWithForm>
          <PopupWithForm
            name="AddForm"
            title="Новое место"
            isOpen={isAddPlacePopupOpen}
            onClose={handleCloseAllPopups}
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
          <PopupWithForm
            name="UpdateAvatarForm"
            title="Обновить аватар"
            isOpen={isEditAvatarPopupOpen}
            onClose={handleCloseAllPopups}
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
              <span
                className="form__input-error"
                id="avatar-input-error"
              ></span>
            </label>
            <ButtonSubmitForm text="Сохранить" label="сохранить" />
          </PopupWithForm>
          <PopupWithForm
            name="DeleteForm"
            title="Вы уверены?"
            onClose={handleCloseAllPopups}
          >
            <ButtonSubmitForm text="Да" label="подтвердить" />
          </PopupWithForm>
        </CardsContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
