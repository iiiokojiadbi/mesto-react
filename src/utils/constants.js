/*
  Создание необходимых элементов для работы кнопок и функций
*/
/* объект с необходимыми классами для работы валидации */
export const optionsForm = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn-submit',
  buttonCloseSelector: '.form__btn-close',
  inactiveButtonClass: 'form__btn-submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};

export const editButton = document.querySelector('.btn_type_edit');
export const addButton = document.querySelector('.btn_type_add');
export const updateButton = document.querySelector('.profile__photo');

export const allForms = Array.from(document.forms);

export const editForm = document.forms.editForm;
export const newNameProfile = editForm.elements.name;
export const newHobbyProfile = editForm.elements.hobby;

export const popupEditSelector = '#popupEditForm';
export const popupAddSelector = '#popupAddForm';
export const popupPreviewSelector = '#popupCardPreview';
export const popupUpdateAvatarSelector = '#popupUpdateAvatar';
export const popupDeleteCardSelector = '#popupDeleteForm';

export const userNameSelector = '.profile__user-name';
export const userHobbySelector = '.profile__user-hobby';
export const userAvatarSelector = '.profile__photo';

export const formSelector = '.form';
