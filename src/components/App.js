import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

    /*
      Стандартная отправка формы теперь отменена.

      Надеюсь, что это единственная проблема мешающая проверке.
      Но на сами ошибки я сильно расчитываю! Учусь на ошибках! (Ну и не только)
      
    */

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  // const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = React.useState(
  //   false
  // );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // function handleDeletePlaceClick() {
  //   setIsDeletePlacePopupOpen(true);
  // }

  function handleCardClick(infoCard) {
    setSelectedCard(infoCard);
  }

  function handleCloseAllPopups(target) {
    const isNeedClose =
      target.classList.contains('popup') ||
      target.classList.contains('btn_type_close');
    // target.classList.contains('btn_type_submit');

    if (isNeedClose) {
      setIsEditProfilePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      // setIsDeletePlacePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setSelectedCard(null);
    }
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <ImagePopup {...selectedCard} onClose={handleCloseAllPopups} />
      <PopupWithForm
        name="EditForm"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={handleCloseAllPopups}
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
          <span className="form__input-error" id="user-name-input-error"></span>
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
        onClose={handleCloseAllPopups}
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
        onClose={handleCloseAllPopups}
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
        // isOpen={isDeletePlacePopupOpen}
        onClose={handleCloseAllPopups}
      >
        <button
          type="submit"
          className="btn btn_type_submit form__btn-submit"
          aria-label="создать"
        >
          Да
        </button>
      </PopupWithForm>
    </div>
  );
}

export default App;
