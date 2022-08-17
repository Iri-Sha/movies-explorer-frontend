import React from 'react';
import ImageOk from '../../images/ImageOk.svg';
import ImageError from '../../images/ImageError.svg';
import './InfoToolTip.css';

function InfoToolTip({isOpen, closePopup, status}) {

    return(
        <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__overlay" onClick={closePopup}></div>
            <div className="popup__wrapper">
                <button className="popup__button-close" type="button" onClick={closePopup}></button>
                <img className="popup__status-image" src={status? ImageOk : ImageError}
                     alt={status? "Ок":"Ошибка"}/>
                <p className="popup__status-text">{status ? "Успешно!"
                    : "Что-то пошло не так! Попробуйте ещё раз."}</p>
            </div>
        </section>
    )
}

export default InfoToolTip;