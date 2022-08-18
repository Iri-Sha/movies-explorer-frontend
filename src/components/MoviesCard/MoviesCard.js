import React from 'react';
import './MoviesCard.css';

function MoviesCard({nameRU, duration, trailerLink, image}) {

    const [isSaved, setIsSaved] = React.useState(false);

    function handleSaveToggle() {
        setIsSaved(!isSaved);
    }

    function timeCalculate(minute) {
        let hour = Math.floor(minute / 60);
        let min = minute % 60;
    
        if(hour === 0) {
          return `${min}мин`
        }
    
        return `${hour}ч${min}мин`
    }

    return (
        <section className="card">
            <div className="card__body">
                <div className="card__text-conteiner">
                    <h3 className="card__title">{nameRU}</h3>
                    <p className="card__duration">{timeCalculate(duration)}</p>
                </div>
                <>
                {window.location.pathname === '/movies' ? (
                    <button className={`card__button ${isSaved ? 'card__button-saved' : ''}`} onClick={handleSaveToggle} type="button" aria-label="Сохранить"></button>
                ) : (
                    <button className="card__button card__button-delete" type="button" aria-label="Удалить"></button>
                )}
                </>
            </div>
            <a href={trailerLink !== undefined ? trailerLink : '*'} target="_blank" rel="noreferrer">
                <img className="card__image" src={image} alt={nameRU} />
            </a>
        </section>
    );
};
  
export default MoviesCard;