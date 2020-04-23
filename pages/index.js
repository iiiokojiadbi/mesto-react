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

const btn = document.querySelectorAll('.btn');
const formProfileEdit = document.querySelector('.profile-edit__form');
const popup = document.querySelector('.popup');
const userName = document.querySelector('.profile__user-name');
const userHobby = document.querySelector('.profile__user-hobby');
const newName = document.querySelector('.input_type_name');
const newHobby = document.querySelector('.input_type_hobby');

/*
  Функция заполнения input полей из содержимого документа
*/
const downInfo = () => {
  newName.value = userName.textContent;
  newHobby.value = userHobby.textContent;
};

/*
  Функция сохранения input полей в содержимое документа
*/
const saveInfo = () => {
  userName.textContent = newName.value;
  userHobby.textContent = newHobby.value;
};

/*
  Использована отмена стандартной формы с переданным в функцию событием
*/
const formSubmitHandler = evt => {
  evt.preventDefault();
  saveInfo();
  popupStatus();
};

/*
  Функция открытия/закрытия popup.
*/
const popupStatus = (evt) => {
  if (popup.classList.contains('popup_is_disabled')) {
    downInfo();
    popup.classList.remove('popup_is_disabled');
    popup.classList.add('popup_is_active');
  } else {
    popup.classList.add('popup_is_disabled');
    popup.classList.remove('popup_is_active');
  }
};

const removeCard = (evt) => evt.target.closest(`.${evt.target.parentElement.classList.value}`).remove();

const renderCards = (arrCards) => {
  arrCards.forEach((item) => {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.cloneNode(true);
    const cardContainer = document.querySelector('.elements');
    cardElement.querySelector('.element__title').textContent = item.name;
    cardElement.querySelector('.element__img').src = item.link;
    cardElement.querySelector('.element__img').alt = item.altText;
    cardElement.querySelector('.btn_type_trash').addEventListener('click', removeCard);
    cardContainer.append(cardElement);
  });
}

/*
  Создание необходимых элементов для работы кнопок и функций
*/
renderCards(initialCards);
btn.forEach((item) => {
  if (item.classList.contains('btn_type_edit') || item.classList.contains('btn_type_close')) {
    item.addEventListener('click', popupStatus);
  };
});
formProfileEdit.addEventListener('submit', formSubmitHandler);