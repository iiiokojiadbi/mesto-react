import React from 'react';
import classnames from 'classnames';

const ButtonClosePopup = ({ onClose, optionalClasses }) => {
  const btnClasses = classnames({
    btn: true,
    btn_type_close: true,
    'popup__btn-close': true,
    [`${optionalClasses}`]: optionalClasses,
  });

  return (
    <button
      type="button"
      aria-label="закрыть"
      className={btnClasses}
      onClick={onClose}
    ></button>
  );
};

export default ButtonClosePopup;
