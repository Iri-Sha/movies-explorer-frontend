import React from 'react';
import './Register.css';
import Form from '../Form/Form';

function Register() {

    const name = "Виталий";
    const email = "pochta@yandex.ru";
    const password = "password";

    return (
        <Form title={"Добро пожаловать!"}
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
                        value={name}
                    />
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
                        value={email}
                    />
                    <label className="register__label">Пароль</label>
                    <input
                        className="register__input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Пароль"
                        minLength="8"
                        required
                        value={password}
                    />
                </div>
            }
            button={"Зарегистрироваться"}
            span={"Уже зарегистрированы?"}
            isRegister={true}
            isValid={true}
        />
        
    );
};
  
export default Register;