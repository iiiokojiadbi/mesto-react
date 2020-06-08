/* импортируем необходимые модули */
import { togglePopup, renderInitialCards } from './utils.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initial-сards.js';

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

const allPopup = Array.from(document.querySelectorAll('.popup'));

const editButton = document.querySelector('.btn_type_edit');
const addButton = document.querySelector('.btn_type_add');
const closeButtons = document.querySelectorAll('.btn_type_close');

const userName = document.querySelector('.profile__user-name');
const userHobby = document.querySelector('.profile__user-hobby');

const elementsContainer = document.querySelector('.elements');
const allForms = Array.from(document.forms);

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

// необходимые функции управления попапом
const closePopup = (evt) => {
  togglePopup(evt.target.closest('.popup'));
};

const openAddPopup = () => {
  togglePopup(popupAddForm);
};

const openEditPopup = () => {
  downInfo();
  togglePopup(popupEditForm);
};

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

/* функция активации валидации для форм */
const activateFormValidation = (forms) => {
  forms.forEach((form) => {
    const enableFormValidation = new FormValidator(form, optionsForm);
    enableFormValidation.enableValidation();
  });
};

/*
  Добавляем слушатели событий к необходимым кнопкам на странице
*/
editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
closeButtons.forEach((button) => button.addEventListener('click', closePopup));
editForm.addEventListener('submit', editFormSubmitHandler);
addForm.addEventListener('submit', addFormSubmitHandler);

allPopup.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) =>
    evt.target.classList.contains('popup') ? togglePopup(popup) : null
  );
});

/*
  Рисуем 6 дефолтных карточек
*/
renderInitialCards(initialCards, elementsContainer, '#card', Card);

/* Включаем валидацию всех форм */
activateFormValidation(allForms);

export { togglePopup };
