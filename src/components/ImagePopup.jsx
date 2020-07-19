import React from 'react';
import classnames from 'classnames';

function ImagePopup({ name, link, onClose }) {
  const popupClasses = classnames({
    popup: true,
    popup_disabled: !(name && link),
  });

  return (
    <section className={popupClasses} id="popupCardPreview">
      <div className="popup__container">
        <section className="preview-image popup__preview">
          <button
            type="button"
            aria-label="закрыть"
            className="btn btn_type_close popup__btn-close preview-image__btn-close"
            onClick={onClose}
          ></button>
          <img
            src={link}
            alt={name}
            className="preview-image__img popup__img"
          />
          <h3 className="preview-image__title popup__title">{name}</h3>
        </section>
      </div>
    </section>
  );
}

export default ImagePopup;
