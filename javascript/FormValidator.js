class FormValidator {
  constructor(form, option) {
    this._form = form;
    this._inputSelector = option.inputSelector;
    this._submitButtonSelector = option.submitButtonSelector;
    this._inactiveButtonClass = option.inactiveButtonClass;
    this._inputErrorClass = option.inputErrorClass;
    this._errorClass = option.errorClass;
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
  }

  _toggleButtonState() {
    if (_hasInvalidInput()) {
      this._buttonSubmit.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonSubmit.classList.remove(this._inactiveButtonClass);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      _showInputError(inputElement);
    } else {
      _hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
    _toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        _checkInputValidity(inputElement);
        _toggleButtonState();
      });
    });
  }

  enableValidation() {
    _setEventListeners();
  }
}

export { FormValidator };

/*
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

const hideInputError = (formElement, inputElement, optionsForm) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(optionsForm.inputErrorClass);
  errorElement.classList.remove(optionsForm.errorClass);
  errorElement.textContent = '';
};

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

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, optionsForm) => {
  //вызов функции проверки валидности каждого инпута в форме
  //добавляем или удаляем класс взависимости от результата проверки
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(optionsForm.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(optionsForm.inactiveButtonClass);
  }
};

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
  toggleButtonState(inputList, buttonElement, optionsForm);
  //для каждого инпута добавляем проверку
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, optionsForm);
      //вызываем функцию включения\отключения кнопки отправки
      toggleButtonState(inputList, buttonElement, optionsForm);
    });
  });
};

const disableSubmitForm = (evt) => {
  evt.preventDefault();
};
const enableValidation = (optionsForm) => {
  // ищем все формы на странице
  const formList = Array.from(
    document.querySelectorAll(optionsForm.formSelector)
  );
  //каждой форме выключаем стандартое поведение отправки
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', disableSubmitForm);
    //вызываем функцию добавления слушателей к каждой форме
    setEventListeners(formElement, optionsForm);
  });
}; */
