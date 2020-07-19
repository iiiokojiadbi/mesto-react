import React from 'react';
import classnames from 'classnames';

function PopupWithForm({ name, title, isOpen, onClose, children }) {
  const popupClasses = classnames({
    popup: true,
    popup_disabled: !isOpen,
  });

  return (
    <section className={popupClasses} id={`popup${name}`}>
      <div className="popup__container">
        <button
          type="button"
          aria-label="закрыть"
          className="btn btn_type_close popup__btn-close form__btn-close"
          onClick={onClose}
        ></button>
        <h3 className="form__title">{title}</h3>
        <form name={name} method="post" action="#" className="form popup__form">
          {children}
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
