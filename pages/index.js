/*
  Функция открытия и закрытия popup.
  При закрытии popup, значение input полей затирается. 
*/

function popup() {
  const popup = document.querySelector('.popup');
  const newName = document.querySelector('.profile-edit__name');
  const newHobby = document.querySelector('.profile-edit__hobby');

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
  const userName = document.querySelector('.profile__user-name');
  const userHobby = document.querySelector('.profile__user-hobby');
  const newName = document.querySelector('.profile-edit__name');
  const newHobby = document.querySelector('.profile-edit__hobby');

  newName.value = userName.textContent;
  newHobby.value = userHobby.textContent;
};

/*
  Функция сохранения input полей в содержимое документа.
*/

function saveInfo() {
  const userName = document.querySelector('.profile__user-name');
  const userHobby = document.querySelector('.profile__user-hobby');
  const newName = document.querySelector('.profile-edit__name');
  const newHobby = document.querySelector('.profile-edit__hobby');

  userName.textContent = newName.value;
  userHobby.textContent = newHobby.value;
};

/*
  Создана коллекция элементов btn, где через цикл прохода каждому элементу
  колекции присвоин обработчик событий по клику.
*/

const btn = document.querySelectorAll('.btn');

btn.forEach.call(btn, function (element) {
  element.addEventListener('click', function () {
    if (this.classList.contains('btn_type_edit')) {
      openInfo();
      popup();
    }
    if (this.classList.contains('btn_type_close')) {
      popup();
    }
    if (this.classList.contains('btn_type_save')) {
      saveInfo();
      popup();
    }
  });
});