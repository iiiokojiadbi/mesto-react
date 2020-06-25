import './index.css';

/* импортируем необходимые модули */
import { FormValidator } from '../components/FormValidator.js';
import {
  popupAddSelector,
  popupEditSelector,
  popupPreviewSelector,
  popupUpdateAvatarSelector,
  popupDeleteCardSelector,
  optionsForm,
  editButton,
  addButton,
  updateButton,
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
import Popup from '../components/Popup.js';
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
const popupDelete = new Popup(popupDeleteCardSelector);
const updateAvatarPopup = new PopupWithForm(
  popupUpdateAvatarSelector,
  formSelector,
  {
    submitForm: ([link]) => {
      api
        .updateUserAvatar({ avatar: link.value })
        .then((data) => {
          userInfo.setUserInfo({ src: data.avatar });
        })
        .catch((err) => console.log(err));
      updateAvatarPopup.close();
    },
  }
);

const addPopup = new PopupWithForm(popupAddSelector, formSelector, {
  submitForm: ([name, link]) => {
    api
      .postCard({ name: name.value, link: link.value })
      .then((data) => {
        console.log(data);

        const cardsContainer = new Section(
          {
            items: [
              {
                name: data.name,
                link: data.link,
                id: data._id,
                likes: data.likes,
              },
            ],
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
      })
      .catch((err) => console.log(err));
  },
});

const editPopup = new PopupWithForm(popupEditSelector, formSelector, {
  submitForm: ([name, hobby]) => {
    api
      .updateUserInfo({ name: name.value, about: hobby.value })
      .then((data) => {
        userInfo.setUserInfo({ name: data.name, hobby: data.about });
      })
      .catch((err) => console.log(err));
    editPopup.close();
  },
});

api.getInitialCards().then((cards) => console.log(cards));

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
            popupPreview.open.bind(popupPreview),
            popupDelete.open.bind(popupDelete)
          );
          const cardElement = card.generateCard();
          cardsContainer.addItem(cardElement, true);
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
