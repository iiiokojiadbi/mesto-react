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
  allForms,
  newNameProfile,
  newHobbyProfile,
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

const editPopup = new PopupWithForm(popupEditSelector, formSelector, {
  submitForm: ([name, hobby]) => {
    userInfo.setUserInfo({ name, hobby });
    editPopup.close();
  },
});

const addPopup = new PopupWithForm(popupAddSelector, formSelector, {
  submitForm: ([name, link]) => {
    const cardsContainer = new Section(
      {
        items: [{ name, link }],
        rendered: (item) => {
          const card = new Card(
            item,
            '#card',
            popupPreview.open.bind(popupPreview)
          );
          const cardElement = card.generateCard();
          cardsContainer.addItem(cardElement, false);
        },
      },
      '.elements'
    );
    cardsContainer.renderItems();
    addPopup.close();
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
      cardsContainer.addItem(cardElement, true);
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
  const [name, hobby] = userInfo.getUserInfo();
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
