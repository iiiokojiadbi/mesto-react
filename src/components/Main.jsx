import React from 'react';

class Main extends React.Component {
  render() {
    const { onEditAvatar, onEditProfile, onAddPlace } = this.props;

    return (
      <main className="content">
        <section className="profile">
          <img
            onClick={onEditAvatar}
            className="profile__photo"
            src="#"
            alt="Фотография пользователя"
          />
          <button
            type="button"
            aria-label="обновить"
            className="profile__btn-update btn btn_type_update"
          ></button>
          <div className="profile__info">
            <h2 className="profile__user-name">Жак-ив Кусто</h2>
            <button
              onClick={onEditProfile}
              type="button"
              aria-label="редактировать"
              className="profile__btn-edit btn btn_type_edit"
            ></button>
            <p className="profile__user-hobby">Исследователь океана</p>
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
