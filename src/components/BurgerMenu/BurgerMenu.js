import React from 'react';
import './BurgerMenu.css'
import { Link, NavLink } from 'react-router-dom';
import account from '../../images/account.svg';
import burger from '../../images/burger.svg';

function BurgerMenu({isColor, isMain}) {

    const [isBurgerOpen, setIsMenuOpen] = React.useState(false)

    function handleOpenBurger() {
        setIsMenuOpen(true);
    }

    function handleCloseBurger() {
        setIsMenuOpen(false);
    }

    return (
        <>
        {isBurgerOpen ? (
            <nav className="menu__container">
                <div className="menu__overlay"></div>
                <button className="menu__close-btn" type="button" onClick={handleCloseBurger}></button>
                <div className="menu__link-container">
                <Link to="/" className="menu__link" >Главная</Link>
                <NavLink to="/movies" className="menu__link" activeClassName="menu__link_active">Фильмы</NavLink>
                <NavLink to="/saved-movies" className="menu__link" activeClassName="menu__link_active">Сохраненные фильмы</NavLink>
                </div>
                <Link to="/profile" className="menu__account-link">
                    <img src={account} alt="Аккаунт" />
                </Link>
            </nav>
        ) : (
            <button className="menu-burger__button" type="button" onClick={handleOpenBurger}>
                < img src={burger} alt="Меню"/>
            </button>
        )}
        </>
    )
}

export default BurgerMenu;