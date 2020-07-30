import React from 'react';
import logoHeader from '../images/logo.svg';

const Header = () => {
  return (
    <header className="header">
      <img
        src={logoHeader}
        alt="Изображение логотипа социальной сети Mesto Russia"
        className="logo header__logo "
      />
    </header>
  );
};

export default Header;
