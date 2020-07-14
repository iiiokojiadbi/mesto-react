import React from 'react';
import '../index.css';
import Header from './Header';

function App() {
  return (
    <div className="page">
      <Header />
      <main className="content">
        <section className="profile">
          <img
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
              type="button"
              aria-label="редактировать"
              className="profile__btn-edit btn btn_type_edit"
            ></button>
            <p className="profile__user-hobby">Исследователь океана</p>
          </div>
          <button
            type="button"
            aria-label="добавить"
            className="profile__btn-add btn btn_type_add"
          ></button>
        </section>
        <section className="elements"></section>
      </main>
      <footer className="footer">
        <span className="footer__copyright">© 2020 Mesto Russia</span>
      </footer>
      <section className="popup popup_disabled" id="popupAddForm">
        <div className="popup__container">
          <form
            name="addForm"
            method="post"
            action="#"
            className="form popup__form"
          >
            <button
              type="button"
              aria-label="закрыть"
              className="btn btn_type_close popup__btn-close form__btn-close"
              name="closeForm"
            ></button>
            <h3 className="form__title">Новое место</h3>
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
            <button
              type="submit"
              className="btn btn_type_submit form__btn-submit"
              aria-label="создать"
              name="submitForm"
            >
              Создать
            </button>
          </form>
        </div>
      </section>
      <section className="popup popup_disabled" id="popupEditForm">
        <div className="popup__container">
          <form
            name="editForm"
            method="post"
            action="#"
            className="form popup__form"
          >
            <button
              type="button"
              aria-label="закрыть"
              className="btn btn_type_close popup__btn-close form__btn-close"
              name="closeForm"
            ></button>
            <h3 className="form__title">Редактировать профиль</h3>
            <label className="form__field">
              <input
                type="text"
                className="input input_type_name form__input"
                placeholder="Введите имя"
                name="name"
                id="user-name-input"
                required
                minLength="2"
                maxLength="40"
                pattern="[А-Яа-яёЁA-Za-z\s-]*"
              />
              <span
                className="form__input-error"
                id="user-name-input-error"
              ></span>
            </label>
            <label className="form__field">
              <input
                type="text"
                className="input input_type_hobby form__input"
                placeholder="Введите хобби"
                name="hobby"
                id="hobby-input"
                required
                minLength="2"
                maxLength="200"
                pattern=".*"
              />
              <span className="form__input-error" id="hobby-input-error"></span>
            </label>
            <button
              type="submit"
              className="btn btn_type_submit form__btn-submit"
              aria-label="сохранить"
              name="submitForm"
            >
              Сохранить
            </button>
          </form>
        </div>
      </section>
      <section className="popup popup_disabled" id="popupCardPreview">
        <div className="popup__container">
          <section className="preview-image popup__preview">
            <button
              type="button"
              aria-label="закрыть"
              className="btn btn_type_close popup__btn-close preview-image__btn-close"
            ></button>
            <img src="#" alt="" className="preview-image__img popup__img" />
            <h3 className="preview-image__title popup__title"></h3>
          </section>
        </div>
      </section>
      <section className="popup popup_disabled" id="popupUpdateAvatar">
        <div className="popup__container">
          <form
            name="updateForm"
            method="post"
            action="#"
            className="form popup__form"
          >
            <button
              type="button"
              aria-label="закрыть"
              className="btn btn_type_close popup__btn-close form__btn-close"
              name="closeForm"
            ></button>
            <h3 className="form__title">Обновить аватар</h3>
            <label className="form__field">
              <input
                type="url"
                className="input input_type_hobby form__input"
                placeholder="Ссылка на новый аватар"
                name="urlAvatar"
                id="avatar-input"
                required
              />
              <span
                className="form__input-error"
                id="avatar-input-error"
              ></span>
            </label>
            <button
              type="submit"
              className="btn btn_type_submit form__btn-submit"
              aria-label="создать"
              name="submitForm"
            >
              Сохранить
            </button>
          </form>
        </div>
      </section>
      <section className="popup popup_disabled" id="popupDeleteForm">
        <div className="popup__container">
          <form
            name="deleteForm"
            method="post"
            action="#"
            className="form popup__form"
          >
            <button
              type="button"
              aria-label="закрыть"
              className="btn btn_type_close popup__btn-close form__btn-close"
              name="closeForm"
            ></button>
            <h3 className="form__title">Вы уверены?</h3>
            <button
              type="submit"
              className="btn btn_type_submit form__btn-submit"
              aria-label="создать"
              name="submitForm"
            >
              Да
            </button>
          </form>
        </div>
      </section>
      <template id="card">
        <div className="element">
          <img src="#" alt="" className="element__img" />
          <h2 className="element__title"></h2>
          <span className="element__likes">0</span>
          <button
            type="button"
            aria-label="лайкнуть"
            className="btn btn_type_not-like element__btn-like"
          ></button>
          <button
            type="button"
            aria-label="удалить"
            className="btn btn_type_trash element__btn-trash"
          ></button>
        </div>
      </template>
    </div>
  );
}

export default App;
