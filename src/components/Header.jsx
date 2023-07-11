import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип." />
      <div className="header__info">
        {props.userData && <p className="header__info header__info_type_email">{props.userData.data.email}</p>}

        {props.link ? <Link to={props.link} className="header__info header__info_type_auth">{props.linkTitle}</Link> :
          <button className="header__info header__info_type_signout" onClick={props.onExit}>{props.linkTitle}</button>}
      </div>
    </header>
  );
}

export default Header;



