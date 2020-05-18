/*
Функция показа элемента ошибки
*/
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  optionsForm
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(optionsForm.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(optionsForm.errorClass);
};

/*
Функция скрытия элемента ошибки
*/
const hideInputError = (formElement, inputElement, optionsForm) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(optionsForm.inputErrorClass);
  errorElement.classList.remove(optionsForm.errorClass);
  errorElement.textContent = "";
};

/*
Функция вызова функций показа или скрытия, взависимости от валидности инпута
*/
const checkInputValidity = (formElement, inputElement, optionsForm) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      optionsForm
    );
  } else {
    hideInputError(formElement, inputElement, optionsForm);
  }
};

/*
функция проверки валидности каждого инпута в форме
*/
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

/*
функция включения\отключения кнопки отправки
*/
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  //вызов функции проверки валидности каждого инпута в форме
  //добавляем или удаляем класс взависимости от результата проверки
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

/*
Функция добавления слушателей к форме
*/
const setEventListeners = (formElement, optionsForm) => {
  // ищем все инпуты в форме
  const inputList = Array.from(
    formElement.querySelectorAll(optionsForm.inputSelector)
  );
  //ищем кнопку сабмита в форме
  const buttonElement = formElement.querySelector(
    optionsForm.submitButtonSelector
  );
  //вызываем функцию включения\отключения кнопки отправки
  toggleButtonState(inputList, buttonElement, optionsForm.inactiveButtonClass);
  //для каждого инпута добавляем проверку
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, optionsForm);
      //вызываем функцию включения\отключения кнопки отправки
      toggleButtonState(
        inputList,
        buttonElement,
        optionsForm.inactiveButtonClass
      );
    });
  });
};

/*
Функция отключения стандартного поведения кнопки сабмит в форме
*/
const disableSubmitForm = (evt) => {
  evt.preventDefault();
};
/*
Функция валидации, в которую передаем объект с настройками
*/
const enableValidation = (optionsForm) => {
  // ищем все формы на странице
  const formList = Array.from(
    document.querySelectorAll(optionsForm.formSelector)
  );
  //каждой форме выключаем стандартое поведение отправки
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", disableSubmitForm);
    //вызываем функцию добавления слушателей к каждой форме
    setEventListeners(formElement, optionsForm);
  });
};

/*
Включаем валидацию
*/
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__btn-submit",
  inactiveButtonClass: "form__btn-submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
});
