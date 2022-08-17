import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {

    return (
        <section className="search-form">
            <form className="search-form__form">
                <div className="search-form__line">
                    <input className="search-form__input" placeholder='Фильм'/>
                    <button className="search-form__button" type="submit" value=" ">Найти</button>
                </div>
                <FilterCheckbox />
            </form>
        </section>  
    );
};
  
export default SearchForm;