/*
  Функция обработчик
  Взависимости от нажатой кнопки, происходит нужное действие
  Использована отмена стандартной формы с переданным в функцию событием
*/
function popupHandler(evt) {
  const popup = document.querySelector('.popup');
  const userName = document.querySelector('.profile__user-name');
  const userHobby = document.querySelector('.profile__user-hobby');
  const newName = document.querySelector('.input_type_name');
  const newHobby = document.querySelector('.input_type_hobby');

  if (this.classList.contains('btn_type_edit')) {
    downInfo(userName, userHobby, newName, newHobby);
    popupStatus(popup);
  }
  if (this.classList.contains('btn_type_close')) {
    popupStatus(popup);
    clearInfo(newName, newHobby);
  }
  if (this.classList.contains('profile-edit__form')) {
    evt.preventDefault();
    saveInfo(userName, userHobby, newName, newHobby);
    popupStatus(popup);
    clearInfo(newName, newHobby);
  }
};

/*
  Функция открытия/закрытия popup
*/
function popupStatus(popup) {
  if (popup.classList.contains('popup_is_disabled')) {
    popup.classList.remove('popup_is_disabled');
    popup.classList.add('popup_is_active');
  } else {
    popup.classList.remove('popup_is_active');
    popup.classList.add('popup_is_disabled');
  }
};

/*
  Функция заполнения input полей из содержимого документа
*/
function downInfo(userName, userHobby, newName, newHobby) {
  newName.value = userName.textContent;
  newHobby.value = userHobby.textContent;
};

/*
  Функция очистки input полей после закрытия popup
*/
function clearInfo(newName, newHobby) {
  newName.value = '';
  newHobby.value = '';
}

/*
  Функция сохранения input полей в содержимое документа
*/
function saveInfo(userName, userHobby, newName, newHobby) {
  userName.textContent = newName.value;
  userHobby.textContent = newHobby.value;
};

/*
  Создание необходимых элементов для работы кнопок
*/
const btnEdit = document.querySelector('.btn_type_edit');
const btnClose = document.querySelector('.btn_type_close');
const formProfileEdit = document.querySelector('.profile-edit__form');

btnEdit.addEventListener('click', popupHandler);
btnClose.addEventListener('click', popupHandler);
formProfileEdit.addEventListener('submit', popupHandler);