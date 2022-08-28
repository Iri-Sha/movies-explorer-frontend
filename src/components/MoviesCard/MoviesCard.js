import React from 'react';
import './MoviesCard.css';

function MoviesCard({movie, savedMovies, handleSaveMovie, handleDeleteMovie}) {

    const isSavedMoviesPage = window.location.pathname === "/saved-movies";
    const savedMovie = savedMovies.find((i) => i.movieId === movie.id);

    function handleCardClick() {
        if (savedMovie) {
            handleDeleteMovie(savedMovie)
        } else {
            handleSaveMovie({
                nameRU: movie.nameRU || movie.nameEN,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailerLink: movie.trailerLink,
                duration: movie.duration,
                country: movie.country || "null",
                director: movie.director || "null",
                year: movie.year,
                description: movie.description,
                thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
                movieId: movie.id,
                nameEN: movie.nameEN || "null",
            })
        }
    }
    
    function timeCalculate(minute) {
        let hour = Math.floor(minute / 60);
        let min = minute % 60;
    
        if(hour === 0) {
          return `${min}мин`
        }
    
        return `${hour}ч${min}мин`
    }

    const handleDeleteMovieFromSaved = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        handleDeleteMovie(movie);
    };

    return (
        <section className="card">
            <div className="card__body">
                <div className="card__text-conteiner">
                    <h3 className="card__title">{movie.nameRU}</h3>
                    <p className="card__duration">{timeCalculate(movie.duration)}</p>
                </div>
                <>
                {isSavedMoviesPage ? (
                    <button
                        className="card__button card__button-delete"
                        type="button"
                        aria-label="Удалить"
                        onClick={handleDeleteMovieFromSaved}
                    ></button>
                ) : (
                    <button
                        className={`card__button ${savedMovie ? 'card__button-saved' : ''}`}
                        onClick={handleCardClick}
                        type="button"
                        aria-label="Сохранить"
                    ></button>
                )}
                </>
            </div>
            <a href={movie.trailerLink !== undefined ? movie.trailerLink : '*'} target="_blank" rel="noreferrer">
                <img className="card__image" src={`${!isSavedMoviesPage ? `https://api.nomoreparties.co${movie.image.url}` : movie.image}`} alt={movie.nameRU} />
            </a>
        </section>
    );
};
  
export default MoviesCard;