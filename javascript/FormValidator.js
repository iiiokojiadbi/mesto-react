class FormValidator {
  constructor(form, option) {
    this._form = form;
    this._inputSelector = option.inputSelector;
    this._submitButtonSelector = option.submitButtonSelector;
    this._inactiveButtonClass = option.inactiveButtonClass;
    this._inputErrorClass = option.inputErrorClass;
    this._errorClass = option.errorClass;
    this._buttonCloseSelector = option.buttonCloseSelector;
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
    this._buttonClose = this._form.querySelector(this._buttonCloseSelector);
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
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
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonSubmit.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonSubmit.classList.remove(this._inactiveButtonClass);
    }
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._toggleButtonState();
    });
  }

  _setEventListeners() {
    this._form.addEventListener('submit', (evt) => this._submitForm(evt));
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._toggleButtonState();
    this._setEventListeners();
  }
}

class EditFormValidator extends FormValidator {
  constructor(form, option) {
    super(form, option);
  }

  _toggleButtonState(state = true) {
    if (state && this._hasInvalidInput()) {
      this._buttonSubmit.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonSubmit.classList.remove(this._inactiveButtonClass);
    }
  }

  _closeForm() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._toggleButtonState(false);
    });
  }

  _setEventListeners() {
    this._buttonClose.addEventListener('click', () => this._closeForm());
    super._setEventListeners();
  }
}

export { FormValidator, EditFormValidator };
