import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {shortMovieDuration} from "../../utils/constants";

function SavedMovies({savedMovies, handleDeleteMovie, isLoading, setIsLoading, isActiveForUpdate, setIsActiveForUpdate}) {

    const [shortMovies, setShortMovies] = React.useState([]);
    const [filteredMovies, setFilteredMovies] = React.useState([]);
    const [filteredShortMovies, setFilteredShortMovies] = React.useState([]);
    const [isShort, setIsShort] = React.useState(false);
    const [moviesToRender, setMoviesToRender] = React.useState([]);
    const [savedMoviesQuery, setSavedMoviesQuery]=React.useState("");
    const [notFound, setNotFound] = React.useState(false);
    const resultText = "Ничего не найдено";

    function handleSearch(query) {
        setIsLoading(true);
        setIsActiveForUpdate(false);
        setFilteredShortMovies([]);
        setFilteredMovies([]);
        let filterSavedMovies = savedMovies;
        if (query !== "" && query!==null) {
            filterSavedMovies = savedMovies.filter((movie) =>
                movie.nameRU.toLowerCase().includes(query.toLowerCase()));
        }
        setFilteredShortMovies(filterSavedMovies.filter((movie) => movie.duration <= shortMovieDuration));
        setFilteredMovies(filterSavedMovies);
        setSavedMoviesQuery(query);
        setIsActiveForUpdate(true);
        setIsLoading(false);
    }

    function handleShortClick() {
        setIsShort(!isShort);
    }

    function getRenderMovies(savedMovies){
        if (savedMovies.length === 0) {
            setNotFound(true);
        } else {
            setNotFound(false);
        }
        setMoviesToRender(savedMovies);
    }

    function renderMovies() {
        setIsLoading(true);
        
        if (isShort && filteredShortMovies.length!==0) {
            getRenderMovies(filteredShortMovies);
        }
        if (isShort && filteredShortMovies.length===0) {
            if(savedMoviesQuery!=="") {
                getRenderMovies([])
                setNotFound(true);
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
                setNotFound(true);
            }
            else{
                getRenderMovies(savedMovies);
            }
        }
        setIsLoading(false);
    }

    function handleClick(savedMovies){
        setIsLoading(true);
        handleDeleteMovie(savedMovies);
        setMoviesToRender(moviesToRender.filter((movie)=>movie._id!==movie.id));
        setIsLoading(false);
    }

    React.useEffect(() => {
        setIsLoading(true);
        setShortMovies(savedMovies.filter((movie) => movie.duration <= shortMovieDuration));
        renderMovies();
        setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShort, filteredMovies, filteredShortMovies, moviesToRender, savedMovies]);

    return (
        <section>
            <SearchForm
                onSearch={handleSearch}
                checked={isShort}
                onCheckClick={handleShortClick}
                isActiveForUpdate={isActiveForUpdate}
            />
            {isLoading ? (
                <Preloader />
            ) : (
                <MoviesCardList
                    movies={moviesToRender}
                    isLoading={isLoading}
                    handleDeleteMovie={handleClick}
                    savedMovies={savedMovies}
                    resultText={resultText}
                    notFound={notFound}
                />
            )}
        </section>
    );
};
  
export default SavedMovies;