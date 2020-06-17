import './index.css';

/* импортируем необходимые модули */
import { FormValidator } from '../components/FormValidator.js';
import {
  initialCards,
  popupAddSelector,
  popupEditSelector,
  popupPreviewSelector,
  optionsForm,
  editButton,
  addButton,
  elementsContainer,
  allForms,
  newNameProfile,
  newHobbyProfile,
  nameNewCard,
  urlNewCard,
  userNameSelector,
  userHobbySelector,
  formSelector,
} from '../utils/constants.js';

import { eventOnInput } from '../utils/utils.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//создаем необходимые объекты
const userInfo = new UserInfo({
  selectorUserName: userNameSelector,
  selectorUserHobby: userHobbySelector,
});

const popupPreview = new PopupWithImage(popupPreviewSelector);

const addPopup = new PopupWithForm(popupAddSelector, formSelector, {
  submitForm: ([name, link]) => {
    const newCard = new Card(
      { name, link },
      '#card',
      popupPreview.open.bind(popupPreview)
    );
    elementsContainer.prepend(newCard.generateCard());
    addPopup.close();
  },
});

const editPopup = new PopupWithForm(popupEditSelector, formSelector, {
  submitForm: ([name, hobby]) => {
    userInfo.setUserInfo({ name, hobby });
    editPopup.close();
  },
});

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

//рисуем карточки в контейнере
cardsContainer.renderItems();

//Добавляем слушатели событий к необходимым кнопкам на странице
addButton.addEventListener('click', () => addPopup.open());
editButton.addEventListener('click', () => {
  editPopup.open();
  const { name, hobby } = userInfo.getUserInfo();
  newNameProfile.value = name;
  newHobbyProfile.value = hobby;
  eventOnInput([newNameProfile, newHobbyProfile]);
});

//функция активации валидации для форм
const activateFormValidation = (forms) => {
  forms.forEach((form) => {
    const enableFormValidation = new FormValidator(form, optionsForm);
    enableFormValidation.enableValidation();
  });
};

//Включаем валидацию всех форм
activateFormValidation(allForms);
