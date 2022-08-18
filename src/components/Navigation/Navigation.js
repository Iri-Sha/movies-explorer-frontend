import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import './Navigation.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import account from '../../images/account.svg';

function Navigation() {

    const isMobile = useMediaPredicate("(max-width: 800px)");

    return (
        <>
        {!isMobile ? (
            <nav className="navigation">
            <div className="navigation__films-container">
                <Link to="/movies" className="navigation__film"> Фильмы </Link>
                <Link to="/saved-movies" className="navigation__film"> Сохраненные фильмы </Link>
            </div>
            <Link to="/profile" className="navigation__account-link">
                <img src={account} alt="Аккаунт" className="navigation__button"/>
            </Link>
            </nav>
        ) : (
            <BurgerMenu />
        )}
        </>
    );
};
  
export default Navigation;