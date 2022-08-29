import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({
    checked,
    onChange
    }) {

    return (
        <div className="filter">
            <input
                className="filter__input"
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <label className="filter__name">Короткометражки</label>
        </div>
    );
};
  
export default FilterCheckbox;