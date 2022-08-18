import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header({loggedIn}) {

    const headerThemeClassName = `${window.location.pathname === "/" ? "header header_theme_dark" : "header"}`;
  
    return (
        <header className={headerThemeClassName}>
            <Link to="/" className="header__logo-link" />
            {loggedIn ? (
                <Navigation />
            ) : (
                <nav className="header__navigation">
                    <Link className="header__link" to="/signup">
                        Регистрация
                    </Link>
                    <Link className="header__link header__link_type_button-blue"  to="/signin">
                        Войти
                    </Link>
                </nav>
            )}
        </header>
    );
};

export default Header;