import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
  constructor(selectorPopup, formSelector, { submitForm }) {
    super(selectorPopup);
    this._form = this._popup.querySelector(formSelector);
    this._submitForm = submitForm;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popup.querySelector('.form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm({ deleteCard: this._deleteCard, idCard: this._id });
    });
  }

  open(options) {
    super.open();
    this._id = options.id;
    this._deleteCard = options.deleteCard;
  }
}
