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

const formEdit = {
  title: 'Редактировать профиль',
  placeholderName: 'Введите имя',
  placeholderSub: 'Введите хобби',
  btnLabel: 'сохранить',
  btnText: 'Сохранить'
};

const formAdd = {
  title: 'Новое место',
  placeholderName: 'Название',
  placeholderSub: 'Ссылка на картинку',
  btnLabel: 'добавить',
  btnText: 'Добавить'
};

const btn = document.querySelectorAll('.btn');
const popup = document.querySelector('.popup');
const userName = document.querySelector('.profile__user-name');
const userHobby = document.querySelector('.profile__user-hobby');

/*
  Функция заполнения input полей из содержимого документа
*/
const downInfo = () => {
  document.querySelector('.form__name').value = userName.textContent;
  document.querySelector('.form__sub').value = userHobby.textContent;
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
const openPopup = (evt) => {
  if (evt.target.classList.contains('btn_type_edit')) {
    renderFormEdit(formEdit);
    downInfo();
  } else {
    renderFormEdit(formAdd);
  }
  popup.classList.remove('popup_is_disabled');
  popup.classList.add('popup_is_active');
};

/*
  Функция закрытия popup
*/
const closePopup = (evt) => {
  popup.classList.remove('popup_is_active');
  popup.classList.add('popup_is_disabled');
  removeParent(evt);
};

/*
  Функция удаления картинки и формы popup
*/
const removeParent = (evt) => {
  let classParent = Array.from(evt.target.parentElement.classList).filter(item => item === 'form' || item === 'element').shift();
  if (classParent === 'form' || classParent === 'element') {
    evt.target.closest(`.${classParent}`).remove();
  } else {
    classParent = Array.from(Array.from(evt.target.children).find(item => item.classList.contains('btn')).parentElement.classList).filter(item => item === 'form');
    evt.target.closest(`.${classParent}`).remove();
  }
};

/*
  Вешаем на отрисованные кнопки (edit и add) открытие popup
*/
btn.forEach((item) => {
  item.addEventListener('click', openPopup);
});

/*
  Функция создания карточки
  oneCard - значение true - 1 карточка, false - нет
*/
const renderCards = (oneCard, newName, newSub, newAlt = 'Изображение новой карточки с произвольным изображением') => {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardContainer = document.querySelector('.elements');
  cardElement.querySelector('.element__title').textContent = newName;
  cardElement.querySelector('.element__img').src = newSub;
  cardElement.querySelector('.element__img').alt = newAlt;
  cardElement.querySelector('.element__btn-trash').addEventListener('click', removeParent);
  if (!oneCard) {
    cardContainer.append(cardElement);
  } else {
    cardContainer.prepend(cardElement);
  }
};

/*
  Функция создания необходимого popup из template
*/
const renderFormEdit = (arrForms) => {
  const elementsFormTemplate = document.querySelector('#form').content;
  const elementsForm = elementsFormTemplate.cloneNode(true);
  const elementsFormContainer = document.querySelector('.popup__container');
  elementsForm.querySelector('.form').addEventListener('submit', formSubmitHandler);
  elementsForm.querySelector('.form__title').textContent = arrForms.title;
  elementsForm.querySelector('.form__name').placeholder = arrForms.placeholderName;
  elementsForm.querySelector('.form__sub').placeholder = arrForms.placeholderSub;
  elementsForm.querySelector('.form__btn-submit').ariaLabel = arrForms.btnLabel;
  elementsForm.querySelector('.form__btn-submit').textContent = arrForms.btnText;
  elementsForm.querySelector('.form__btn-close').label = 'закрыть';
  elementsForm.querySelector('.form__btn-close').addEventListener('click', closePopup);
  elementsFormContainer.append(elementsForm);
};

/*
  Обработчик формы
  Использована отмена стандартной формы с переданным в функцию событием
*/
const formSubmitHandler = (evt) => {
  evt.preventDefault();

  const newName = document.querySelector('.form__name').value;
  const newSub = document.querySelector('.form__sub').value;

  if (evt.srcElement[3].getAttribute('aria-label') === 'сохранить') {
    saveInfo(newName, newSub);
  } else {
    renderCards(true, newName, newSub);
  }
  closePopup(evt);
};

/*
  Рисуем 6 дефолтных карточек
*/
initialCards.forEach((item) => {
  renderCards(false, item.name, item.link, item.altText);
});