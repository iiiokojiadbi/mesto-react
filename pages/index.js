/*
  Функция заполнения input полей из содержимого документа
*/
function downInfo() {
  newName.value = userName.textContent;
  newHobby.value = userHobby.textContent;
};

/*
  Функция сохранения input полей в содержимое документа
*/
function saveInfo() {
  userName.textContent = newName.value;
  userHobby.textContent = newHobby.value;
};

/*
  Использована отмена стандартной формы с переданным в функцию событием
*/
function formSubmitHandler(evt) {
  evt.preventDefault();
  saveInfo();
  popupStatus();
};

/*
  Функция открытия/закрытия popup.
*/
function popupStatus() {
  if (popup.classList.contains('popup_is_disabled')) {
    downInfo();
    popup.classList.remove('popup_is_disabled');
    popup.classList.add('popup_is_active');
  } else {
    popup.classList.remove('popup_is_active');
    popup.classList.add('popup_is_disabled');
  }
};

/*
  Создание необходимых элементов для работы кнопок и функций
*/
const btnEdit = document.querySelector('.btn_type_edit');
const btnClose = document.querySelector('.btn_type_close');
const formProfileEdit = document.querySelector('.profile-edit__form');
const popup = document.querySelector('.popup');
const userName = document.querySelector('.profile__user-name');
const userHobby = document.querySelector('.profile__user-hobby');
const newName = document.querySelector('.input_type_name');
const newHobby = document.querySelector('.input_type_hobby');

btnEdit.addEventListener('click', popupStatus);
btnClose.addEventListener('click', popupStatus);
formProfileEdit.addEventListener('submit', formSubmitHandler);