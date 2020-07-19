import React from 'react';
import api from '../utils/Api';

function Main({ onEditAvatar, onEditProfile, onAddPlace }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <img
          onClick={onEditAvatar}
          className="profile__photo"
          src={userAvatar}
          alt="Фотография пользователя"
        />
        <button
          type="button"
          aria-label="обновить"
          className="profile__btn-update btn btn_type_update"
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
      <section className="elements"></section>
    </main>
  );
}

export default Main;
