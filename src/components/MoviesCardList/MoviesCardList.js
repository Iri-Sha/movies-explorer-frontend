import React from 'react';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
    movies,
    savedMovies,
    isMoreButton,
    isLoading,
    handleMoreButtonClick,
    handleSaveMovie,
    handleDeleteMovie,
    }) {

    return (
        <section className="movies-card-list">
            {isLoading ? (
                <Preloader />
            ) : (
            <>
            <p className={movies.length === 0? ("not-found") : ("not-found_hidden")}>
                Ничего не найдено
            </p>
            {movies.length !== 0 ? (
                <div className="movies-card-list__conteiner">
                    {movies.map((movie)=>(
                        <MoviesCard
                            movie={movie}
                            key={movie.id || movie._id}
                            handleSaveMovie={handleSaveMovie}
                            handleDeleteMovie={handleDeleteMovie}
                            savedMovies={savedMovies}
                        />
                    ))}
                </div>
            ) : (
                <div className="movies-card-list__conteiner"></div>
            )}
            {isMoreButton ? (
                 <button className="more-button" onClick={handleMoreButtonClick}>Ёще</button>
            ) : (
                <div className="more-button_disable"></div>
            )}
            </>
            )}
        </section>
        
    );
};
  
export default MoviesCardList;