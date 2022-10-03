import './AboutMe.css';
import avatar from '../../images/Avtor.jpeg';

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__profile">
                <div className="about-me__description">
                    <h2 className="about-me__subtitle">Ирина</h2>
                    <h3 className="about-me__info">Фронтенд-разработчик, 36 лет</h3>
                    <p className="about-me__text">
                        Я  живу в Челябинске, закончила факультет экономики и управления ЮУрГУ. У меня есть муж и двое детей. Я люблю слушать музыку, кататься на велосипеде. В один прекрасный момент решила поменять вид деятельности и пошла учиться на курс "Веб-разработчик" в Яндекс.Практикуме. Хочу найти работу в IT-сфере.
                    </p>
                    <a className="about-me__link" href="https://github.com/Iri-Sha" target="_blank" rel="noreferrer">
                        Github
                    </a>
                </div>
                <img className="about-me__avatar" src={avatar} alt='Аватар студента'/>
            </div>
        </section>
    );
};
    
export default AboutMe;