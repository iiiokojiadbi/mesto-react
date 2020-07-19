import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialData().then(([userInfo, initialCards]) => {
      setUserName(userInfo.name);
      setUserDescription(userInfo.about);
      setUserAvatar(userInfo.avatar);

      setCards(
        initialCards.map(({ _id, ...cardInfo }) => {
          const myCard = cardInfo.owner._id === userInfo._id;
          const myLike = cardInfo.likes.find(
            (owner) => owner._id === userInfo._id
          );
          return (
            <Card
              key={_id}
              {...cardInfo}
              onCardClick={onCardClick}
              isMyCard={myCard}
              isLiked={myLike}
            />
          );
        })
      );
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
          className="profile__btn-update btn btn_type_update"
          onClick={onEditAvatar}
        ></button>
        <div className="profile__info">
          <h2 className="profile__user-name">{userName}</h2>
          <button
            onClick={onEditProfile}
            type="button"
            aria-label="редактировать"
            className="profile__btn-edit btn btn_type_edit"
          ></button>
          <p className="profile__user-hobby">{userDescription}</p>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          aria-label="добавить"
          className="profile__btn-add btn btn_type_add"
        ></button>
      </section>
      <section className="elements">{cards}</section>
    </main>
  );
}

export default Main;
