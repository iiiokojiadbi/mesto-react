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
} from '../utils/constants.js';

import { eventOnInput } from '../utils/utils.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const userInfo = new UserInfo({
  selectorUserName: userNameSelector,
  selectorUserHobby: userHobbySelector,
});

const addPopup = new PopupWithForm(popupAddSelector, {
  submitForm: (evt) => {
    evt.preventDefault();
    const newCard = new Card(
      { name: nameNewCard.value, link: urlNewCard.value },
      '#card',
      popupPreview.open.bind(popupPreview)
    );
    elementsContainer.prepend(newCard.generateCard());
    addPopup.close();
  },
});

const editPopup = new PopupWithForm(popupEditSelector, {
  submitForm: (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo({
      name: newNameProfile.value,
      hobby: newHobbyProfile.value,
    });
    editPopup.close();
  },
});

const popupPreview = new PopupWithImage(popupPreviewSelector);

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

//Добавляем слушатели событий к необходимым кнопкам на странице
editButton.addEventListener('click', () => {
  editPopup.open();
  const { name, hobby } = userInfo.getUserInfo();
  newNameProfile.value = name;
  newHobbyProfile.value = hobby;
  eventOnInput([newNameProfile, newHobbyProfile]);
});

addButton.addEventListener('click', () => addPopup.open());

//функция активации валидации для форм
const activateFormValidation = (forms) => {
  forms.forEach((form) => {
    const enableFormValidation = new FormValidator(form, optionsForm);
    enableFormValidation.enableValidation();
  });
};

//Включаем валидацию всех форм
activateFormValidation(allForms);
