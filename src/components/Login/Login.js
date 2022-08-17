import React from 'react';
import './Login.css';
import Form from '../Form/Form';

function Login() {

    const email = "pochta@yandex.ru";
    const password = "";

    return (
        <Form title={"Рады видеть!"}
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
                        value={email}
                    />
                    <label className="login__label">Пароль</label>
                    <input
                        className="login__input"
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
            button={"Войти"}
            span={"Ещё не зарегистрированы?"}
            isRegister={false}
            isValid={true}
        />
    );
};
  
export default Login;