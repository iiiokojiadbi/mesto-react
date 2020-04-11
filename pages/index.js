/*
  Функция открытия и закрытия popup.
  При закрытии popup, значение input полей затирается. 
*/
function popupStatus() {
  if (popup.classList.contains('popup_is_disabled')) {
    popup.classList.remove('popup_is_disabled');
    popup.classList.add('popup_is_active');
  } else {
    popup.classList.remove('popup_is_active');
    popup.classList.add('popup_is_disabled');
    newName.value = '';
    newHobby.value = '';
  }
};

/*
  Функция заполнения input полей из содержимого документа.
*/
function openInfo() {
  newName.value = userName.textContent;
  newHobby.value = userHobby.textContent;
};

/*
  Функция сохранения input полей в содержимое документа.
*/
function saveInfo() {
  event.preventDefault();
  userName.textContent = newName.value;
  userHobby.textContent = newHobby.value;
};

const popup = document.querySelector('.popup');
const btnEdit = document.querySelector('.btn_type_edit');
const btnClose = document.querySelector('.btn_type_close');
const formProfileEdit = document.querySelector('.profile-edit__form');
const userName = document.querySelector('.profile__user-name');
const userHobby = document.querySelector('.profile__user-hobby');
const newName = document.querySelector('.profile-edit__name');
const newHobby = document.querySelector('.profile-edit__hobby');

btnEdit.addEventListener('click', function () {
  openInfo();
  popupStatus();
});

btnClose.addEventListener('click', function () {
  popupStatus();
});

formProfileEdit.addEventListener('submit', function (event) {
  event.preventDefault();
  saveInfo();
  popupStatus();
});