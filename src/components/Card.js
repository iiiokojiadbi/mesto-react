export default class Card {
  constructor({ name, altText, link }, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._name = name;
    this._altText =
      altText || 'Изображение новой карточки с произвольным изображением';
    this._link = link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _likeCard() {
    this._element
      .querySelector('.element__btn-like')
      .classList.toggle('btn_type_like');
  }

  _trashElement() {
    this._element.closest('.element').remove();
    this._element = null;
  }

  _openPreview() {
    this._handleCardClick({ name: this._name, link: this._link });
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__btn-like')
      .addEventListener('click', () => this._likeCard());
    this._element
      .querySelector('.element__btn-trash')
      .addEventListener('click', () => this._trashElement());
    this._element
      .querySelector('.element__img')
      .addEventListener('click', () => this._openPreview());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._altText;
    return this._element;
  }
}
