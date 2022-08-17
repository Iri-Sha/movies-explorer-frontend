import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {

    const [check, setCheck] = React.useState(true);

    function handleChange() {
        setCheck(!check);
    }

    return (
        <div className="filter">
            <input className="filter__input" type="checkbox" checked={check} onChange={handleChange} />
            <label className="filter__name">Короткометражки</label>
        </div>
    );
};
  
export default FilterCheckbox;