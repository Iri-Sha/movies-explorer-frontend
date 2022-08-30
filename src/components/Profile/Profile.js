import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import useFormWithValidation from '../../hooks/useValidationForm';

function Profile({
    currentUser,
    handleProfileUpdate,
    onLogout,
    handleEdit,
    isActiveForUpdate,
    setIsActiveForUpdate,
    }) {

    const controls  = useFormWithValidation({
        name: currentUser.name,
        email: currentUser.email,
    });

    const isButtonDisabled = (!controls.isValid || ((controls.values.name === currentUser.name) && (controls.values.email === currentUser.email)));

    const handleEditProfile = (e) => {
        e.preventDefault();
        handleEdit();
    };

    function handleSubmit(e){
        e.preventDefault();
        handleProfileUpdate(controls.values.name, controls.values.email);
        controls.resetForm();
    }

    /*React.useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);*/

    React.useEffect(() => {
        setIsActiveForUpdate(false);
    }, [setIsActiveForUpdate]);

    return (
        <section className="profile">
            <div className="profile__container">
                <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                <form className="profile__form" onSubmit={handleSubmit} noValidate>
                    <div className="profile__input-container">
                        <label className="profile__lable">Имя</label>
                        <input
                            className="profile__input"
                            type="text"
                            name="name"
                            minLength="2"
                            maxLength="50"
                            required
                            disabled={!isActiveForUpdate}
                            value={controls.values.name || ''}
                            onChange={controls.handleChange}
                        />
                    </div>
                    <span className="profile__input-error">{controls.errors.name}</span>
                    <div className="profile__input-container">
                        <label className="profile__lable">E-mail</label>
                        <input
                            className="profile__input"
                            type="email"
                            name="email"
                            minLength="2"
                            maxLength="254"
                            required
                            disabled={!isActiveForUpdate}
                            value={controls.values.email || ''}
                            onChange={controls.handleChange}
                        />
                    </div>
                    <span className="profile__input-error">{controls.errors.email}</span>
                    {!isActiveForUpdate ? (
                        <button
                            className="profile__edit-button"
                            onClick={handleEditProfile}
                        >
                            Редактировать
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isButtonDisabled}
                            className="profile__save-button"
                        >
                            Сохранить
                        </button>
                    )}
                </form>
                {!isActiveForUpdate && (
                    <Link to="/signin" className="profile__logout" onClick={onLogout}>
                        Выйти из аккаунта
                    </Link>
                )}
            </div>
        </section>
    );
};
  
export default Profile;