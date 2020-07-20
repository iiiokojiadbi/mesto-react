import React from 'react';
import logoHeader from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img
        src={logoHeader}
        alt="Изображение логотипа социальной сети Mesto Russia"
        className="header__logo logo"
      />
    </header>
  );
}

export default Header;