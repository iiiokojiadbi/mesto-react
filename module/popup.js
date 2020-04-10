/* Экспортируемая по умолчанию функция открытия и закрытия popup
   При закрытии popup, значение input полей затирается. 
*/

export default function () {
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