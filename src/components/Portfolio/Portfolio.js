import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio(){
    return(
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__links">
                <a href="https://iri-sha.github.io/how-to-learn/" className="portfolio__link" target="_blank" rel="noreferrer">
                    <p className="portfolio__name">Статичный сайт</p>
                    <img src={arrow} className="portfolio__icon" alt="Стрелка"/>
                </a>
                <a href="https://iri-sha.github.io/russian-travel/" className="portfolio__link" target="_blank" rel="noreferrer">
                    <p className="portfolio__name">Адаптивный сайт</p>
                    <img src={arrow} className="portfolio__icon" alt="Стрелка"/>
                </a>
                <a href="https://shamiren.students.nomoredomains.xyz" className="portfolio__link" target="_blank" rel="noreferrer">
                    <p className="portfolio__name">Одностраничное приложение</p>
                    <img src={arrow} className="portfolio__icon" alt="Стрелка"/>
                </a>
            </ul>
        </section>
    )
}

export default Portfolio;