import React, { useState, useEffect, useContext } from 'react';
import Card from './Card';

import { CurrentUserContext } from './../contexts/CurrentUserContext';

import api from '../utils/Api';

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) => {
  const currentUser = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cardsData) => setCards(cardsData))
      .catch((error) => console.log(`Ошибка: ${error}`));
  }, []);

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
    <main className="content">
      <section className="profile">
        <img
          className="profile__photo"
          src={currentUser.avatar}
          alt="Фотография пользователя"
        />
        <button
          type="button"
          aria-label="обновить"
          className="btn btn_type_update profile__btn-update"
          onClick={onEditAvatar}
        ></button>
        <div className="profile__info">
          <h2 className="profile__user-name">{currentUser.name}</h2>
          <button
            onClick={onEditProfile}
            type="button"
            aria-label="редактировать"
            className="btn btn_type_edit profile__btn-edit"
          ></button>
          <p className="profile__user-hobby">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          aria-label="добавить"
          className="btn btn_type_add profile__btn-add"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card, index) => {
          return (
            <Card
              key={`${index}-${card._id}`}
              {...card}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
