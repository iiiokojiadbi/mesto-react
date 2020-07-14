import React from 'react';
import logoHeader from '../images/logo.svg';

class Header extends React.Component {
  render() {
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
}

export default Header;
