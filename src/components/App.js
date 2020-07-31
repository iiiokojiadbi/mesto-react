import React, { useState, useEffect } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';

import api from './../utils/Api';

import { CurrentUserContext } from './../contexts/CurrentUserContext';

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedDeleteCardId, setSelectedDeleteCardId] = useState('');
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

  const handleDeletePlaceClick = ({ cardId }) => {
    setIsDeletePlacePopupOpen(true);
    setSelectedDeleteCardId(cardId);
  };

  const handleCardClick = (infoCard) => {
    setSelectedCard(infoCard);
  };

  const handleCloseAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
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

  const handleCardDelete = () => {
    api
      .deleteCard({ cardId: selectedDeleteCardId })
      .then(() => {
        const newCards = cards.filter(
          (card) => card._id !== selectedDeleteCardId
        );
        setCards(newCards);
        handleCloseAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

  const handleAddPlace = ({ name, link }) => {
    api
      .postCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleCloseAllPopups();
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
          onCardLike={handleCardLike}
          onConfirmDelete={handleDeletePlaceClick}
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
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleCloseAllPopups}
          onPost={handleAddPlace}
        />
        <DeletePlacePopup
          isOpen={isDeletePlacePopupOpen}
          onClose={handleCloseAllPopups}
          onDelete={handleCardDelete}
        />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
