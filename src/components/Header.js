import React from "react";
import logo from "../images/header/logo.svg";
import { useLocation, useHistory } from "react-router-dom";

function Header(props) {
  let location = useLocation();
  const history = useHistory(); 
  const signinButton = () => {
    history.push("/signup");
  };
  const signupButton = () => {
    history.push("/signin");
  };

  return (
    <header className="header">
      <img src={logo} alt="логотип_сайта" className="header__logo" />

      <div className="header__user-info">
        <p className="header__auth-paragraph">{props.onEmail}</p>

        <button
          type="button"
          className={`header__button-auth ${
            props.onEmail && "header__button-auth_state_opened"
          }`}
          onClick={props.onSignOut}
        >
          Выйти
        </button>

        <button
          type="button"
          className={`header__button-auth ${
            location.pathname === "/signin" &&
            "header__button-auth_state_opened"
          }`}
          onClick={signinButton}
        >
          Зарегестрироваться
        </button>

        <button
          type="button"
          className={`header__button-auth ${
            location.pathname === "/signup" &&
            "header__button-auth_state_opened"
          }`}
          onClick={signupButton}
        >
          Войти
        </button>
      </div>
    </header>
  );
}

export default Header;
