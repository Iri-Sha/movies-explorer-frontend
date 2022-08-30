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
    isFirstSearch
    }) {

    return (
        <section className="movies-card-list">
            {isLoading ? (
                <Preloader />
            ) : (
                movies.length !== 0 ? (
                    <>
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
                    {isMoreButton ? (
                        <button className="more-button" onClick={handleMoreButtonClick}>Ёще</button>
                    ) : (
                    <div className="more-button_disable"></div>
                    )}
                    </>
                ) : (
                    <div className="movies-card-list__conteiner">
                        <p className={!isFirstSearch ? ("not-found") : ("not-found_hidden")}>Ничего не найдено</p>
                    </div>
                )
            )}
        </section>
        
    );
};
  
export default MoviesCardList;
