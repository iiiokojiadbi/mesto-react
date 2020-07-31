import React, { useState, useEffect } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm'; // !
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ButtonSubmitForm from './ui/ButtonSubmitForm';

import api from './../utils/Api';

import { CurrentUserContext } from './../contexts/CurrentUserContext';

const App = () => {
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
      .catch((error) => console.log(`Ошибка: ${error}`));
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (infoCard) => {
    setSelectedCard(infoCard);
  };

  const handleCloseAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  const handleUpdaterUser = ({ name, about }) => {
    api
      .updateUserInfo({ name, about })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleCloseAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

  const handleUpdaterAvatar = ({ avatar }) => {
    api
      .updateUserAvatar({ avatar })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleCloseAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

  const handleCardLike = ({ likes, cardId }) => {
    const isLiked = likes.some((owner) => owner._id === currentUser._id);
    api
      .likeCard({ isLiked, cardId })
      .then((likes) => {
        const newCards = cards.map((card) =>
          card._id === cardId ? { ...card, likes: likes } : card
        );
        setCards(newCards);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

  const handleCardDelete = ({ cardId }) => {
    api
      .deleteCard({ cardId })
      .then((data) => {
        const newCards = cards.filter((card) => card._id !== cardId);
        setCards(newCards);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
        />
        <Footer />
        <ImagePopup {...selectedCard} onClose={handleCloseAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
          onUpdaterUser={handleUpdaterUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleCloseAllPopups}
          onUpdaterUserAvatar={handleUpdaterAvatar}
        />
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
          name="DeleteForm"
          title="Вы уверены?"
          onClose={handleCloseAllPopups}
        >
          <ButtonSubmitForm text="Да" label="подтвердить" />
        </PopupWithForm>
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
