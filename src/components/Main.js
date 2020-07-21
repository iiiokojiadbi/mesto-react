import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialData().then(([userInfo, initialCards]) => {
      setUserName(userInfo.name);
      setUserDescription(userInfo.about);
      setUserAvatar(userInfo.avatar);
      setUserId(userInfo._id);
      setCards(initialCards);
    });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <img
          className="profile__photo"
          src={userAvatar}
          alt="Фотография пользователя"
        />
        <button
          type="button"
          aria-label="обновить"
          className="btn btn_type_update profile__btn-update"
          onClick={onEditAvatar}
        ></button>
        <div className="profile__info">
          <h2 className="profile__user-name">{userName}</h2>
          <button
            onClick={onEditProfile}
            type="button"
            aria-label="редактировать"
            className="btn btn_type_edit profile__btn-edit"
          ></button>
          <p className="profile__user-hobby">{userDescription}</p>
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
          const myCard = cardInfo.owner._id === userId;
          const myLike = cardInfo.likes.find((owner) => owner._id === userId);
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
