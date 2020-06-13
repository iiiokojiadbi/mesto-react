export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._closeButton = this._popup.querySelector('.popup__btn-close');
    this._handlerEvent = this._setEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', (evt) =>
      evt.target.classList.contains('popup') ? this.close() : null
    );
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  open() {
    this._popup.classList.remove('popup_disabled');
  }

  close() {
    this._popup.classList.add('popup_disabled');
  }
}
