import React, { useContext } from 'react';
import Card from './Card';

import { CurrentUserContext } from './../contexts/CurrentUserContext';

const Main = ({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onConfirmDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);

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
              onCardLike={onCardLike}
              onConfirmDelete={onConfirmDelete}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
