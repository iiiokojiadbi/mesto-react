const allPopup = Array.from(document.querySelectorAll('.popup'));

/*
  Отслеживание события нажатия кнопки Escape, если какой-то из popup открыт, закрывает его
*/
const popupEscapeHandler = (evt) => {
  const popupWithDisabled = allPopup.find(
    (popupElement) => !popupElement.classList.contains('popup_disabled')
  );
  if (popupWithDisabled && evt.key === 'Escape') {
    togglePopup(popupWithDisabled);
  }
};

/*
  Функция открытия/закрытия popup с добавлением/удалением слушателя нажатия кнопки Escape.
*/
const togglePopup = (elem) => {
  elem.classList.toggle('popup_disabled');
  if (!elem.classList.contains('popup_disabled')) {
    window.addEventListener('keydown', popupEscapeHandler);
  } else {
    window.removeEventListener('keydown', popupEscapeHandler);
  }
};

/*
  Функция отрисовки 6 дефолтных карточек
*/
const renderInitialCards = (
  initialElement,
  elementsContainer,
  selectorTemplateCard,
  classCard
) => {
  initialElement.forEach((item) => {
    const card = new classCard(item, selectorTemplateCard);
    elementsContainer.append(card.generateCard());
  });
};

export { togglePopup, renderInitialCards };
