import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, formSelector, { submitForm }) {
    super(selectorPopup);
    this._form = this._popup.querySelector(formSelector);
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitForm = submitForm;
  }

  _getInputValues() {
    const [name, hobby] = this._inputList;
    return [name.value, hobby.value];
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popup.querySelector('.form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
