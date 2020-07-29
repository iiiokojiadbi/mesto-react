import React, { useContext } from 'react';
import Card from './Card';

import { CurrentUserContext } from './../contexts/CurrentUserContext';
import { CardsContext } from './../contexts/CardsContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CardsContext);

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
        {cards.map(({ _id, ...cardInfo }, index) => {
          const myCard = cardInfo.owner._id === currentUser._id;
          const myLike = cardInfo.likes.find(
            (owner) => owner._id === currentUser._id
          );
          return (
            <Card
              key={`${index}-${_id}`}
              {...cardInfo}
              onCardClick={onCardClick}
              isMyCard={myCard}
              isLiked={myLike}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
