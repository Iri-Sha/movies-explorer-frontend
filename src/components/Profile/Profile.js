import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Profile.css';
import InfoToolTip from '../InfoToolTip/InfoToolTip';

function Profile() {

    const userName = "Виталий";
    const userEmail = "pochta@yandex.ru"

    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        setIsInfoTooltipOpen(true);
    }

    function handleClose() {
        setIsInfoTooltipOpen(false);
        history('/profile');
    }

    return (
        <section className="profile">
            <div className="profile__container">
                <h1 className="profile__title">Привет, {userName}!</h1>
                <form className="profile__form" onSubmit={handleSubmit}>
                    <div className="profile__input-container">
                        <label className="profile__lable">Имя</label>
                        <input
                            className="profile__input"
                            type="text"
                            name="name"
                            minLength="2"
                            maxLength="50"
                            required
                            value={userName || ''}
                        />
                    </div>
                    <div className="profile__input-container">
                        <label className="profile__lable">E-mail</label>
                        <input
                            className="profile__input"
                            type="email"
                            name="email"
                            minLength="2"
                            maxLength="254"
                            required
                            value={userEmail || ''}
                        />
                    </div>
                    <button type="submit"
                            className="profile__edit-button profile__edit-button_disabled">
                        Редактировать
                    </button>
                </form>
                <Link to="/signin" className="profile__logout">
                    Выйти из аккаунта
                </Link>
            </div>
            <InfoToolTip
                status={true}
                isOpen={isInfoTooltipOpen}
                closePopup={handleClose}/>
        </section>
    );
};
  
export default Profile;