import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {shortMovieDuration} from "../../utils/constants";

function SavedMovies({savedMovies, handleDeleteMovie}) {

    const [isLoading, setIsLoading] = React.useState(false);
    const [shortMovies, setShortMovies] = React.useState([]);
    const [filteredMovies, setFilteredMovies] = React.useState([]);
    const [filteredShortMovies, setFilteredShortMovies] = React.useState([]);
    const [isShort, setIsShort] = React.useState(false);
    const [moviesToRender, setMoviesToRender] = React.useState([]);
    const [savedMoviesQuery, setSavedMoviesQuery]=React.useState("");

    function handleSearch(query) {
        setIsLoading(true);
        setFilteredShortMovies([]);
        setFilteredMovies([]);
        let filterSavedMovies = savedMovies;
        console.log(savedMovies);
        if (query !== "" && query!==null) {
            filterSavedMovies = savedMovies.filter((movie) =>
                movie.nameRU.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        setFilteredShortMovies(filterSavedMovies.filter((movie) => movie.duration <= shortMovieDuration));
        setFilteredMovies(filterSavedMovies);
        localStorage.setItem("query", query);
        setSavedMoviesQuery(query);
    }

    function handleShortClick() {
        localStorage.setItem("isShort", String(!isShort));
        setIsShort(!isShort);
    }

    function getRenderMovies(savedMovies){
        setMoviesToRender(savedMovies);
    }

    function renderMovies() {
        if (isShort && filteredShortMovies.length!==0) {
            getRenderMovies(filteredShortMovies);
        }
        if (isShort && filteredShortMovies.length===0) {
            if(savedMoviesQuery!=="") {
                getRenderMovies([])
            }
            else{
                getRenderMovies(shortMovies);
            }
        }
        if (!isShort && filteredMovies.length!==0) {
            getRenderMovies(filteredMovies);
        }
        if (!isShort && filteredMovies.length===0) {
            if(savedMoviesQuery!=="") {
                getRenderMovies([])
            }
            else{
                getRenderMovies(savedMovies);
            }
        }
    }

    function handleClick(savedMovies){
        handleDeleteMovie(savedMovies);
        setMoviesToRender(moviesToRender.filter((movie)=>movie._id!==movie.id));
    }

    React.useEffect(() => {
        setShortMovies(savedMovies.filter((movie) => movie.duration <= shortMovieDuration));
        renderMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShort, filteredMovies, filteredShortMovies, moviesToRender, savedMovies]);

    return (
        <section>
            <SearchForm
                onSearch={handleSearch}
                checked={isShort}
                onCheckClick={handleShortClick}
            />
            <MoviesCardList
                movies={moviesToRender}
                isLoading={isLoading}
                handleDeleteMovie={handleClick}
                savedMovies={savedMovies}
            />
        </section>
    );
};
  
export default SavedMovies;