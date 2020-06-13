import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupImage = this._popup.querySelector('.popup__img');
    this._popupTitle = this._popup.querySelector('.popup__title');
  }

  open({ name, link }) {
    this._popupImage.src = link;
    this._popupTitle.textContent = name;
    super.open();
  }
}
