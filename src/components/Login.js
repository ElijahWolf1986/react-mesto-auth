import React from "react";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setMessage("");
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!email || !password) {
      setMessage("Необходимо заполнить оба поля");
      return;
    }
    onLogin(email, password);
    resetForm();
  };

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  return (
    <div className="auth">
      <form
        name="auth-signin"
        onSubmit={handleSubmit}
        method="POST"
        className="auth__form"
        noValidate
      >
        <h2 className="auth__title">Вход</h2>
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
          Войти
        </button>
      </form>
      <div className="auth__next-step">
        <p className="auth__paragraph">Еще не заренгестрированы?</p>
        <Link to="/signup" className="auth__link">
          Регистрация
        </Link>
      </div>
    </div>
  );
};

export default Login;
