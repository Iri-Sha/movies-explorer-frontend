import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({movies, isMoreButton}) {

    return (
        <section>
            <SearchForm />
            <MoviesCardList movies={movies} isMoreButton={isMoreButton} />
        </section>
        
    );
};
  
export default Movies;