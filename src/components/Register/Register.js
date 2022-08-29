import React from 'react';
import './Register.css';
import Form from '../Form/Form';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Register({handleRegisterSubmit, formError}) {

    const {
        values, handleChange, errors, isValid, resetForm,
      } = useFormWithValidation();

    function handleSubmit(e){
        e.preventDefault();
        handleRegisterSubmit(values.name, values.email, values.password);
        resetForm();
    }

    return (
        <Form
            title={"Добро пожаловать!"}
            inputs={
                <div className="register__inputs">
                    <label className="register__label">Имя</label>
                    <input
                        className="register__input"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Имя"
                        minLength="2"
                        maxLength="50"
                        required
                        value={values.name || ''}
                        onChange={handleChange}
                    />
                    <span className="register__input-error">{errors.name}</span>
                    <label className="register__label">E-mail</label>
                    <input
                        className="register__input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        minLength="2"
                        maxLength="254"
                        required
                        value={values.email || ''}
                        onChange={handleChange}
                    />
                    <span className="register__input-error">{errors.email}</span>
                    <label className="register__label">Пароль</label>
                    <input
                        className="register__input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Пароль"
                        minLength="8"
                        required
                        value={values.password || ''}
                        onChange={handleChange}
                    />
                    <span className="register__input-error">{errors.password}</span>
                </div>
            }
            button={"Зарегистрироваться"}
            span={"Уже зарегистрированы?"}
            isRegister={true}
            isValid={isValid}
            onSubmit = {handleSubmit}
            formError={formError}
        />
    );
};
  
export default Register;