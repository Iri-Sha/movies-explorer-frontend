import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
    movies,
    savedMovies,
    isMoreButton,
    isLoading,
    handleMoreButtonClick,
    handleSaveMovie,
    handleDeleteMovie,
    resultText
    }) {

    return (
        <section className="movies-card-list">
            {isLoading ? (
                <Preloader />
            ) : (
                <>
                {movies.length !== 0 ? (
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
                            <p className="not-found">{resultText}</p>
                    </div>
                )}
                </>
            )}
        </section>
        
    );
};
  
export default MoviesCardList;
