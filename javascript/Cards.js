/* Класс карточки */
class Card {
  constructor(cardSelector) {
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }
}

/* Новый класс обычной карточки */
class DefaultCard extends Card {
  constructor(data, cardSelector) {
    super(cardSelector);
    this._name = data.name;
    this._altText =
      data.altText || 'Изображение новой карточки с произвольным изображением';
    this._link = data.link;
  }

  generateCard() {
    this._element = super._getTemplate();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._altText;

    return this._element;
  }
}

export { DefaultCard };
