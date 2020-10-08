import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setMessage("");
  };

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email || !password) {
      setMessage("Необходимо заполнить оба поля");
      return;
    }
    onRegister(email, password);
    resetForm();
  }

  return (
    <div className="auth">
      <form
        name="auth__signin"
        onSubmit={handleSubmit}
        method="POST"
        className="auth__form"
        noValidate
      >
        <h2 className="auth__title">Регистрация</h2>
        <fieldset className="auth__form-info">
          <input
            id="email-input"
            type="email"
            value={email || ""}
            onChange={handleChangeEmail}
            name="email"
            minLength="2"
            maxLength="40"
            required
            placeholder="Email"
            className="auth__form-input"
          />
          <input
            id="password-input"
            type="password"
            value={password || ""}
            onChange={handleChangePassword}
            name="password"
            minLength="6"
            maxLength="25"
            required
            placeholder="Пароль"
            className="auth__form-input"
          />
        </fieldset>
        <p className="auth__paragraph">{message}</p>
        <button type="submit" className="auth__button">
          Зарегестрироваться
        </button>
      </form>
      <div className="auth__next-step">
        <p className="auth__paragraph">Уже заренгестрированы?</p>
        <Link to="/signin" className="auth__link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
