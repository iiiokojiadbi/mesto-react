import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isDeleteCardPopupOpen: false,
    };
  }

  handleEditAvatarClick = () => {
    this.setState({ isEditAvatarPopupOpen: true });
  };

  handleEditProfileClick = () => {
    this.setState({ isEditProfilePopupOpen: true });
  };

  handleAddPlaceClick = () => {
    this.setState({ isAddPlacePopupOpen: true });
  };

  handleDeletePlaceClick = () => {
    this.setState({ isDeleteCardPopupOpen: true });
  };

  handleCloseAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isDeleteCardPopupOpen: false,
    });
  };

  render() {
    const {
      isEditAvatarPopupOpen,
      isEditProfilePopupOpen,
      isAddPlacePopupOpen,
      isDeleteCardPopupOpen,
    } = this.state;

    return (
      <div className="page">
        <Header />
        <Main
          onEditProfile={this.handleEditProfileClick}
          onAddPlace={this.handleAddPlaceClick}
          onEditAvatar={this.handleEditAvatarClick}
        />
        <Footer />
        <ImagePopup />
        <PopupWithForm
          name="EditForm"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={this.handleCloseAllPopups}
        >
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
          >
            Сохранить
          </button>
        </PopupWithForm>
        <PopupWithForm
          name="AddForm"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
        >
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
          >
            Создать
          </button>
        </PopupWithForm>
        <PopupWithForm
          name="UpdateAvatarForm"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
        >
          <label className="form__field">
            <input
              type="url"
              className="input input_type_hobby form__input"
              placeholder="Ссылка на новый аватар"
              name="urlAvatar"
              id="avatar-input"
              required
            />
            <span className="form__input-error" id="avatar-input-error"></span>
          </label>
          <button
            type="submit"
            className="btn btn_type_submit form__btn-submit"
            aria-label="создать"
          >
            Сохранить
          </button>
        </PopupWithForm>
        <PopupWithForm
          name="DeleteForm"
          title="Вы уверены?"
          isOpen={isDeleteCardPopupOpen}
        >
          <button
            type="submit"
            className="btn btn_type_submit form__btn-submit"
            aria-label="создать"
          >
            Да
          </button>
        </PopupWithForm>
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
}

export default App;
