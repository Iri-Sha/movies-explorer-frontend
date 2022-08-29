import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
    onSearch,
    checked,
    onCheckClick,
    initialSearchQueryValues,
    }) {

    const [query, setQuery] = React.useState(initialSearchQueryValues);
    const [isValid, setIsValid] = React.useState(true);

    function handleQueryChange(e){
        setQuery(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        if  (query === '') {
            return setIsValid(false);
        }
            setIsValid(true);      
            onSearch(query);
    }

    return (
        <section className="search-form">
            <form className="search-form__form" onSubmit={handleSubmit} noValidate>
                <div className="search-form__line">
                    <input
                        className="search-form__input"
                        name="nameRU"
                        placeholder="Фильм"
                        type="text"
                        value={(query!=="null")?(query):("")}
                        onChange={handleQueryChange}
                        required
                    />
                    <button className="search-form__button" type="submit">Найти</button>
                </div>
                <span className={!isValid ? "search__input-error" : "search__input-error_hidden"}>Нужно ввести ключевое слово</span>
                <FilterCheckbox
                    name="shortFilms"
                    checked={checked}
                    onChange={onCheckClick}
                />
            </form>
        </section>  
    );
};
  
export default SearchForm;