/*
  Надеюсь этот коммент не зарубит сдачу проектной работы.
  
  То что код стал чище, заметил, еще ко 2ой сдаче. И в целом проще стало.
  К первой итерации, мне казалось наполнять содержимое popup по необходимости
  прикольной идеей, ну а так как я мог, то сделал ¯\_(ツ)_/¯

  Улучшать работу, реализовывая "можно лучше" не стал.
  Исправлю этот момент к следующему спринту:
  1) не знаю, почему не использовал список, хотя это было так очевидно, что даже стыдно теперь;
  2) этот момент пока не буду трогать, просто потому что, на следующем спринте
     мой поток будет проходить работу с формами и валидацию их же.
     Думаю, там будет более яснее, каким образом это сделать лучше.
*/

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

const userName = document.querySelector('.profile__user-name');
const userHobby = document.querySelector('.profile__user-hobby');

const elementsContainer = document.querySelector('.elements');

const popupEditForm = document.querySelector('#popupEditForm');
const newNameProfile = popupEditForm.querySelector('.form__name');
const newSubProfile = popupEditForm.querySelector('.form__sub');
const submitEditForm = popupEditForm.querySelector('.form');
const btnCloseEdit = popupEditForm.querySelector('.popup__btn-close');

const popupAddForm = document.querySelector('#popupAddForm');
const nameNewCard = popupAddForm.querySelector('.form__name');
const subNewCard = popupAddForm.querySelector('.form__sub');
const submitAddForm = popupAddForm.querySelector('.form');
const btnCloseAdd = popupAddForm.querySelector('.popup__btn-close');

const popupCardPreview = document.querySelector('#popupCardPreview');
const titleCardPreview = popupCardPreview.querySelector('.preview-image__title');
const imgCardPreview = popupCardPreview.querySelector('.preview-image__img');
const btnClosePreview = popupCardPreview.querySelector('.popup__btn-close');


const cardTemplate = document.querySelector('#card').content;

/*
  Функция заполнения input полей формы Edit из содержимого документа
*/
const downInfo = () => {
  newNameProfile.value = userName.textContent;
  newSubProfile.value = userHobby.textContent;
};

/*
  Функция сохранения input полей формы Edit в содержимое документа
*/
const saveInfo = (newName, newSub) => {
  userName.textContent = newName;
  userHobby.textContent = newSub;
};

/*
  Функция сбрасывания input полей формы Add
*/
const resetInputAdd = () => {
  nameNewCard.value = '';
  subNewCard.value = '';
};

/*
  Функция открытия/закрытия popup
*/
const togglePopup = (elem) => {
  elem.classList.toggle('popup_disabled');
};

/*
  Функция лайка карточки
*/
const likeHeart = (evt) => {
  evt.target.classList.toggle('btn_type_like');
};

/*
  Функция открытия preview картинки по клику на ней
*/
const openPreview = (evt) => {
  const targetCard = evt.target.closest('.element');
  const titleCard = targetCard.querySelector('.element__title').textContent;
  imgCardPreview.src = evt.target.src;
  imgCardPreview.alt = evt.target.alt;
  titleCardPreview.textContent = titleCard;
  togglePopup(popupCardPreview);
};

/*
  Функция удаления карточки
*/
const trashElement = (evt) => {
  const targetCard = evt.target.closest('.element');
  targetCard.querySelector('.element__img').removeEventListener('click', openPreview);
  targetCard.querySelector('.element__btn-like').removeEventListener('click', likeHeart);
  targetCard.querySelector('.element__btn-trash').removeEventListener('click', trashElement);
  targetCard.remove();
};

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
};

/*
  Обработчики форм
  Использована отмена стандартной формы с переданным в функцию событием
*/
const editFormSubmitHandler = (evt) => {
  evt.preventDefault();
  saveInfo(newNameProfile.value, newSubProfile.value);
  togglePopup(popupEditForm);
};

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  elementsContainer.prepend(renderCard(nameNewCard.value, subNewCard.value));
  resetInputAdd();
  togglePopup(popupAddForm);
};

/*
  Добавляем слушатели событий к необходимым кнопкам на странице
*/
btnAdd.addEventListener('click', downInfo);
btnAdd.addEventListener('click', () => togglePopup(popupAddForm));
btnEdit.addEventListener('click', () => togglePopup(popupEditForm));
btnCloseEdit.addEventListener('click', () => togglePopup(popupEditForm));
btnCloseAdd.addEventListener('click', () => togglePopup(popupAddForm));
btnClosePreview.addEventListener('click', () => togglePopup(popupCardPreview));
submitEditForm.addEventListener('submit', editFormSubmitHandler);
submitAddForm.addEventListener('submit', addFormSubmitHandler);

/*
  Рисуем 6 дефолтных карточек
*/
renderInitialCards();