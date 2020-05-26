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

const pageContainer = document.querySelector('.page');

const userName = document.querySelector('.profile__user-name');
const userHobby = document.querySelector('.profile__user-hobby');

const elementsContainer = document.querySelector('.elements');
const allPopup = document.querySelectorAll('.popup');

const popupEditForm = document.querySelector('#popupEditForm');
const editForm = document.forms.editForm;
const editFormInputs = Array.from(editForm.querySelectorAll('.form__input'));
const newNameProfile = editForm.elements.name;
const newHobbyProfile = editForm.elements.hobby;
const submitEditForm = editForm.elements.submitForm;

const popupAddForm = document.querySelector('#popupAddForm');
const addForm = document.forms.addForm;
const addFormInputs = Array.from(addForm.querySelectorAll('.form__input'));
const nameNewCard = addForm.elements.namePlace;
const urlNewCard = addForm.elements.urlPic;
const submitAddForm = addForm.elements.submitForm;

const popupCardPreview = document.querySelector('#popupCardPreview');
const titleCardPreview = popupCardPreview.querySelector(
  '.preview-image__title'
);
const imgCardPreview = popupCardPreview.querySelector('.preview-image__img');

const cardTemplate = document.querySelector('#card').content;

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
  Функция сбрасывания input полей формы
*/
const resetInput = (formElement) => {
  formElement.reset();
};

/*
  Отслеживание события нажатия кнопки Escape, если какой-то из popup открыт, закрывает его
*/
const popupEscapeHandler = (evt) => {
  const popupWithDisabled = Array.from(allPopup).find(
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
  Функция лайка карточки
*/
const likeHeart = (elem) => {
  elem.classList.toggle('btn_type_like');
};

/*
  Функция открытия preview картинки по клику на ней
*/
const openPreview = (elem) => {
  const targetCard = elem.closest('.element');
  const titleCard = targetCard.querySelector('.element__title').textContent;
  imgCardPreview.src = elem.src;
  imgCardPreview.alt = elem.alt;
  titleCardPreview.textContent = titleCard;
  togglePopup(popupCardPreview);
};

/*
  Функция удаления карточки
*/
const trashElement = (elem) => {
  elem.closest('.element').remove();
};

/*
  Функция создания карточки
*/
const renderCard = (cardName, cardSub, cardAlt) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__title').textContent = cardName;
  cardElement.querySelector('.element__img').src = cardSub;
  cardElement.querySelector('.element__img').alt =
    cardAlt || 'Изображение новой карточки с произвольным изображением';
  return cardElement;
};

/*
  Функция отрисовки 6 дефолтных карточек
*/
const renderInitialCards = () => {
  initialCards.forEach((item) => {
    elementsContainer.append(renderCard(item.name, item.link, item.altText));
  });
};

/*
  Делегирование событий в контейнере page для управления popup;
*/
pageContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('btn_type_add')) {
    toggleButtonState(addFormInputs, submitAddForm, optionsForm);
    togglePopup(popupAddForm);
    return;
  }
  if (evt.target.classList.contains('btn_type_edit')) {
    downInfo();
    editFormInputs.forEach((inputElement) =>
      hideInputError(editForm, inputElement, optionsForm)
    );
    toggleButtonState(editFormInputs, submitEditForm, optionsForm);
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
  Делегирование событий в контейнере elements
*/
elementsContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__btn-like')) {
    likeHeart(evt.target);
    return;
  }
  if (evt.target.classList.contains('element__img')) {
    openPreview(evt.target);
    return;
  }
  if (evt.target.classList.contains('element__btn-trash')) {
    trashElement(evt.target);
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
  elementsContainer.prepend(renderCard(nameNewCard.value, urlNewCard.value));
  resetInput(addForm);
  togglePopup(popupAddForm);
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
