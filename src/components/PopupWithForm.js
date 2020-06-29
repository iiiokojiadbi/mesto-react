import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, formSelector, { submitForm }) {
    super(selectorPopup);
    this._form = this._popup.querySelector(formSelector);
    this._submitButton = this._form.querySelector('.form__btn-submit');
    this._defaultSubmitButtonText = this._submitButton.textContent;
    this._nonBreakingSpace = '\u00A0';
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__input');
    return this._inputList;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popup.querySelector('.form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  statusLoading(status) {
    if (status) {
      this._submitButton.textContent = 'Сохранение';
      let count = 0;
      this._loadingInterval = setInterval(() => {
        if (count === 3) {
          this._submitButton.textContent = 'Сохранение';
          count = 0;
        }
        this._submitButton.textContent = `${this._nonBreakingSpace}${this._submitButton.textContent}.`;
        count++;
      }, 200);
    } else {
      clearInterval(this._loadingInterval);
      this._submitButton.textContent = this._defaultSubmitButtonText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
