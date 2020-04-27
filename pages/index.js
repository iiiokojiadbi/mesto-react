/*
  Создание необходимых элементов для работы кнопок и функций
*/
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    altText: 'Изображение горного района Архыз'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    altText: 'Изображение природы в Челябинской области'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    altText: 'Изображение одной из улиц города Иваново, также известного как &laquo;Город невест&raquo;'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    altText: 'Изображение природы в Камчатки'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    altText: 'Изображение железнодорожных путей в Холмогорском районе'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    altText: 'Изображение природы Байкала'
  }
];

const btnEdit = document.querySelector('.btn_type_edit');
const btnAdd = document.querySelector('.btn_type_add');
const btnClose = document.querySelectorAll('.btn_type_close');

const userName = document.querySelector('.profile__user-name');
const userHobby = document.querySelector('.profile__user-hobby');

const elementsContainer = document.querySelector('.elements');

const popupEditForm = document.querySelector('#popupEditForm');
const newNameProfile = popupEditForm.querySelector('.form__name');
const newSubProfile = popupEditForm.querySelector('.form__sub');
const submitEditForm = popupEditForm.querySelector('.form');

const popupAddForm = document.querySelector('#popupAddForm');
const nameNewCard = popupAddForm.querySelector('.form__name');
const subNewCard = popupAddForm.querySelector('.form__sub');
const submitAddForm = popupAddForm.querySelector('.form');

const popupCardPreview = document.querySelector('#popupCardPreview');
const titleCardPreview = popupCardPreview.querySelector('.preview-image__title');
const imgCardPreview = popupCardPreview.querySelector('.preview-image__img');

const cardTemplate = document.querySelector('#card').content;

/*
  Функция заполнения input полей из содержимого документа
*/
const downInfo = () => {
  newNameProfile.value = userName.textContent;
  newSubProfile.value = userHobby.textContent;
};

/*
  Функция сохранения input полей в содержимое документа
*/
const saveInfo = (newName, newSub) => {
  userName.textContent = newName;
  userHobby.textContent = newSub;
};

/*
  Функция открытия popup
*/
const openPopup = (elem) => {
  if (elem.id === 'popupEditForm') {
    downInfo();
  }
  if (elem.id === 'popupAddForm') {
    nameNewCard.value = '';
    subNewCard.value = '';
  }
  elem.classList.remove('popup_is_disabled');
  elem.classList.add('popup_is_active');
};

/*
  Функция поиска родителя по передаваему дочернему элементу и классу родителя дочернего элемента
*/
const findAncestor = (elem, cls) => {
  while ((elem = elem.parentElement) && !elem.classList.contains(cls));
  return elem;
}

/*
  Функция закрытия popup
*/
const closePopup = (evt) => {
  const elem = findAncestor(evt.target, 'popup');
  elem.classList.add('popup_is_disabled');
  elem.classList.remove('popup_is_active');
};

/*
  Функция лайка карточки
*/
const likeHeart = (evt) => {
  evt.target.classList.toggle('btn_type_like');
}

/*
  Функция удаления карточки
*/
const trashElement = (evt) => {
  const classParent = findAncestor(evt.target, 'element').classList.value;
  evt.target.closest(`.${classParent}`).remove();
};

/*
  Функция открытия preview картинки по клику на ней
*/
const openPreview = (evt) => {
  const targetCard = evt.target;
  const titleCard = findAncestor(targetCard, 'element').querySelector('.element__title').textContent;
  imgCardPreview.src = targetCard.src;
  imgCardPreview.alt = targetCard.alt;
  titleCardPreview.textContent = titleCard;
  openPopup(popupCardPreview);
}

/*
  Функция создания карточки
*/
const renderCard = (cardName, cardSub, cardAlt) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__title').textContent = cardName;
  cardElement.querySelector('.element__img').src = cardSub;
  cardElement.querySelector('.element__img').alt = cardAlt || 'Изображение новой карточки с произвольным изображением';
  cardElement.querySelector('.element__img').addEventListener('click', openPreview);
  cardElement.querySelector('.element__btn-like').addEventListener('click', likeHeart);
  cardElement.querySelector('.element__btn-trash').addEventListener('click', trashElement);
  return cardElement;
};

/*
  Функция отрисовки 6 дефолтных карточек
*/
const renderInitialCards = () => {
  initialCards.forEach((item) => {
    elementsContainer.append(renderCard(item.name, item.link, item.altText));
  });
}

/*
  Обработчик форм
  Использована отмена стандартной формы с переданным в функцию событием
*/
const formSubmitHandler = (evt) => {
  evt.preventDefault();
  if (findAncestor(evt.target, 'popup').id === 'popupEditForm') {
    saveInfo(newNameProfile.value, newSubProfile.value);
  }
  if (findAncestor(evt.target, 'popup').id === 'popupAddForm') {
    elementsContainer.prepend(renderCard(nameNewCard.value, subNewCard.value));
  }
  closePopup(evt);
};

/*
  Добавляем слушатели событий к необходимым кнопкам на странице
*/
btnAdd.addEventListener('click', () => openPopup(popupAddForm));
btnEdit.addEventListener('click', () => openPopup(popupEditForm));
btnClose.forEach((item => item.addEventListener('click', closePopup)));
submitEditForm.addEventListener('submit', formSubmitHandler);
submitAddForm.addEventListener('submit', formSubmitHandler);

/*
  Рисуем 6 дефолтных карточек
*/
renderInitialCards();