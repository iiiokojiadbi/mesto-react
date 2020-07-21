import React from 'react';
import classnames from 'classnames';
import ButtonClosePopup from './ui/ButtonClosePopup';

function PopupWithForm({ name, title, isOpen, onClose, children }) {
  const popupClasses = classnames({
    popup: true,
    popup_disabled: !isOpen,
  });

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <section className={popupClasses} id={`popup${name}`}>
      <div className="popup__container">
        <ButtonClosePopup onClose={onClose} />
        <h3 className="popup__title">{title}</h3>
        <form
          name={name}
          method="post"
          action="#"
          className="form popup__form"
          onClick={handleSubmit}
        >
          {children}
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
