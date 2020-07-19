import React from 'react';

function ImagePopup() {
  return (
    <section className="popup popup_disabled" id="popupCardPreview">
      <div className="popup__container">
        <section className="preview-image popup__preview">
          <button
            type="button"
            aria-label="закрыть"
            className="btn btn_type_close popup__btn-close preview-image__btn-close"
          ></button>
          <img src="#" alt="" className="preview-image__img popup__img" />
          <h3 className="preview-image__title popup__title"></h3>
        </section>
      </div>
    </section>
  );
}

export default ImagePopup;
