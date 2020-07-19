import React from 'react';
import cn from 'classnames';

function Card({ link, name, likes, isLiked = false, isMyCard }) {
  const btnClasses = cn({
    btn: true,
    ['btn_type_not-like']: !isLiked,
    ['btn_type_like']: isLiked,
    ['element__btn-like']: true,
  });

  return (
    <div className="element">
      <img src={link} alt="" className="element__img" />
      <h2 className="element__title">{name}</h2>
      <span className="element__likes">{likes.length}</span>
      <button
        type="button"
        aria-label="лайкнуть"
        className={btnClasses}
      ></button>
      {isMyCard && (
        <button
          type="button"
          aria-label="удалить"
          className="btn btn_type_trash element__btn-trash"
        ></button>
      )}
    </div>
  );
}

export default Card;
