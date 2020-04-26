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
  btnLabel: 'создать',
  btnText: 'Создать'
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
  }
  if (evt.target.classList.contains('btn_type_add')) {
    renderFormEdit(formAdd);
  }
  popup.classList.remove('popup_is_disabled');
  popup.classList.remove('popup_anim_fade-out');
  popup.classList.add('popup_is_active');
  popup.classList.add('popup_anim_fade-in');
};

/*
  Функция закрытия popup
*/
const closePopup = (evt) => {
  popup.classList.remove('popup_anim_fade-in');
  popup.classList.add('popup_anim_fade-out');
  setTimeout(() => {
    popup.classList.add('popup_is_disabled');
    popup.classList.remove('popup_is_active');
    removeParent(evt);
  }, 200);
};

/*
  Функция лайка карточки
*/
const likeHeart = (evt) => {
  evt.target.classList.toggle('btn_type_like');
}

/*
  Страшная функция удаления картинки, формы popup, и preview картинки.
  Она страшная, потому что когда в эвенте находится не close кнопка, а форма, работает не так как задумывалась.
  Тут я ищу класс родителя и подставляю его после шаблонной строкой.
  Функция универсальная. 
*/
const removeParent = (evt) => {
  let classParent = Array.from(evt.target.parentElement.classList).find(item => item === 'form' || item === 'element' || item === 'preview-image');
  if (classParent) { // если необходимые классы не найдены, будет undefined, условие не выполнится
    evt.target.closest(`.${classParent}`).remove();
  } else {
    classParent = Array.from(evt.target.classList).find(item => item === 'form');
    evt.target.closest(`.${classParent}`).remove();
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
  elementsForm.querySelector('.form__btn-close').addEventListener('click', closePopup);
  elementsFormContainer.append(elementsForm);
};

/*
  Функция создания preview картинки по клику на ней
  Блок создается из шаблона
*/
const renderPreview = (evt) => {
  const targetParent = evt.target.parentElement;
  const previewTemplate = document.querySelector('#preview').content;
  const previewElement = previewTemplate.cloneNode(true);
  const previewContainer = document.querySelector('.popup__container');
  previewElement.querySelector('.preview-image__img').src = targetParent.querySelector('.element__img').src;
  previewElement.querySelector('.preview-image__img').alt = targetParent.querySelector('.element__img').alt;
  previewElement.querySelector('.preview-image__title').textContent = targetParent.querySelector('.element__title').textContent;
  previewElement.querySelector('.preview-image__btn-close').addEventListener('click', closePopup);
  previewContainer.append(previewElement);
}

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
  cardElement.querySelector('.element__img').addEventListener('click', renderPreview);
  cardElement.querySelector('.element__img').addEventListener('click', openPopup);
  cardElement.querySelector('.element__btn-like').addEventListener('click', likeHeart);
  cardElement.querySelector('.element__btn-trash').addEventListener('click', removeParent);
  if (!oneCard) {
    cardContainer.append(cardElement);
  } else {
    cardContainer.prepend(cardElement);
  }
};

/*
  Обработчик формы
  Использована отмена стандартной формы с переданным в функцию событием
*/
const formSubmitHandler = (evt) => {
  evt.preventDefault();
  const btnSubmit = evt.target.querySelector('.form__btn-submit');
  const newName = document.querySelector('.form__name').value;
  const newSub = document.querySelector('.form__sub').value;

  if (btnSubmit.textContent === 'Сохранить') {
    saveInfo(newName, newSub);
  } else {
    renderCards(true, newName, newSub);
  }
  closePopup(evt);
};

/*
  Вешаем на отрисованные кнопки (edit и add) открытие popup
*/
btn.forEach((item) => {
  item.addEventListener('click', openPopup);
});

/*
  Рисуем 6 дефолтных карточек
*/
initialCards.forEach((item) => {
  renderCards(false, item.name, item.link, item.altText);
});