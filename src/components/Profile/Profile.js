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

    const {
        values, handleChange, errors, isValid, resetForm, updateValue,
    } = useFormWithValidation();

    React.useEffect(() => {
        updateValue('name', currentUser.name);
        updateValue('email', currentUser.email);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currentUser]);

    const isButtonDisabled = !isValid || ((values.name === currentUser.name) && (values.email === currentUser.email));

    const handleEditProfile = (e) => {
        e.preventDefault();
        handleEdit();
    };

    function handleSubmit(e){
        e.preventDefault();
        handleProfileUpdate(values.name, values.email);
        resetForm();
    }

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
                            value={values.name || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <span className="profile__input-error">{errors.name}</span>
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
                            value={values.email || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <span className="profile__input-error">{errors.email}</span>
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