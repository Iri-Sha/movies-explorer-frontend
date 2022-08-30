import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import useCurrentWidth from '../../hooks/usуCurrentWidth';
import { shortMovieDuration } from "../../utils/constants";

function Movies({
    allMovies,
    savedMovies,
    handleSaveMovie,
    handleDeleteMovie,
    getMovies
    }) {
    
    const width = useCurrentWidth();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isFirstSearch, setIsFirstSearch] = React.useState(true);
    const initialSearchQueryValues = localStorage.getItem("query");
    const initialIsShort = !localStorage.getItem("isShort") ? false : JSON.parse(localStorage.getItem("isShort"));
    const [countMovies, setCountMovies] = React.useState(startMovies(width));
    const [isMoreButton, setIsMoreButton] = React.useState(false);
    const [shortMovies, setShortMovies] = React.useState([]);
    const [filteredMovies, setFilteredMovies] = React.useState([]);
    const [filteredShortMovies, setFilteredShortMovies] = React.useState([]);
    const [isShort, setIsShort] = React.useState(initialIsShort);
    const [moviesToRender, setMoviesToRender] = React.useState([]);

    const resultText = (isFirstSearch && localStorage.getItem("query") === null) ? (
        ""
    ) : (
        "Ничего не найдено"
    );

    React.useEffect(() => {
        getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function startMovies(width) {
        if (width >= 1100) {
            return 12;
        }
        if (width >= 520) {
            return 8;
        }
        return 5;
    }

    function addMovies(width) {
        if (width >= 1100) {
            return 3;
        }
        return 2;
    }

    function handleAddMovies() {
        setCountMovies((prevCount) => prevCount + addMovies(width))
    }

    function getRenderMovies(movies) {
        setIsLoading(true);

        const result = [];
        for (let i = 0; i < countMovies && i < movies.length; i = i + 1) {
            result.push(movies[i]);
        }
        setMoviesToRender(result);

        setTimeout(() => {
            if (movies.length > countMovies) {
                setIsMoreButton(true);
            } else {
                setIsMoreButton(false);
            }
        }, 150);
        setIsLoading(false);
    }

    function handleSearch(query) {
        setIsLoading(true);
        setIsFirstSearch(false);
        let filterMovies = allMovies;
        if (query !== "" && query!==null) {
            filterMovies = allMovies.filter((movie) =>
                movie.nameRU.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        setFilteredShortMovies(filterMovies.filter((movie) => movie.duration <= shortMovieDuration));
        setFilteredMovies(filterMovies);
        localStorage.setItem("query", query);
        setIsLoading(false);
    }

    function handleShortClick() {
        localStorage.setItem("isShort", String(!isShort));
        setIsShort(!isShort);
    }

    function renderMovies() {
        const query = localStorage.getItem("query");
        const emptyQuery = (query === "" || query === "null")
        if (isShort && !emptyQuery) {
            getRenderMovies(filteredShortMovies);
        }
        if (isShort && emptyQuery) {
            getRenderMovies(shortMovies);
        }
        if (!isShort && !emptyQuery) {
            getRenderMovies(filteredMovies);
        }
        if (!isShort && emptyQuery) {
            getRenderMovies(allMovies);
        }
    }

    React.useEffect(() => {
        setShortMovies(allMovies.filter((movie) => movie.duration <= shortMovieDuration));
        renderMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countMovies, isShort, filteredMovies, filteredShortMovies, allMovies])

    React.useEffect(()=>{
        if(localStorage.getItem("query") !== "" ){
            handleSearch(localStorage.getItem("query"));
        }
        else{
            renderMovies();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section>
            <SearchForm
                onSearch={handleSearch}
                checked={isShort}
                onCheckClick={handleShortClick}
                initialSearchQueryValues={initialSearchQueryValues}
            />
            {isLoading ? (
                <Preloader />
            ) : (
                <MoviesCardList
                    movies={moviesToRender}
                    savedMovies={savedMovies}
                    isMoreButton={isMoreButton}
                    isLoading={isLoading}
                    handleMoreButtonClick={handleAddMovies}
                    handleSaveMovie={handleSaveMovie}
                    handleDeleteMovie={handleDeleteMovie}
                    resultText={resultText}
                />
            )}
        </section>
        
    );
};
  
export default Movies;