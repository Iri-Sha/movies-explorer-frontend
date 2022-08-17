import React from 'react';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({movies, savedmovies, isMoreButton, isSaved}) {

    const [isLoading, setLoading] = React.useState(false);

    function handlePreloader() {
        setLoading(true);
    }

    return (
        <section className="movies-card-list">
        {isLoading ? (
            <Preloader />
        ) : (
            <>
            <div className="movies-card-list__conteiner">
            {isSaved ? (
                <>
                {savedmovies.map((savedmovie) => {
                    return (
                    <MoviesCard
                        key={savedmovie.toString()}
                        image={savedmovie}
                        nameRU="33 слова о дизайне"
                        duration="107"
                    />
                    )})
                }
                </>
            ) : (
                <>
                {movies.map((movie) => {
                    return (
                    <MoviesCard
                        key={movie.toString()}
                        image={movie}
                        nameRU="33 слова о дизайне"
                        duration="107"
                    />
                    )})
                }
                </>
            )}
            </div>
            {isMoreButton ? (
                <button className="more-button" onClick={handlePreloader}>Ёще</button>
            ) : (
                <div className="more-button_disable"></div>
            )}
            </>
        )}
        </section>
        
    );
};
  
export default MoviesCardList;