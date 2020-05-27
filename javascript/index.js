/* импортируем необходимые модули */
import { Card } from './Card.js';
import { FormValidator, EditFormValidator } from './FormValidator.js';

/*
  Создание необходимых элементов для работы кнопок и функций
*/
const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    altText: 'Изображение горного района Архыз',
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    altText: 'Изображение природы в Челябинской области',
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    altText:
      'Изображение одной из улиц города Иваново, также известного как &laquo;Город невест&raquo;',
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    altText: 'Изображение природы в Камчатки',
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    altText: 'Изображение железнодорожных путей в Холмогорском районе',
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    altText: 'Изображение природы Байкала',
  },
];

/* объект с необходимыми классами для работы валидации */
const optionsForm = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn-submit',
  buttonCloseSelector: '.form__btn-close',
  inactiveButtonClass: 'form__btn-submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  popupSelector: '.popup',
};

const pageContainer = document.querySelector('.page');

const userName = document.querySelector('.profile__user-name');
const userHobby = document.querySelector('.profile__user-hobby');

const elementsContainer = document.querySelector('.elements');
const allPopup = Array.from(document.querySelectorAll('.popup'));

const popupEditForm = document.querySelector('#popupEditForm');
const editForm = document.forms.editForm;
const newNameProfile = editForm.elements.name;
const newHobbyProfile = editForm.elements.hobby;

const popupAddForm = document.querySelector('#popupAddForm');
const addForm = document.forms.addForm;
const nameNewCard = addForm.elements.namePlace;
const urlNewCard = addForm.elements.urlPic;

/*
  Функция заполнения input полей формы Edit из содержимого документа
*/
const downInfo = () => {
  newNameProfile.value = userName.textContent;
  newHobbyProfile.value = userHobby.textContent;
};

/*
  Функция сохранения input полей формы Edit в содержимое документа
*/
const saveInfo = (newName, newHobby) => {
  userName.textContent = newName;
  userHobby.textContent = newHobby;
};

/*
  Отслеживание события нажатия кнопки Escape, если какой-то из popup открыт, закрывает его
*/
const popupEscapeHandler = (evt) => {
  const popupWithDisabled = allPopup.find(
    (popupElement) => !popupElement.classList.contains('popup_disabled')
  );
  if (popupWithDisabled && evt.key === 'Escape') {
    togglePopup(popupWithDisabled);
  }
};

/*
  Функция открытия/закрытия popup с добавлением/удалением слушателя нажатия кнопки Escape.
*/
const togglePopup = (elem) => {
  elem.classList.toggle('popup_disabled');
  if (!elem.classList.contains('popup_disabled')) {
    window.addEventListener('keydown', popupEscapeHandler);
  } else {
    window.removeEventListener('keydown', popupEscapeHandler);
  }
};

/*
  Делегирование событий в контейнере page для управления popup;
*/
pageContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('btn_type_add')) {
    togglePopup(popupAddForm);
    return;
  }
  if (evt.target.classList.contains('btn_type_edit')) {
    downInfo();
    togglePopup(popupEditForm);
    return;
  }
  if (evt.target.classList.contains('popup__btn-close')) {
    togglePopup(evt.target.closest('.popup'));
    return;
  }
  if (evt.target.classList.contains('popup')) {
    togglePopup(evt.target);
    return;
  }
});

/*
  Обработчики форм
  Использована отмена стандартной формы с переданным в функцию событием
*/
const editFormSubmitHandler = () => {
  saveInfo(newNameProfile.value, newHobbyProfile.value);
  togglePopup(popupEditForm);
};

const addFormSubmitHandler = () => {
  const newCard = new Card(
    { name: nameNewCard.value, link: urlNewCard.value },
    '#card'
  );
  elementsContainer.prepend(newCard.generateCard());
  togglePopup(popupAddForm);
  nameNewCard.value = '';
  urlNewCard.value = '';
  addForm.reset();
};

/*
  Функция отрисовки 6 дефолтных карточек
*/
const renderInitialCards = () => {
  initialCards.forEach((item) => {
    const card = new Card(item, '#card');
    elementsContainer.append(card.generateCard());
  });
};

/* функция активации валидации для форм */
const activateFormValidation = () => {
  const addFormValidation = new FormValidator(addForm, optionsForm);
  const editFormValidation = new EditFormValidator(editForm, optionsForm);
  addFormValidation.enableValidation();
  editFormValidation.enableValidation();
};

/*
  Добавляем слушатели событий к необходимым кнопкам на странице
*/
editForm.addEventListener('submit', editFormSubmitHandler);
addForm.addEventListener('submit', addFormSubmitHandler);

/*
  Рисуем 6 дефолтных карточек
*/
renderInitialCards();

/* Включаем валидацию всех форм */
activateFormValidation();

export { togglePopup };
