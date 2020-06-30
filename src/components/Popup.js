export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._closeButton = this._popup.querySelector('.popup__btn-close');
    this._handleEscClose = (evt) => {
      // (づ｡◕‿‿◕｡)づ
      if (evt.key === 'Escape') {
        this.close();
      }
    };
    this._setEventListeners();
  }

  _setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', (evt) =>
      evt.target.classList.contains('popup') ? this.close() : null
    );
  }

  open() {
    this._popup.classList.remove('popup_disabled');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.add('popup_disabled');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
