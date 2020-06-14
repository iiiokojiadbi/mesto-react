import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, { submitForm }) {
    super(selectorPopup);
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputList = this._popup
      .querySelector('.form')
      .querySelectorAll('.form__input');
  }

  _resetInput() {
    this._inputList.forEach((inputElement) => (inputElement.value = ''));
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popup.querySelector('.form').addEventListener('submit', (evt) => {
      this._submitForm(evt);
    });
  }

  close() {
    super.close();
    this._getInputValues();
    this._resetInput();
  }
}
