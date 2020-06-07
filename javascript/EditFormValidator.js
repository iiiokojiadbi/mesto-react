import { togglePopup } from './utils.js';
import { FormValidator } from './FormValidator.js';

// изменяем поведение стандартного класса валидации
// форма edit на странице ведет себя иначе
// при закрытии формы отображение ошибок инпута должны быть скрыты
// кнопка сабмита при открытии попапа с формой должна быть активна
class EditFormValidator extends FormValidator {
  constructor(form, option) {
    super(form, option);
    this._popupSelector = option.popupSelector;
    this._popup = this._form.closest(this._popupSelector);
  }
  // переопределяем стандартный метод для управления поведением сабмита при отправке формы
  _toggleButtonState(state = true) {
    if (state && this._hasInvalidInput()) {
      this._buttonSubmit.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonSubmit.classList.remove(this._inactiveButtonClass);
    }
  }
  // метод скрытия ошибок инпута при закрытии формы
  // кнопка теперь активна при открытии формы edit
  _closeForm() {
    togglePopup(this._popup);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._toggleButtonState(false);
    });
  }
  // расширяем метод объявления слушателей
  _setEventListeners() {
    this._buttonClose.addEventListener('click', () => this._closeForm());
    window.addEventListener('keydown', (evt) =>
      evt.key === 'Escape' && !this._popup.classList.contains('popup_disabled')
        ? this._closeForm()
        : null
    );
    super._setEventListeners();
  }
}

export { EditFormValidator };
