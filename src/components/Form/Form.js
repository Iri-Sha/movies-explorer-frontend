import React from 'react';
import { Link } from 'react-router-dom';
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
                <Link to="/signin" className="form__link">Войти</Link>
            ):
                (<Link to="/signup"  className="form__link">Регистрация</Link>)}
        </span>
    </section>
  );
}

export default Form;