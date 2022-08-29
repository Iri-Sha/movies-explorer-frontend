import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { errorText, errorTextConflict, errorLogin } from "../../utils/constants";

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [status, setStatus] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isActiveForUpdate, setIsActiveForUpdate] = React.useState(false);
  const [formError, setFormError] = React.useState('');

  const [allMovies, setAllMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    mainApi.getUser()
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
      })
      .catch((err) => {
        setLoggedIn(false);
        setCurrentUser({});
        setSavedMovies([]);
        setAllMovies([]);
        localStorage.clear();
        console.log(err);
    });
  }

//Подгружаем все фильмы в localStorage
  function getMovies() {
    moviesApi.getMovies()
      .then((movies) => {
        setAllMovies(movies);
        localStorage.setItem('movies', JSON.stringify(movies));
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.message);
        setStatus(false);
        setIsInfoTooltipOpen(true);
      });
  };

  React.useEffect(() => {
    if (loggedIn) {
      const localMovies = localStorage.getItem('movies');

      if (localMovies) {
        try {
          setAllMovies(JSON.parse(localMovies));
        } catch (err) {
          localStorage.removeItem('movies');
          getMovies();
        }
      } else {
        getMovies();
        getSavedMovies();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  //Подгружаем сохраненные фильмы
  function getSavedMovies() {
    mainApi.getMovies()
      .then((movies) => {
        const moviesToShow = movies.data.filter((movie) => movie.owner === currentUser.id);
        setSavedMovies(moviesToShow);
        localStorage.setItem('saved-movies', JSON.stringify(moviesToShow));
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(errorText);
        setStatus(false);
        setIsInfoTooltipOpen(true);
      });
  };

  React.useEffect(() => {
    if (loggedIn) {
      getSavedMovies();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

//Сохранение фильмов
  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((movie) => {
        setSavedMovies([movie, ...savedMovies]);
        localStorage.setItem('saved-movies', JSON.stringify(movie));
        console.log('Добавили видео в сохраненные');
      })
      .catch((err) => {
        setErrorMessage(errorText);
        setStatus(false);
        setIsInfoTooltipOpen(true);
      });
  }

//Удаление фильмов из сохраненных
  function handleDeleteMovie(movie) {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== movie._id));
        localStorage.setItem('saved-movies', JSON.stringify(movie));
        console.log('Удалили видео');
      })
      .catch((err) => {
        setErrorMessage(errorText);
        setStatus(false);
        setIsInfoTooltipOpen(true);
      });
  };

  function handleRegisterSubmit(name, email, password) {
    return mainApi.registration(name, email, password)
      .then(() => {
        handleLoginSubmit(email, password);
      })
      .catch((err) => {
        if(err === 'Ошибка: 409') {
          return setFormError(errorTextConflict);
        }
        setFormError(errorText);
      })
  }

  function handleLoginSubmit(email, password) {
    mainApi.authorization(email, password)
      .then(() => {
        tokenCheck()
        setFormError("");
        history.push('/movies')
      })
      .catch((err) => {
        setFormError(errorLogin);
        console.log(err);
      })
  }

  function handleUpdateProfile(name, email) {
    mainApi.editProfile(name, email)
      .then((res) => {
        setCurrentUser(res);
        setStatus(true);
        setIsInfoTooltipOpen(true);
        setIsActiveForUpdate(false);
      })
      .catch((err) => {
        console.log(err);
        setStatus(false);
        setIsInfoTooltipOpen(true);
      })
  }

  const onProfileEdit = () => {
    setIsActiveForUpdate(true);
  };

  function handleLogout() {
    mainApi.logout()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({});
        setSavedMovies([]);
        setAllMovies([]);
        history.push("/");
        localStorage.clear()
        console.log("Выход");
      })
      .catch((err) => console.log(err))
  }

  function handleClose() {
    setIsInfoTooltipOpen(false);
  }

  function handleOverlayClose(e){
    if(e.target.classList.contains('popup')){
      handleClose();
    }
  }

  React.useEffect(() => {
    function handleEscapeKey(e) {
      if (e.key === 'Escape') {
      handleClose();
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route path='/signin'>
          {loggedIn
            ? (<Redirect to='/' />)
            : (<Login handleLoginSubmit={handleLoginSubmit} formError={formError} />)
          }
          </Route>

          <Route path='/signup'>
            {loggedIn
              ? (<Redirect to='/' />)
              : (<Register handleRegisterSubmit={handleRegisterSubmit} formError={formError} />)
            }
          </Route>

          <Route exact path='/'>
            <Header loggedIn={loggedIn} />
            <Main />
            <Footer />
          </Route>

          <ProtectedRoute path='/movies' loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} />
            <Movies
              allMovies={allMovies}
              savedMovies={savedMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
            />
            <Footer />
          </ProtectedRoute>

          <ProtectedRoute path='/saved-movies' loggedIn={loggedIn} >
            <Header loggedIn={loggedIn} />
            <SavedMovies
              savedMovies={savedMovies}
              getSavedMovies={getSavedMovies}
              handleDeleteMovie={handleDeleteMovie}
            />
            <Footer />
          </ProtectedRoute>

          <ProtectedRoute path='/profile' loggedIn={loggedIn}>
            <Header loggedIn={loggedIn}/>
            <Profile 
              currentUser={currentUser}
              handleProfileUpdate={handleUpdateProfile}
              onLogout={handleLogout}
              handleEdit={onProfileEdit}
              isActiveForUpdate={isActiveForUpdate}
              setIsActiveForUpdate={setIsActiveForUpdate}
            />
          </ProtectedRoute>
          <Route exact path='*'>
            <NotFound/>
          </Route>
        </Switch>
        <InfoToolTip
                status={status}
                isOpen={isInfoTooltipOpen}
                closePopup={handleClose}
                handleOverlayClose={handleOverlayClose}
                errorMessage={errorMessage}
          />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
