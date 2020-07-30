import React, { useContext } from 'react';
import classnames from 'classnames';

import { CurrentUserContext } from './../contexts/CurrentUserContext';

const Card = ({
  name,
  link,
  owner,
  likes,
  _id,
  onCardClick,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const isMyCard = owner._id === currentUser._id;
  const isMyLike = likes.some((owner) => owner._id === currentUser._id);

  const btnClasses = classnames({
    btn: true,
    'btn_type_not-like': true,
    btn_type_like: isMyLike,
    'element__btn-like': true,
  });

  const handleCardClick = () => {
    onCardClick({ name, link });
  };

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
        onClick={() => onCardLike({ likes: likes, cardId: _id })}
      ></button>
      {isMyCard && (
        <button
          type="button"
          aria-label="удалить"
          className="btn btn_type_trash element__btn-trash"
          onClick={() => {
            onCardDelete({ cardId: _id });
          }}
        ></button>
      )}
    </div>
  );
};

export default Card;
