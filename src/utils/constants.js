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
};

const editButton = document.querySelector('.btn_type_edit');
const addButton = document.querySelector('.btn_type_add');

const elementsContainer = document.querySelector('.elements');
const allForms = Array.from(document.forms);

const editForm = document.forms.editForm;
const newNameProfile = editForm.elements.name;
const newHobbyProfile = editForm.elements.hobby;

const addForm = document.forms.addForm;
const nameNewCard = addForm.elements.namePlace;
const urlNewCard = addForm.elements.urlPic;

const popupEditSelector = '#popupEditForm';
const popupAddSelector = '#popupAddForm';
const popupPreviewSelector = '#popupCardPreview';
const userNameSelector = '.profile__user-name';
const userHobbySelector = '.profile__user-hobby';
const formSelector = '.form';

export {
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
};
