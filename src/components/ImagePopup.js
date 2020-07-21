import React from 'react';
import classnames from 'classnames';
import ButtonClosePopup from './ui/ButtonClosePopup';

function ImagePopup({ name, link, onClose }) {
  const popupClasses = classnames({
    popup: true,
    popup_disabled: !(name && link),
  });

  return (
    <section className={popupClasses} id="popupCardPreview">
      <div className="popup__container">
        <section className="preview-image popup__preview">
          <ButtonClosePopup
            onClose={onClose}
            optionalClasses="preview-image__btn-close"
          />
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
