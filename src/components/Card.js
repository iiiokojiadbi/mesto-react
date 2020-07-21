import React from 'react';
import classnames from 'classnames';

function Card({ link, name, likes, isLiked = false, isMyCard, onCardClick }) {
  const btnClasses = classnames({
    btn: true,
    ['btn_type_not-like']: !isLiked,
    ['btn_type_like']: isLiked,
    ['element__btn-like']: true,
  });

  function handleCardClick() {
    onCardClick({ name, link }); // действительно ...
  }

  return (
    <div className="element">
      <img
        src={link}
        alt={name}
        className="element__img"
        onClick={handleCardClick}
      />
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
