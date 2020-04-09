export default function () {
  const popup = document.querySelector('.popup');

  if (popup.classList.contains('popup_is_disabled')) {
    popup.classList.remove('popup_is_disabled');
    popup.classList.add('popup_is_active');
  } else {
    popup.classList.remove('popup_is_active');
    popup.classList.add('popup_is_disabled');
  }
}