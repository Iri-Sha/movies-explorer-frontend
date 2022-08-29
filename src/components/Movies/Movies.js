import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useMediaPredicate } from "react-media-hook";
import { shortMovieDuration } from "../../utils/constants";

function Movies({
    allMovies,
    savedMovies,
    handleSaveMovie,
    handleDeleteMovie,
    }) {
    
    const isMobile = useMediaPredicate("(max-width: 520px)");
    const isPad = useMediaPredicate("(max-width: 1100px)");
    const [isLoading, setIsLoading] = React.useState(false);
    const initialSearchQueryValues = localStorage.getItem("query") || "";
    const [countMovies, setCountMovies] = React.useState(startMovies());
    const [isMoreButton, setIsMoreButton] = React.useState(false);
    const [shortMovies, setShortMovies] = React.useState([]);
    const [filteredMovies, setFilteredMovies] = React.useState([]);
    const [filteredShortMovies, setFilteredShortMovies] = React.useState([]);
    const [isShort, setIsShort] = React.useState(stringToBool(localStorage.getItem('isShort')));
    const [moviesToRender, setMoviesToRender] = React.useState([]);

    function stringToBool(string) {
        return string !== "false";
    }

    function startMovies(isMobile, isPad) {
        if (isMobile) {
            return 5;
        }
        if (isPad) {
            return 8;
        }
        return 12;
    }

    function handleAddMovies() {
        if (isMobile) {
            setCountMovies((prevCount) => prevCount + 2)
        } if (isPad) {
            setCountMovies((prevCount) => prevCount + 2)
        }
            setCountMovies((prevCount) => prevCount + 3)
    }

    function getRenderMovies(movies) {
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
    }

    function handleSearch(query) {
        setIsLoading(true);
        let filterMovies = allMovies;
        if (query !== "" && query!==null) {
            filterMovies = allMovies.filter((movie) =>
                movie.nameRU.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        setFilteredShortMovies(filterMovies.filter((movie) => movie.duration <= shortMovieDuration));
        setFilteredMovies(filterMovies);
        localStorage.setItem("query", query);
        setIsLoading(true);
    }

    function handleShortClick() {
        localStorage.setItem("isShort", String(!isShort));
        setIsShort(!isShort);
    }

    function renderMovies() {
        setIsLoading(false);
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
            <MoviesCardList
                movies={moviesToRender}
                savedMovies={savedMovies}
                isMoreButton={isMoreButton}
                isLoading={isLoading}
                handleMoreButtonClick={handleAddMovies}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
            />
        </section>
        
    );
};
  
export default Movies;