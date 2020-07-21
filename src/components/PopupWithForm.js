import React from 'react';
import classnames from 'classnames';

function PopupWithForm({ name, title, isOpen, onClose, children }) {
  const popupClasses = classnames({
    popup: true,
    popup_disabled: !isOpen,
  });

  function handleClose(evt) {
    evt.stopPropagation();
    onClose(evt.target);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <section
      className={popupClasses}
      id={`popup${name}`}
      onClick={handleClose} // маленькая унификация
    >
      <div className="popup__container">
        <button
          type="button"
          aria-label="закрыть"
          className="btn btn_type_close popup__btn-close"
          onClick={handleClose}
        ></button>
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
