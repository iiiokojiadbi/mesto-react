import React from 'react';
import api from '../utils/Api';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      userDesctiption: null,
      userAvatar: null,
    };

    api
      .getUserInfo()
      .then((userInfo) => {
        this.setState({
          userName: userInfo.name,
          userDescription: userInfo.about,
          userAvatar: userInfo.avatar,
        });
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }

  render() {
    const { onEditAvatar, onEditProfile, onAddPlace } = this.props;
    const { userName, userDescription, userAvatar } = this.state;

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
}

export default Main;
