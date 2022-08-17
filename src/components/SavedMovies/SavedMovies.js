import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({savedmovies, isSaved}) {

    return (
        <section>
            <SearchForm />
            <MoviesCardList savedmovies={savedmovies} isSaved={isSaved}/>
        </section>
    );
};
  
export default SavedMovies;