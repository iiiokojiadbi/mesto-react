// импортируем необходимые функции для работы класса
import { togglePopup } from '../pages/index.js';

// создаем необходимые элементы для работы методов в классе
const popupCardPreview = document.querySelector('#popupCardPreview');
const titleCardPreview = popupCardPreview.querySelector(
  '.preview-image__title'
);
const imgCardPreview = popupCardPreview.querySelector('.preview-image__img');

// Класс карточки
class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._altText =
      data.altText || 'Изображение новой карточки с произвольным изображением';
    this._link = data.link;
  }
  // метод получения шаблона карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }
  // метод лайка карточки
  _likeCard() {
    this._element
      .querySelector('.element__btn-like')
      .classList.toggle('btn_type_like');
  }
  // метод удаления карточки
  _trashElement() {
    this._element.closest('.element').remove();
    this._element = null;
  }
  // метод открытия превью карточки
  _openPreview() {
    titleCardPreview.textContent = this._name;
    imgCardPreview.src = this._link;
    imgCardPreview.alt = this._altText;
    togglePopup(popupCardPreview);
  }
  // метод добавления событий карточки
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
  // метод создания карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._altText;
    return this._element;
  }
}

export { Card };
