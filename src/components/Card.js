export default class Card {
  constructor(
    {
      name,
      link,
      id = 0,
      altText = 'Изображение новой карточки с произвольным изображением',
      likes = [],
    },
    cardSelector,
    handleCardClick,
    handlePopupDelete
  ) {
    this._cardSelector = cardSelector;
    this._name = name;
    this._link = link;
    this._id = id;
    this._altText = altText;
    this._likes = likes;
    this._handleCardClick = handleCardClick;
    this._handlePopupDelete = handlePopupDelete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _getElements() {
    this._cardLike = this._element.querySelector('.element__btn-like');
    this._cardTrash = this._element.querySelector('.element__btn-trash');
    this._cardImg = this._element.querySelector('.element__img');
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardLikes = this._element.querySelector('.element__likes');
  }

  _likeCard() {
    if (!this._cardLike.classList.contains('btn_type_like')) {
      this._cardLike.classList.add('btn_type_like');
      this._cardLikes.textContent = Number(this._cardLikes.textContent) + 1;
    } else {
      this._cardLike.classList.remove('btn_type_like');
      this._cardLikes.textContent = Number(this._cardLikes.textContent) - 1;
    }
  }

  _trashElement() {
    this._handlePopupDelete();
    this._element.closest('.element').remove();
    this._element = null;
  }

  _openPreview() {
    this._handleCardClick({ name: this._name, link: this._link });
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => this._likeCard());
    this._cardTrash.addEventListener('click', () => this._trashElement());
    this._cardImg.addEventListener('click', () => this._openPreview());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._getElements();
    this._setEventListeners();
    this._element.id = this._id;
    this._cardTitle.textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._altText;
    this._cardLikes.textContent = this._likes.length;
    return this._element;
  }
}
