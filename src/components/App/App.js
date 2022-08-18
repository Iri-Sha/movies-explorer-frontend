import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
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
import image1 from '../../images/movies/movie-card-1.jpg';
import image2 from '../../images/movies/movie-card-2.jpg';
import image3 from '../../images/movies/movie-card-3.jpg';
import image4 from '../../images/movies/movie-card-4.jpg';
import image5 from '../../images/movies/movie-card-5.jpg';
import image6 from '../../images/movies/movie-card-6.jpg';
import image7 from '../../images/movies/movie-card-7.jpg';
import image8 from '../../images/movies/movie-card-8.jpg';
import image9 from '../../images/movies/movie-card-9.jpg';
import image10 from '../../images/movies/movie-card-10.jpg';
import image11 from '../../images/movies/movie-card-11.jpg';
import image12 from '../../images/movies/movie-card-12.jpg';

function App() {

  const loggedIn = true;
  const isMoreButton = true;
  const isSaved = true;

  const movies = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
  ];

  const savedmovies = movies.slice(0, 3);

  const isMobile = useMediaPredicate("(max-width: 520px)");
  const isDesktop = useMediaPredicate("(max-width: 1020px)");

  const startmovies = (
    isMobile ?
      movies.slice(0, 5)
    : isDesktop ?
        movies.slice(0, 8)
      : movies.slice(0, 12)
)

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Header loggedIn={loggedIn} />
          <Main />
          <Footer />
        </Route>
        <Route exact path='/movies'>
          <Header loggedIn={loggedIn} />
          <Movies movies={startmovies} isMoreButton={isMoreButton} />
          <Footer />
        </Route>
        <Route exact path='/saved-movies'>
          <Header loggedIn={loggedIn} />
          <SavedMovies savedmovies={savedmovies} isSaved={isSaved} />
          <Footer />
        </Route>
        <Route exact path='/profile'>
          <Header loggedIn={loggedIn} />
          <Profile />
        </Route>
        <Route exact path='/signin'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <Register  />
        </Route>
        <Route exact path='*'>
          <NotFound/>
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
