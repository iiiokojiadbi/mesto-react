/*
  Создание необходимых элементов для работы кнопок и функций
*/
/* объект с необходимыми классами для работы валидации */
const optionsForm = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn-submit',
  buttonCloseSelector: '.form__btn-close',
  inactiveButtonClass: 'form__btn-submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};

const editButton = document.querySelector('.btn_type_edit');
const addButton = document.querySelector('.btn_type_add');
const updateButton = document.querySelector('.profile__photo');

const allForms = Array.from(document.forms);

const editForm = document.forms.editForm;
const newNameProfile = editForm.elements.name;
const newHobbyProfile = editForm.elements.hobby;

const popupEditSelector = '#popupEditForm';
const popupAddSelector = '#popupAddForm';
const popupPreviewSelector = '#popupCardPreview';
const popupUpdateAvatarSelector = '#popupUpdateAvatar';
const popupDeleteCardSelector = '#popupDeleteForm';
const userNameSelector = '.profile__user-name';
const userHobbySelector = '.profile__user-hobby';
const userAvatarSelector = '.profile__photo';
const formSelector = '.form';

export {
  popupAddSelector,
  popupEditSelector,
  popupPreviewSelector,
  popupUpdateAvatarSelector,
  popupDeleteCardSelector,
  optionsForm,
  editButton,
  addButton,
  updateButton,
  allForms,
  newNameProfile,
  newHobbyProfile,
  userNameSelector,
  userHobbySelector,
  userAvatarSelector,
  formSelector,
};
