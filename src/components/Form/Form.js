import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Form.css';
import logo from '../../images/logo.svg';

function Form({
  title,
  inputs,
  button,
  span,
  isRegister,
  isValid,
  onSubmit,
  formError
  }) {

  const history = useHistory();

  return(
    <section className="form__container">
      <Link to="/" className="form__logo"><img src={logo} alt='Логотип' /></Link>
      <h2 className='form__title'>{title}</h2>
      <form className="form__form" onSubmit={onSubmit} noValidate>
        <div className="form__inputs">{inputs}</div>
        <span className="form__error-message">{formError}</span>
        <button type="submit" className={isValid?("form__button"):
          ("form__button form__button_disabled")}>{button}</button>
      </form>
      <span className="form__span">{span}
        {isRegister ? (
          <button className="form__link" type="button" onClick={() => history.push("/signin")}>Войти</button>
        ): (
          <button className="form__link" type="button" onClick={() => history.push("/signup")}>Регистрация</button>
        )}
      </span>
    </section>
  );
}

export default Form;