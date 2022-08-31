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
    getMovies,
    isLoading,
    setIsLoading,
    isActiveForUpdate,
    setIsActiveForUpdate,
    }) {
    
    const width = useCurrentWidth();
    const initialSearchQueryValues = localStorage.getItem("query");
    const initialIsShort = !localStorage.getItem("isShort") ? false : JSON.parse(localStorage.getItem("isShort"));
    const [initialMovies, setInitialMovies] = React.useState([]);
    const [countMovies, setCountMovies] = React.useState(startCounntMovies(width));
    const [isMoreButton, setIsMoreButton] = React.useState(false);
    const [shortMovies, setShortMovies] = React.useState([]);
    const [filteredMovies, setFilteredMovies] = React.useState([]);
    const [filteredShortMovies, setFilteredShortMovies] = React.useState([]);
    const [isShort, setIsShort] = React.useState(initialIsShort);
    const [moviesToRender, setMoviesToRender] = React.useState(initialMovies);
    const [notFound, setNotFound] = React.useState(false);

    const resultText = (localStorage.getItem("query") === "null") ? "" : "Ничего не найдено";

    function startCounntMovies(width) {
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
        if (result.length === 0) {
            setNotFound(true);
        } else {
            setNotFound(false);
        }
        localStorage.setItem("serchMovies", JSON.stringify(result));

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
        setIsActiveForUpdate(false);
        let filterMovies = allMovies;
        if (query !== "" && query!==null) {
            filterMovies = allMovies.filter((movie) =>
                movie.nameRU.toLowerCase().includes(query.toLowerCase()));
        };
        setFilteredShortMovies(filterMovies.filter((movie) => movie.duration <= shortMovieDuration));
        setFilteredMovies(filterMovies);
        localStorage.setItem("query", query);
        setIsActiveForUpdate(true);
        setIsLoading(false);
    }

    function handleShortClick() {
        localStorage.setItem("isShort", String(!isShort));
        setIsShort(!isShort);
    }

    function renderMovies() {
        setIsLoading(true);
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
            getRenderMovies([]);
        }
        setIsLoading(false);
    }

    React.useEffect(() => {
        getMovies();
        if (localStorage.getItem("serchMovies")) {
            const movies = JSON.parse(localStorage.getItem("serchMovies"));
            movies.length === 0 ? setNotFound(true) : setNotFound(false);
            setInitialMovies(movies);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        setShortMovies(allMovies.filter((movie) => movie.duration <= shortMovieDuration));
        if ((localStorage.getItem("query") !== "") || (localStorage.getItem("query") !== "null")) {
            handleSearch(initialSearchQueryValues);
        } else {
            renderMovies();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allMovies])

    React.useEffect(() => {
        renderMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countMovies, isShort, filteredMovies, filteredShortMovies, moviesToRender])

    return (
        <section>
            <SearchForm
                onSearch={handleSearch}
                checked={isShort}
                onCheckClick={handleShortClick}
                initialSearchQueryValues={initialSearchQueryValues}
                isActiveForUpdate={isActiveForUpdate}
            />
            {isLoading ? (
                <Preloader />
            ) : (
                <MoviesCardList
                    movies={moviesToRender}
                    savedMovies={savedMovies}
                    isMoreButton={isMoreButton}
                    handleMoreButtonClick={handleAddMovies}
                    handleSaveMovie={handleSaveMovie}
                    handleDeleteMovie={handleDeleteMovie}
                    resultText={resultText}
                    isLoading={isLoading}
                    notFound={notFound}
                />
            )}
        </section>
        
    );
};
  
export default Movies;