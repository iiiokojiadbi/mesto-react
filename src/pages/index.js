/* импортируем необходимые модули */
import { FormValidator } from '../components/FormValidator.js';
import {
  initialCards,
  popupAddSelector,
  popupEditSelector,
  popupPreviewSelector,
} from '../utils/constants.js';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

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

const editButton = document.querySelector('.btn_type_edit');
const addButton = document.querySelector('.btn_type_add');

const userName = document.querySelector('.profile__user-name');
const userHobby = document.querySelector('.profile__user-hobby');

const elementsContainer = document.querySelector('.elements');
const allForms = Array.from(document.forms);

const editForm = document.forms.editForm;
const newNameProfile = editForm.elements.name;
const newHobbyProfile = editForm.elements.hobby;

const addForm = document.forms.addForm;
const nameNewCard = addForm.elements.namePlace;
const urlNewCard = addForm.elements.urlPic;

//////////////////////////////////
const addPopup = new PopupWithForm(popupAddSelector);
const editPopup = new PopupWithForm(popupEditSelector);
const popupPreview = new PopupWithImage(popupPreviewSelector);
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
  Обработчики форм
  Использована отмена стандартной формы с переданным в функцию событием
*/
const editFormSubmitHandler = () => {
  saveInfo(newNameProfile.value, newHobbyProfile.value);
  editPopup.close();
};

const addFormSubmitHandler = () => {
  const newCard = new Card(
    { name: nameNewCard.value, link: urlNewCard.value },
    '#card',
    popupPreview.open.bind(popupPreview)
  );
  elementsContainer.prepend(newCard.generateCard());
  nameNewCard.value = '';
  urlNewCard.value = '';
  addForm.reset();
  addPopup.close();
};

//функция активации валидации для форм
const activateFormValidation = (forms) => {
  forms.forEach((form) => {
    const enableFormValidation = new FormValidator(form, optionsForm);
    enableFormValidation.enableValidation();
  });
};

////////////////////////////////////////////////////
const cardsContainer = new Section(
  {
    items: initialCards,
    rendered: (item) => {
      const card = new Card(
        item,
        '#card',
        popupPreview.open.bind(popupPreview)
      );
      const cardElement = card.generateCard();
      cardsContainer.addItem(cardElement);
    },
  },
  '.elements'
);

cardsContainer.renderItems();
////////////////////////////////////////////////////

//Добавляем слушатели событий к необходимым кнопкам на странице
editButton.addEventListener('click', () => editPopup.open());
addButton.addEventListener('click', () => addPopup.open());
editForm.addEventListener('submit', editFormSubmitHandler);
addForm.addEventListener('submit', addFormSubmitHandler);

//Включаем валидацию всех форм
activateFormValidation(allForms);
