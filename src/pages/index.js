import './index.css';

/* импортируем необходимые модули */
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
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

//создаем необходимые объекты

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: '71b91625-ec4b-4170-b042-4d00aa6f06b7',
    'Content-Type': 'application/json',
  },
});

const userInfo = new UserInfo({
  selectorUserName: userNameSelector,
  selectorUserHobby: userHobbySelector,
  selectorUserAvatar: userAvatarSelector,
});

const editPopup = new PopupWithForm(popupEditSelector, formSelector, {
  submitForm: ([name, hobby]) => {
    editPopup.statusLoading(true);
    api
      .updateUserInfo({ name: name.value, about: hobby.value })
      .then((data) => {
        userInfo.setUserInfo({ name: data.name, hobby: data.about });
        editPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        editPopup.statusLoading(false);
      });
  },
});

const updateAvatarPopup = new PopupWithForm(
  popupUpdateAvatarSelector,
  formSelector,
  {
    submitForm: ([link]) => {
      updateAvatarPopup.statusLoading(true);
      api
        .updateUserAvatar({ avatar: link.value })
        .then((data) => {
          userInfo.setUserInfo({ src: data.avatar });
          updateAvatarPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          updateAvatarPopup.statusLoading(false);
        });
    },
  }
);

const popupPreview = new PopupWithImage(popupPreviewSelector, formSelector);

const popupDelete = new PopupWithDelete(popupDeleteCardSelector, formSelector, {
  submitForm: ({ deleteCard, idCard }) => {
    api.deleteCard(idCard).catch((err) => console.log(err));
    deleteCard();
    popupDelete.close();
  },
});

const addPopup = new PopupWithForm(popupAddSelector, formSelector, {
  submitForm: ([name, link]) => {
    addPopup.statusLoading(true);
    api
      .postCard({ name: name.value, link: link.value })
      .then((card) => {
        const cardsContainer = new Section(
          {
            items: [card],
            rendered: (item) => {
              const card = new Card({
                data: item,
                cardSelector: '#card',
                myId: api.myId,
                handleCardClick: (cardInfo) => popupPreview.open(cardInfo),
                handlePopupDelete: (dataDelete) => popupDelete.open(dataDelete),
                handleCardLike: (dataLike) => api.likeCard(dataLike),
              });
              const cardElement = card.generateCard();
              cardsContainer.addItem({ element: cardElement });
            },
          },
          '.elements'
        );
        cardsContainer.renderItems();
        addPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        addPopup.statusLoading(false);
      });
  },
});

api
  .getInitialCards()
  .then((cards) => {
    const cardsContainer = new Section(
      {
        items: cards.reverse(),
        rendered: (item) => {
          const card = new Card({
            data: item,
            cardSelector: '#card',
            myId: api.myId,
            handleCardClick: (cardInfo) => popupPreview.open(cardInfo),
            handlePopupDelete: (dataDelete) => popupDelete.open(dataDelete),
            handleCardLike: (dataLike) => api.likeCard(dataLike),
          });
          const cardElement = card.generateCard();
          cardsContainer.addItem({ element: cardElement });
        },
      },
      '.elements'
    );
    cardsContainer.renderItems();
  })
  .catch((err) => console.log(err));

api
  .getUserInfo()
  .then(({ name, about, avatar }) => {
    userInfo.setUserInfo({ name: name, hobby: about, src: avatar });
  })
  .catch((err) => console.log(err));

//Добавляем слушатели событий к необходимым кнопкам на странице
updateButton.addEventListener('click', () => updateAvatarPopup.open());
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
