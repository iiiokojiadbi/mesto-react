import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import ButtonSubmit from './ui/ButtonSubmit';

/*
    const isNeedClose = Проверка классов в этой ситуации - не лучшее решение.
    Лучше установите обработчики события закрытия только там, 
    где они должны срабатывать, а не на родителях - повысит логичность кода и производительность"

    Если убрать проверку по классу, то приходится убрать закрытие попапа по клику по оверлею,
    иначе любой клик по куда угодно закрывает попап.
    Пытался найти "stopPropagation" наоборот, но как-то не задалось. 
*/

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
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

  function handleCardClick(infoCard) {
    setSelectedCard(infoCard);
  }

  function handleCloseAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
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
        <ButtonSubmit text="Сохранить" label="сохранить" />
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
        <ButtonSubmit text="Создать" label="создать" />
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
        <ButtonSubmit text="Сохранить" label="сохранить" />
      </PopupWithForm>
      <PopupWithForm
        name="DeleteForm"
        title="Вы уверены?"
        onClose={handleCloseAllPopups}
      >
        <ButtonSubmit text="Да" label="подтвердить" />
      </PopupWithForm>
    </div>
  );
}

export default App;
