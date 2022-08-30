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

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const {
        values, handleChange, errors, isValid, resetForm,
    } = useFormWithValidation(currentUser);

    const isButtonDisabled =
    !isValid && (values.name === currentUser.name) && (values.email === currentUser.email);

    function handleChangeProfile(evt) {
        handleChange(evt);
        if(evt.target.name === "name") {
          setName(evt.target.value);
        } else {
          setEmail(evt.target.value);
        }
    }

    const handleEditProfile = (e) => {
        e.preventDefault();
        handleEdit();
    };

    function handleSubmit(e){
        e.preventDefault();
        handleProfileUpdate(name, email);
        resetForm();
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

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
                            value={name || ''}
                            onChange={handleChangeProfile}
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
                            value={email || ''}
                            onChange={handleChangeProfile}
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