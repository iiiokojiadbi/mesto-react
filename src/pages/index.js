import './index.css';

/* импортируем необходимые модули */
import { FormValidator } from '../components/FormValidator.js';
import {
  popupAddSelector,
  popupEditSelector,
  popupPreviewSelector,
  popupUpdateAvatarSelector,
  optionsForm,
  editButton,
  addButton,
  updateButton,
  elementsContainer,
  allForms,
  newNameProfile,
  newHobbyProfile,
  userNameSelector,
  userHobbySelector,
  userAvatarSelector,
  formSelector,
} from '../utils/constants.js';

import { eventOnInput } from '../utils/utils.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js';

//создаем необходимые объекты

const userInfo = new UserInfo({
  selectorUserName: userNameSelector,
  selectorUserHobby: userHobbySelector,
  selectorUserAvatar: userAvatarSelector,
});

const popupPreview = new PopupWithImage(popupPreviewSelector);
const updateAvatarPopup = new PopupWithForm(
  popupUpdateAvatarSelector,
  formSelector,
  {
    submitForm: ([, link]) => {
      console.log(link);
      updateAvatarPopup.close();
    },
  }
);

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

api
  .getInitialCards()
  .then((cards) => {
    const cardsContainer = new Section(
      {
        items: cards,
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
  })
  .catch((err) => console.log(err));

api
  .getUserInfo()
  .then((userData) => {
    const { name, about, avatar } = userData;
    userInfo.setUserInfo({ name: name, hobby: about, src: avatar });
  })
  .catch((err) => console.log(err));

//Добавляем слушатели событий к необходимым кнопкам на странице
updateButton.addEventListener('click', () => updateAvatarPopup.open());
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
