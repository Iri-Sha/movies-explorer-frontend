import React from 'react';
import './Login.css';
import Form from '../Form/Form';
import useFormWithValidation from '../../hooks/useValidationForm';

function Login({handleLoginSubmit, formError, isActiveForUpdate}) {

    const {
        values, handleChange, errors, isValid, resetForm,
      } = useFormWithValidation();

    function handleSubmit(e){
        e.preventDefault();
        handleLoginSubmit(values.email, values.password);
        resetForm();
    }

    return (
        <Form
            title={"Рады видеть!"}
            inputs={
                <div className="login__inputs">
                    <label className="login__label">E-mail</label>
                    <input
                        className="login__input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        minLength="2"
                        maxLength="254"
                        required
                        value={values.email || ''}
                        onChange={handleChange}
                        disabled={!isActiveForUpdate}
                    />
                    <span className="login__input-error">{errors.email}</span>
                    <label className="login__label">Пароль</label>
                    <input
                        className="login__input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Пароль"
                        minLength="8"
                        required
                        value={values.password || ''}
                        onChange={handleChange}
                        disabled={!isActiveForUpdate}
                    />
                    <span className="login__input-error">{errors.password}</span>
                </div>
            }
            button={"Войти"}
            span={"Ещё не зарегистрированы?"}
            isRegister={false}
            isValid={isValid}
            onSubmit = {handleSubmit}
            formError={formError}
        />
    );
};
  
export default Login;